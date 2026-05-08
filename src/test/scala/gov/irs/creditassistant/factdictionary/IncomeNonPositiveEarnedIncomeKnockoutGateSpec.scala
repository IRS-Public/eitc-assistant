package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.Dollar
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** `/flowShouldShowNonPositiveEarnedIncomeKnockoutAfterContinue` gates the Income earned-income knockout until the user
  * clicks Next once.
  */
final class IncomeNonPositiveEarnedIncomeKnockoutGateSpec
    extends AnyFlatSpec
    with Matchers
    with CreditAssistantTestHelpers {

  private val gatePath = "/flowShouldShowNonPositiveEarnedIncomeKnockoutAfterContinue"

  private def graphWithNonPositiveEarnedIncome(graph: Graph): Unit = {
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
