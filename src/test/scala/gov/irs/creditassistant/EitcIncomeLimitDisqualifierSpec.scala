package gov.irs.creditassistant

import gov.irs.factgraph.types.Dollar
import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** TXE-21722: final AGI / earned income vs completed phase-out (after QC count is known) and QC-page knockout gate. */
final class EitcIncomeLimitDisqualifierSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private val gatePath = "/flowShouldShowEitcIncomeLimitKnockoutAfterContinue"

  /** Not claiming QCs: zero-child limit applies; income above that line disqualifies on AGI and earned income. */
  private def graphOverZeroChildLimitNotClaimingQc2025(graph: Graph): Unit = {
    graph.set("/chosenTaxYear", FgEnum("2025", "/taxYearOptions"))
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
    graph.set("/jobsIncomeTotal", Dollar(20_000))
  }

  "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits" should "be true when AGI and earned income are at or above the zero-QC limit (2025 single)" in {
    val g = newFactGraph()
    graphOverZeroChildLimitNotClaimingQc2025(g)
    g.save()
    booleanAt(g, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe true
  }

  it should "not show the QC income-limit knockout until Continue has been clicked" in {
    val g = newFactGraph()
    graphOverZeroChildLimitNotClaimingQc2025(g)
    g.save()
    booleanAt(g, "/flowShouldRevealEitcIncomeLimitOnQualifyingChildrenContinue") shouldBe true
    assertBooleanGateOff(g, gatePath)
  }

  it should "show the QC income-limit knockout after Continue flag is set" in {
    val g = newFactGraph()
    graphOverZeroChildLimitNotClaimingQc2025(g)
    g.set("/flowClickedNextOnQualifyingChildrenPageForIncomeLimit", true)
    g.save()
    booleanAt(g, gatePath) shouldBe true
  }
}
