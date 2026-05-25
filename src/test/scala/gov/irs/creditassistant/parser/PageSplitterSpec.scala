package gov.irs.creditassistant.parser

import gov.irs.creditassistant.exceptions.InvalidFormConfig
import gov.irs.creditassistant.loadCreditAssistantFactDictionary
import org.scalatest.funspec.AnyFunSpec
import scala.io.Source

class PageSplitterSpec extends AnyFunSpec {

  // Load the real flow once for the suite (mirrors ParserSpec setup).
  private lazy val originalFlow: Flow = {
    val FlowResourceRoot = "credit-assistant/flow"
    val flowFile = Source.fromResource(s"$FlowResourceRoot/index.xml").getLines().mkString("\n")
    val flowConfig = xml.XML.loadString(flowFile)
    val children = flowConfig \\ "FlowConfig" \ "_"

    def resolveModule(node: xml.Node): xml.NodeSeq = {
      val src = node \@ "src"
      val resolvedSrc = src.replaceAll("^\\./", "")
      val moduleFile = Source.fromResource(s"$FlowResourceRoot/$resolvedSrc").getLines().mkString("\n")
      val flowConfigModule = xml.XML.loadString(moduleFile)
      if (flowConfigModule.label != "FlowConfig") {
        throw InvalidFormConfig(s"Module file $src does not have a top-level FlowConfig")
      }
      flowConfigModule \ "_"
    }

    val resolvedChildren = children.map(child =>
      child.label match {
        case "module" => resolveModule(child)
        case _        => child
      },
    )
    val resolvedConfig = <FlowConfig>{resolvedChildren}</FlowConfig>
    val caFactDictionary = loadCreditAssistantFactDictionary()
    Flow.fromXmlConfig(resolvedConfig, caFactDictionary.factDictionary)
  }

  describe("PageSplitter.explode on real flow") {
    it("produces more pages than the original flow") {
      val exploded = PageSplitter.split(originalFlow.pages)
      assert(exploded.size > originalFlow.pages.size)
    }

    it("stamps sourcePageRoute on every exploded page") {
      val exploded = PageSplitter.split(originalFlow.pages)
      assert(exploded.forall(_.sourcePageRoute.isDefined))
    }

    it("explodes the about-you page into multiple per-question pages") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val aboutYouPages = exploded.filter(_.sourcePageRoute.contains("/"))
      // About-you currently has 7 top-level questions
      assert(aboutYouPages.size >= 6, s"expected many exploded pages from about-you, got ${aboutYouPages.size}")
      // First exploded page keeps the original "/" route (slicing rule: single-question source pages do, but
      // about-you has multiple questions, so the first one gets a suffix).
      assert(aboutYouPages.exists(_.route == "/chosen-tax-year"))
      assert(aboutYouPages.exists(_.route == "/is-us-citizen-or-resident-alien"))
    }

    it("keeps qualifying-children atomic (fg-collection stays on one page)") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val qcPages = exploded.filter(_.sourcePageRoute.contains("/qualifying-children"))
      assert(qcPages.size == 1, s"expected qualifying-children to stay as one page, got ${qcPages.size}")
      // Single-question (collection) pages preserve the original route.
      assert(qcPages.head.route == "/qualifying-children")
    }

    it("attaches knockout alerts to the question that precedes them") {
      val exploded = PageSplitter.split(originalFlow.pages)
      // The /isUSCitizenOrResidentAlien question has a knockout alert directly after it in source XML.
      val citizenPage = exploded.find(_.route == "/is-us-citizen-or-resident-alien")
      assert(citizenPage.isDefined)
      assert(
        citizenPage.get.knockoutConditionPaths.contains("/isUSCitizenOrResidentAlien"),
        s"expected the citizen-knockout alert to travel with the citizen question; got ${citizenPage.get.knockoutConditionPaths}",
      )
    }

    it("exposes the question's condition as the page's gating condition") {
      val exploded = PageSplitter.split(originalFlow.pages)
      // /isUSCitizenOrResidentAlien is gated by /hasSelectedChosenTaxYear (if-true).
      val citizenPage = exploded.find(_.route == "/is-us-citizen-or-resident-alien")
      assert(citizenPage.flatMap(_.gatingCondition).map(_.path).contains("/hasSelectedChosenTaxYear"))
    }

    it("leaves zero-question pages (results) intact with a sourcePageRoute") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val resultsPages = exploded.filter(_.route == "/results")
      assert(resultsPages.size == 1)
      assert(resultsPages.head.sourcePageRoute.contains("/results"))
    }
  }

  describe("PageSplitter.explode route slugging") {
    it("kebab-cases camelCase fact path segments") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val routes = exploded.map(_.route)
      // Spot-check a few well-known mappings
      assert(routes.contains("/chosen-tax-year"))
      assert(routes.contains("/has-valid-ssn"))
      assert(routes.exists(_.endsWith("/initial-filing-status")))
    }
  }

  describe("PageSplitter h3-grouping (agi.xml uses group-by=\"h3\")") {
    it("emits one page per top-level h3 instead of one per question") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val agiPages = exploded.filter(_.sourcePageRoute.contains("/agi"))
      // AGI has 3 question-bearing h3 sections (Earned Income, Other Income, Adjustments).
      // The trailing "Your AGI was: ..." h3 has no questions and is merged into Adjustments.
      assert(agiPages.size == 3, s"expected 3 AGI sub-pages, got ${agiPages.size}: ${agiPages.map(_.route)}")
    }

    it("derives routes from the h3 text") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val agiRoutes = exploded.filter(_.sourcePageRoute.contains("/agi")).map(_.route)
      assert(agiRoutes.contains("/agi/earned-income"))
      assert(agiRoutes.contains("/agi/other-income"))
      assert(agiRoutes.contains("/agi/adjustments"))
    }

    it("keeps multiple questions on the same emitted page when they share an h3") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val earnedIncomePage = exploded.find(_.route == "/agi/earned-income").get
      // Earned Income contains: Wages, Self-employment gross income, Self-employment expenses,
      // Disability retirement, Foreign earned income → 5 fg-sets.
      val fgSetCount = countFgSets(earnedIncomePage.children)
      assert(fgSetCount == 5, s"expected 5 fg-sets on /agi/earned-income, got $fgSetCount")
    }

    it("attaches AGI knockout alerts to the last emitted h3 group (adjustments)") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val adjustmentsPage = exploded.find(_.route == "/agi/adjustments").get
      // The trailing knockouts after "Your AGI was:" should land on the last questions page.
      val knockouts = adjustmentsPage.knockoutConditionPaths
      assert(
        knockouts.contains("/flowShouldShowEitcAgiKnockoutOnAdjustmentsPage"),
        s"expected agi knockout on /agi/adjustments; got $knockouts",
      )
      assert(knockouts.contains("/belowEitcAgiLimit"))
      assert(knockouts.contains("/belowEitcInvestmentIncomeLimit"))
    }

    it("does not affect about-you (no group-by set) — it still uses per-question slicing") {
      val exploded = PageSplitter.split(originalFlow.pages)
      val aboutYouPages = exploded.filter(_.sourcePageRoute.contains("/"))
      assert(aboutYouPages.exists(_.route == "/chosen-tax-year"))
      assert(aboutYouPages.exists(_.route == "/is-us-citizen-or-resident-alien"))
    }
  }

  private def countFgSets(nodes: Seq[FlowNode]): Int = nodes.iterator.map {
    case _: FgSet    => 1
    case s: Section  => countFgSets(s.children)
    case d: FgDetail => countFgSets(d.children)
    case a: FgAlert  => countFgSets(a.children)
    case _: FlowNode => 0
  }.sum
}
