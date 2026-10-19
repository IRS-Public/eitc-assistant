package gov.irs.creditassistant.factdictionary

import gov.irs.creditassistant.loadCreditAssistantFactDictionary
import gov.irs.factgraph.types.Enum as FgEnum
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import scala.xml.Node

final class TaxYearConstantsSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private val facts: Seq[Node] = loadCreditAssistantFactDictionary().xml \ "Facts" \ "Fact"
  private val factPaths: Set[String] = facts.map(_ \@ "path").toSet

  private val offeredYears: Seq[String] =
    facts.filter(_ \@ "path" == "/taxYearOptions").flatMap(_ \\ "String").map(_.text.trim)

  private val TaxYearPredicate = """/isTaxYear(\d{4})""".r

  private val yearSwitches: Map[String, Seq[(String, String)]] =
    facts.flatMap { fact =>
      val cases = (fact \\ "Case").flatMap { c =>
        (c \ "When" \ "Dependency").map(_ \@ "path") match
          case Seq(TaxYearPredicate(year)) => Some(year -> ((c \ "Then" \ "Dependency") \@ "path"))
          case _                           => None
      }
      if cases.isEmpty then None else Some((fact \@ "path") -> cases)
    }.toMap

  "/taxYearOptions" should "offer at least one tax year" in {
    offeredYears should not be empty
  }

  it should "resolve /taxYear to the selected year for every offered year" in
    offeredYears.foreach { year =>
      val g = newFactGraph()
      g.set("/chosenTaxYear", FgEnum(year, "/taxYearOptions"))
      g.save()
      withClue(s"chosenTaxYear=$year: ")(longAt(g, "/taxYear") shouldBe year.toLong)
    }

  it should "have an /isTaxYearYYYY predicate for every offered year" in
    offeredYears.foreach(year => factPaths should contain(s"/isTaxYear$year"))

  "Every fact that switches on /isTaxYearYYYY" should "have exactly one case for each offered year and none for others" in {
    yearSwitches should not be empty
    yearSwitches.foreach { case (path, cases) =>
      withClue(s"$path: ")(cases.map(_._1).sorted shouldBe offeredYears.sorted)
    }
  }

  it should "point each case at a yearly fact that exists" in
    yearSwitches.foreach { case (path, cases) =>
      cases.foreach { case (year, target) =>
        withClue(s"$path, $year case: ")(factPaths should contain(target))
      }
    }

  it should "be defined only once" in {
    val duplicates = facts.map(_ \@ "path").filter(yearSwitches.contains).groupBy(identity).filter(_._2.size > 1)
    duplicates.keys shouldBe empty
  }
}
