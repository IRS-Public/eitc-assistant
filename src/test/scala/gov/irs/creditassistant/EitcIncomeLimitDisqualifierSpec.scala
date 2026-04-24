package gov.irs.creditassistant

import gov.irs.factgraph.types.Dollar
import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import java.util.UUID
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** TXE-21722: final AGI / earned income vs completed phase-out (after QC count is known) and QC-page knockout gate. */
final class EitcIncomeLimitDisqualifierSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private val gatePath = "/flowShouldShowEitcIncomeLimitKnockoutAfterContinue"

  private def applyNoQcBaseline(graph: Graph, filingStatus: String): Unit = {
    graph.set("/chosenTaxYear", FgEnum("2025", "/taxYearOptions"))
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum(filingStatus, "/filingStatusOptions"))
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  private def addStaleHouseholdRow(graph: Graph): Unit = {
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
  }

  private def addValidEitcQc(graph: Graph): Unit = {
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    graph.set(s"/familyAndHousehold/#$id/livedWithYouUS", true)
    graph.set(s"/familyAndHousehold/#$id/someoneElseCanClaim", false)
    graph.set(s"/familyAndHousehold/#$id/isClaimingQCRegardless", false)
    graph.set(s"/familyAndHousehold/#$id/marriedFilingJointly", false)
    graph.set(s"/familyAndHousehold/#$id/isPermanentlyDisabled", false)
    graph.set(s"/familyAndHousehold/#$id/ageRange", FgEnum("between19And23", "/ageRangeOptionsQC"))
    graph.set(s"/familyAndHousehold/#$id/isFullTimeStudent", true)
    graph.set(
      s"/familyAndHousehold/#$id/relationshipCategory",
      FgEnum("siblingOrDescendants", "/relationshipCategoryOptions"),
    )
    graph.set(s"/familyAndHousehold/#$id/siblingRelationship", FgEnum("sibling", "/siblingRelationshipOptions"))
    graph.set(s"/familyAndHousehold/#$id/relationship", FgEnum("sibling", "/relationshipOptions"))
    graph.set(s"/familyAndHousehold/#$id/validSSN", true)
  }

  private def noQcPhaseoutLimit(graph: Graph, filingStatus: String): Long = {
    applyNoQcBaseline(graph, filingStatus)
    graph.save()
    longAt(graph, "/eitcCompletedPhaseoutAmount")
  }

  private def applyNoQcHighIncomeScenario(graph: Graph, filingStatus: String, jobsIncome: Long): Unit = {
    applyNoQcBaseline(graph, filingStatus)
    graph.set("/jobsIncomeTotal", Dollar(jobsIncome))
  }

  "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits" should "be true at the no-QC completed phaseout limit (single, current tax year)" in {
    val g = newFactGraph()
    val limit = noQcPhaseoutLimit(g, "single")
    g.set("/jobsIncomeTotal", Dollar(limit))
    g.save()
    booleanAt(g, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe true
  }

  it should "be false just below the no-QC completed phaseout limit (single, current tax year)" in {
    val g = newFactGraph()
    val limit = noQcPhaseoutLimit(g, "single")
    g.set("/jobsIncomeTotal", Dollar(limit - 1))
    g.save()
    booleanAt(g, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe false
  }

  it should "flip from false to true at MFJ no-QC completed phaseout boundary (current tax year)" in {
    val below = newFactGraph()
    val mfjLimit = noQcPhaseoutLimit(below, "marriedFilingJointly")
    below.set("/jobsIncomeTotal", Dollar(mfjLimit - 1))
    below.save()
    booleanAt(below, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe false

    val at = newFactGraph()
    noQcPhaseoutLimit(at, "marriedFilingJointly")
    at.set("/jobsIncomeTotal", Dollar(mfjLimit))
    at.save()
    booleanAt(at, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe true
  }

  it should "disqualify when AGI is at limit even if earned income is below limit" in {
    val g = newFactGraph()
    val limit = noQcPhaseoutLimit(g, "single")
    g.set("/jobsIncomeTotal", Dollar(0))
    g.set("/pensionsIncomeTotal", Dollar(limit))
    g.save()
    booleanAt(g, "/belowEitcEarnedIncomeLimit") shouldBe true
    booleanAt(g, "/belowEitcAgiLimit") shouldBe false
    booleanAt(g, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe true
  }

  it should "use one-child limit when claiming QCs with a valid EITC child" in {
    val g = newFactGraph()
    val noQcLimit = noQcPhaseoutLimit(g, "single")
    g.set("/primaryFilerIsClaimingQualifyingChildren", true)
    addValidEitcQc(g)
    g.save()
    longAt(g, "/eitcCompletedPhaseoutAmount") should be > noQcLimit
    g.set("/jobsIncomeTotal", Dollar(noQcLimit))
    g.save()
    booleanAt(g, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe false
  }

  it should "not show the QC income-limit knockout until Continue has been clicked" in {
    val g = newFactGraph()
    val limit = noQcPhaseoutLimit(g, "single")
    g.set("/jobsIncomeTotal", Dollar(limit))
    g.save()
    booleanAt(g, "/flowShouldRevealEitcIncomeLimitOnQualifyingChildrenContinue") shouldBe true
    assertBooleanGateOff(g, gatePath)
  }

  it should "show the QC income-limit knockout after Continue flag is set" in {
    val g = newFactGraph()
    val limit = noQcPhaseoutLimit(g, "single")
    g.set("/jobsIncomeTotal", Dollar(limit))
    g.set("/flowClickedNextOnQualifyingChildrenPageForIncomeLimit", true)
    g.save()
    booleanAt(g, gatePath) shouldBe true
  }

  it should "still disqualify when not claiming QCs and a stale household UUID is present (single)" in {
    val g = newFactGraph()
    val limit = noQcPhaseoutLimit(g, "single")
    g.set("/jobsIncomeTotal", Dollar(limit))
    addStaleHouseholdRow(g)
    g.set("/flowClickedNextOnQualifyingChildrenPageForIncomeLimit", true)
    g.save()
    booleanAt(g, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe true
    booleanAt(g, gatePath) shouldBe true
  }

  it should "disqualify across filing statuses with stale household data when not claiming QCs" in {
    val filingStatuses = Seq(
      "single",
      "headOfHousehold",
      "marriedFilingSeparately",
      "qualifiedSurvivingSpouse",
      "marriedFilingJointly",
    )

    filingStatuses.foreach { filingStatus =>
      val g = newFactGraph()
      val limit = noQcPhaseoutLimit(g, filingStatus)
      applyNoQcHighIncomeScenario(g, filingStatus, limit)
      addStaleHouseholdRow(g)
      g.set("/flowClickedNextOnQualifyingChildrenPageForIncomeLimit", true)
      g.save()

      withClue(s"filingStatus=$filingStatus jobsIncome=$limit") {
        booleanAt(g, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe true
        booleanAt(g, gatePath) shouldBe true
      }
    }
  }
}
