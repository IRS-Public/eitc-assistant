package gov.irs.creditassistant

import gov.irs.factgraph.types.Dollar
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** `/flowShouldShowNonPositiveEarnedIncomeKnockout` gates the Income page EITC earned-income knockout. */
final class NonPositiveEarnedIncomeKnockoutVisibilitySpec
    extends AnyFlatSpec
    with Matchers
    with CreditAssistantTestHelpers {

  private val knockoutPath = "/flowShouldShowNonPositiveEarnedIncomeKnockout"

  it should "not be complete true on a fresh graph (before income answers)" in {
    val graph = newFactGraph()
    assertBooleanGateOff(graph, knockoutPath)
  }

  it should "be true when wage and self-employment inputs are complete and earned income is not positive" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(0))
    graph.set("/selfEmplomentGrossIncome", Dollar(0))
    graph.set("/selfEmplomentGrossIncomeWorkRelatedExpenses", Dollar(0))
    booleanAt(graph, knockoutPath) shouldBe true
    booleanAt(graph, "/hasEarnedIncome") shouldBe false
  }

  it should "be false when jobs income alone makes earned income positive" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(5000))
    graph.set("/selfEmplomentGrossIncome", Dollar(0))
    graph.set("/selfEmplomentGrossIncomeWorkRelatedExpenses", Dollar(0))
    booleanAt(graph, knockoutPath) shouldBe false
    booleanAt(graph, "/hasEarnedIncome") shouldBe true
  }

  it should "be false when net self-employment makes earned income positive" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(0))
    graph.set("/selfEmplomentGrossIncome", Dollar(8000))
    graph.set("/selfEmplomentGrossIncomeWorkRelatedExpenses", Dollar(0))
    booleanAt(graph, knockoutPath) shouldBe false
    booleanAt(graph, "/hasEarnedIncome") shouldBe true
  }
}
