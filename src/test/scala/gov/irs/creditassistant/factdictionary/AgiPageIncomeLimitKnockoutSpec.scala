package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.{ Dollar, Enum as FgEnum }
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

final class AgiPageIncomeLimitKnockoutSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private val gatePath = "/flowShouldShowEitcAgiLimitKnockoutWithoutQcs"
  private val tentativeGatePath = "/flowShouldShowEitcAgiKnockoutOnAdjustmentsPage"

  private val taxYears = Seq("2023", "2024", "2025")
  private val filingStatuses = Seq(
    "single",
    "headOfHousehold",
    "marriedFilingSeparately",
    "qualifiedSurvivingSpouse",
    "marriedFilingJointly",
  )

  // The graph as a user reaches the AGI page: Filing Status answered, nothing entered on Qualifying Children yet.
  private def agiPageGraph(taxYear: String, filingStatus: String, claimingQcs: Boolean, wages: Long): Graph = {
    val graph = newFactGraph()
    applyEitcCsvScenarioBaseline(graph, claimingQualifyingChildren = claimingQcs)
    graph.set("/chosenTaxYear", FgEnum(taxYear, "/taxYearOptions"))
    graph.set("/initialFilingStatus", FgEnum(filingStatus, "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    graph.set("/jobsIncomeTotal", Dollar(wages))
    graph.set("/flowClickedNextOnAdjustmentsPage", true)
    graph.save()
    graph
  }

  private def zeroQcAndHighestLimits(taxYear: String, filingStatus: String): (Long, Long) = {
    val graph = agiPageGraph(taxYear, filingStatus, claimingQcs = false, wages = 0L)
    (longAt(graph, "/eitcCompletedPhaseoutAmount"), longAt(graph, "/highestEitcPhaseoutAmount"))
  }

  private def forEachYearAndFilingStatus(test: (String, String, Long, Long) => Unit): Unit =
    for
      taxYear <- taxYears
      filingStatus <- filingStatuses
    do
      val (zeroQcLimit, highestLimit) = zeroQcAndHighestLimits(taxYear, filingStatus)
      withClue(s"taxYear=$taxYear filingStatus=$filingStatus zeroQcLimit=$zeroQcLimit highestLimit=$highestLimit") {
        test(taxYear, filingStatus, zeroQcLimit, highestLimit)
      }

  gatePath should "not knock out the reported 2025 HOH $35,000 and MFJ $65,000 filers who plan to claim children" in
    Seq("headOfHousehold" -> 35_000L, "marriedFilingJointly" -> 65_000L).foreach { case (filingStatus, wages) =>
      val g = agiPageGraph("2025", filingStatus, claimingQcs = true, wages)
      withClue(s"filingStatus=$filingStatus wages=$wages") {
        booleanAt(g, "/belowEitcAgiLimit") shouldBe false
        booleanAt(g, gatePath) shouldBe false
        booleanAt(g, tentativeGatePath) shouldBe false
      }
    }

  it should "not knock out a filer claiming children between the zero-QC and highest limits" in
    forEachYearAndFilingStatus { (taxYear, filingStatus, zeroQcLimit, highestLimit) =>
      Seq(zeroQcLimit, highestLimit - 1).foreach { wages =>
        val g = agiPageGraph(taxYear, filingStatus, claimingQcs = true, wages)
        withClue(s"wages=$wages") {
          booleanAt(g, gatePath) shouldBe false
          booleanAt(g, tentativeGatePath) shouldBe false
        }
      }
    }

  it should "leave a filer claiming children at the highest limit to the tentative AGI knockout" in
    forEachYearAndFilingStatus { (taxYear, filingStatus, _, highestLimit) =>
      val g = agiPageGraph(taxYear, filingStatus, claimingQcs = true, highestLimit)
      booleanAt(g, gatePath) shouldBe false
      booleanAt(g, tentativeGatePath) shouldBe true
    }

  it should "knock out a filer not claiming children from the zero-QC limit up" in
    forEachYearAndFilingStatus { (taxYear, filingStatus, zeroQcLimit, _) =>
      booleanAt(agiPageGraph(taxYear, filingStatus, claimingQcs = false, zeroQcLimit - 1), gatePath) shouldBe false
      booleanAt(agiPageGraph(taxYear, filingStatus, claimingQcs = false, zeroQcLimit), gatePath) shouldBe true
    }

  "The Qualifying Children income-limit knockout" should "apply the one-QC limit once the child is entered" in {
    val oneQcLimit = {
      val g = agiPageGraph("2025", "headOfHousehold", claimingQcs = true, wages = 0L)
      longAt(g, "/eitcSelfLimitWithOneChild")
    }
    Seq(35_000L -> false, oneQcLimit - 1 -> false, oneQcLimit -> true).foreach { case (wages, knockedOut) =>
      val g = agiPageGraph("2025", "headOfHousehold", claimingQcs = true, wages)
      booleanAt(g, gatePath) shouldBe false
      addEitcQualifyingChildUnder19(g)
      g.set("/flowClickedNextOnQualifyingChildrenPageForIncomeLimit", true)
      g.save()
      withClue(s"wages=$wages oneQcLimit=$oneQcLimit") {
        longAt(g, "/eitcQualifyingChildren") shouldBe 1L
        booleanAt(g, "/flowShouldShowEitcIncomeLimitKnockoutAfterContinue") shouldBe knockedOut
      }
    }
  }
}
