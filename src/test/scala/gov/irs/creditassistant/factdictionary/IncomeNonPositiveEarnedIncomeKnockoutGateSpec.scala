package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.{ Dollar, Enum as FgEnum }
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

final class IncomeNonPositiveEarnedIncomeKnockoutGateSpec
    extends AnyFlatSpec
    with Matchers
    with CreditAssistantTestHelpers {

  private val gatePath = "/flowShouldShowNonPositiveEarnedIncomeKnockoutAfterContinue"

  private def graphWithNonPositiveEarnedIncome(graph: Graph): Unit = {
    // Set on About You before Income; the Schedule SE deduction in /earnedIncomeTotal needs the tax year.
    graph.set("/chosenTaxYear", FgEnum("2025", "/taxYearOptions"))
    graph.set("/jobsIncomeTotal", Dollar(0))
    graph.set("/selfEmploymentGrossIncome", Dollar(0))
    graph.set("/selfEmploymentGrossIncomeWorkRelatedExpenses", Dollar(0))
  }

  it should "not be complete true when earned income is non-positive but Next has not been clicked on Income" in {
    val g = newFactGraph()
    graphWithNonPositiveEarnedIncome(g)
    g.save()
    booleanAt(g, "/flowShouldShowNonPositiveEarnedIncomeKnockout") shouldBe true
    assertBooleanGateOff(g, gatePath)
  }

  it should "be true when earned income is non-positive and the flow has recorded Next on Income" in {
    val g = newFactGraph()
    graphWithNonPositiveEarnedIncome(g)
    g.set("/flowClickedNextOnIncomePageForNonPositiveEarnedIncomeKnockout", true)
    g.save()
    booleanAt(g, gatePath) shouldBe true
  }
}
