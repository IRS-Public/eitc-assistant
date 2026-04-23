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

  it should "be true on a fresh graph when earned-income inputs are still blank" in {
    val graph = newFactGraph()
    booleanAt(graph, knockoutPath) shouldBe true
  }

  it should "be true when wage and self-employment inputs are complete and earned income is not positive" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(0))
    graph.set("/selfEmploymentGrossIncome", Dollar(0))
    graph.set("/selfEmploymentGrossIncomeWorkRelatedExpenses", Dollar(0))
    booleanAt(graph, knockoutPath) shouldBe true
    booleanAt(graph, "/hasEarnedIncome") shouldBe false
  }

  it should "be false when jobs income alone makes earned income positive" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(5000))
    graph.set("/selfEmploymentGrossIncome", Dollar(0))
    graph.set("/selfEmploymentGrossIncomeWorkRelatedExpenses", Dollar(0))
    booleanAt(graph, knockoutPath) shouldBe false
    booleanAt(graph, "/hasEarnedIncome") shouldBe true
  }

  it should "be false when jobs income is positive and self-employment fields remain blank" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(5000))
    booleanAt(graph, knockoutPath) shouldBe false
    booleanAt(graph, "/hasEarnedIncome") shouldBe true
  }

  it should "be false when disability retirement benefits alone make earned income positive" in {
    val graph = newFactGraph()
    graph.set("/disabilityRetirementBenefits", Dollar(1500))
    booleanAt(graph, knockoutPath) shouldBe false
    booleanAt(graph, "/hasEarnedIncome") shouldBe true
  }

  it should "be false when non-2555 foreign earned income alone makes earned income positive" in {
    val graph = newFactGraph()
    graph.set("/non2555ForeignIncome", Dollar(2500))
    booleanAt(graph, knockoutPath) shouldBe false
    booleanAt(graph, "/hasEarnedIncome") shouldBe true
  }

  it should "be false when net self-employment makes earned income positive" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(0))
    graph.set("/selfEmploymentGrossIncome", Dollar(8000))
    graph.set("/selfEmploymentGrossIncomeWorkRelatedExpenses", Dollar(0))
    booleanAt(graph, knockoutPath) shouldBe false
    booleanAt(graph, "/hasEarnedIncome") shouldBe true
  }

  it should "be true when self-employment gross is non-zero but net earned income is not positive" in {
    val graph = newFactGraph()
    graph.set("/jobsIncomeTotal", Dollar(0))
    graph.set("/selfEmploymentGrossIncome", Dollar(100))
    graph.set("/selfEmploymentGrossIncomeWorkRelatedExpenses", Dollar(200))
    booleanAt(graph, knockoutPath) shouldBe true
    booleanAt(graph, "/hasEarnedIncome") shouldBe false
  }
}
