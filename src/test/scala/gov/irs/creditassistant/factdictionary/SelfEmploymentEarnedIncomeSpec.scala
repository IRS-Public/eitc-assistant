package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.{ Dollar, Enum as FgEnum }
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

final class SelfEmploymentEarnedIncomeSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private def applySingleNoQcBaseline(graph: Graph): Unit = {
    applyEitcCsvScenarioBaseline(graph, claimingQualifyingChildren = false)
    graph.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
    graph.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
  }

  private def applyIncome(graph: Graph, jobs: Long, netSelfEmployment: Long): Unit = {
    graph.set("/jobsIncomeTotal", Dollar(jobs))
    graph.set("/selfEmploymentGrossIncome", Dollar(netSelfEmployment))
    graph.set("/selfEmploymentGrossIncomeWorkRelatedExpenses", Dollar(0))
  }

  "/earnedIncomeTotal" should "subtract the SE tax deduction from net self-employment income (2025, single, no QC)" in {
    val g = newFactGraph()
    applySingleNoQcBaseline(g)
    applyIncome(g, jobs = 0L, netSelfEmployment = 8_000L)
    g.save()
    // Schedule SE: 8,000 × 92.35% = 7,388; × 15.3% = 1,130 SE tax; half = 565.
    longAt(g, "/selfEmploymentTaxDeduction") shouldBe 565L
    longAt(g, "/earnedIncomeTotal") shouldBe 7_435L
    longAt(g, "/agi") shouldBe 7_435L
    // 2025 no-QC table row $7,400–$7,450; using the undeducted $8,000 gave $614.
    longAt(g, "/earnedIncomeCredit") shouldBe 568L
  }

  it should "add wages to the reduced self-employment earnings" in {
    val g = newFactGraph()
    applySingleNoQcBaseline(g)
    applyIncome(g, jobs = 5_000L, netSelfEmployment = 8_000L)
    g.save()
    longAt(g, "/earnedIncomeTotal") shouldBe 12_435L
  }

  it should "leave net self-employment income whole below the Schedule SE $400 threshold" in {
    val g = newFactGraph()
    applySingleNoQcBaseline(g)
    applyIncome(g, jobs = 0L, netSelfEmployment = 300L)
    g.save()
    longAt(g, "/selfEmploymentTaxDeduction") shouldBe 0L
    longAt(g, "/earnedIncomeTotal") shouldBe 300L
  }
}
