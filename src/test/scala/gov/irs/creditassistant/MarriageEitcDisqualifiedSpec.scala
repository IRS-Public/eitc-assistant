package gov.irs.creditassistant

import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** Fact-graph checks for `/isDisqualifiedMarriedNotFilingJointly`. */
final class MarriageEitcDisqualifiedSpec extends AnyFlatSpec with Matchers {

  private def newFactGraph(): Graph = {
    val creditAssistantFactDictionary = loadCreditAssistantFactDictionary()
    val factGraph = Graph(creditAssistantFactDictionary.factDictionary)
    factGraph
  }

  /** Scenario 1: MFS, lived together, different principal residence, no EITC QCs. */
  private def applyScenario1DeriveMfsDifferentResidence(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", false)
    graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    graph.set("/intendsToFileJointlyMFJ", false)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/samePrincipalResidenceLast6Months", false)
    graph.set("/writableSeparationAgreement", false)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  /** Scenario 2: derive MFS, spouse did not live, paid ≤ half home, no EITC QCs. */
  private def applyScenario2DeriveMfsSpouseNotLived(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", false)
    graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    graph.set("/intendsToFileJointlyMFJ", false)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
    graph.set("/paidMoreThanHalfHomeCostsForChild", false)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  /** Scenario 3: derive HOH, spouse did not live, paid > half home, no EITC QCs. */
  private def applyScenario3DeriveHohSpouseNotLived(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", false)
    graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    graph.set("/intendsToFileJointlyMFJ", false)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
    graph.set("/paidMoreThanHalfHomeCostsForChild", true)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  /** Scenario 5: MFS, spouse lived together, same principal residence, not legally separated. */
  private def applyScenario5DeriveMfs(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", false)
    graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    graph.set("/intendsToFileJointlyMFJ", false)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/samePrincipalResidenceLast6Months", true)
    graph.set("/writableSeparationAgreement", false)
  }

  /** Scenario 6: derive MFS, same residence, legal separation, not claiming EITC QCs. */
  private def applyScenario6DeriveMfsSeparatedNoQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", false)
    graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    graph.set("/intendsToFileJointlyMFJ", false)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/samePrincipalResidenceLast6Months", true)
    graph.set("/writableSeparationAgreement", true)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  /** Scenario 7: user-selected MFS, lived together, legal separation, no EITC QCs. */
  private def applyScenario7PickMfsSeparatedNoQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingSeparately", "/filingStatusOptions"))
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/writableSeparationAgreement", true)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  /** Scenario 8: user-selected MFS, lived together, same principal residence, not separated. */
  private def applyScenario8PickMfsLivedNotSeparated(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingSeparately", "/filingStatusOptions"))
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/samePrincipalResidenceLast6Months", true)
    graph.set("/writableSeparationAgreement", false)
  }

  /** Scenario 9: user-selected MFS, spouse did not live, no EITC QCs. */
  private def applyScenario9PickMfsSpouseNotLivedNoQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingSeparately", "/filingStatusOptions"))
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  /** Scenario 10: user-selected HOH, married, spouse did not live, no EITC QCs. */
  private def applyScenario10PickHohSpouseNotLivedNoQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
    graph.set("/isHOHMarried", true)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  /** Scenario 11: user-selected HOH, married, lived together, not legally separated. */
  private def applyScenario11PickHohLivedNotSeparated(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
    graph.set("/isHOHMarried", true)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/writableSeparationAgreement", false)
  }

  /** Scenario 12: user-selected HOH, married, lived together, legal separation, no EITC QCs. */
  private def applyScenario12PickHohSeparatedNoQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
    graph.set("/isHOHMarried", true)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/writableSeparationAgreement", true)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", false)
  }

  private def booleanAt(graph: Graph, path: String): Boolean =
    graph.get(path).get.asInstanceOf[Boolean]

  "Marriage EITC disqualified" should "be true for scenario 1 (derive MFS, different principal residence, not claiming EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario1DeriveMfsDifferentResidence(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFS") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 2 (derive MFS, spouse not lived, not half home, no EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario2DeriveMfsSpouseNotLived(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFS") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 3 (derive HOH, spouse not lived, half home, no EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario3DeriveHohSpouseNotLived(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusHOH") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 5 (derive MFS, same residence, not separated)" in {
    val factGraph = newFactGraph()
    applyScenario5DeriveMfs(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFS") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 6 (derive MFS, same residence, separated, no EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario6DeriveMfsSeparatedNoQc(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFS") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 7 (pick MFS, lived, separated, no EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario7PickMfsSeparatedNoQc(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFS") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 8 (pick MFS, lived, same principal residence, not separated)" in {
    val factGraph = newFactGraph()
    applyScenario8PickMfsLivedNotSeparated(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFS") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 9 (pick MFS, spouse not lived, no EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario9PickMfsSpouseNotLivedNoQc(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFS") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 10 (pick HOH, married, spouse not lived, no EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario10PickHohSpouseNotLivedNoQc(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusHOH") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 11 (pick HOH, married, lived, not separated)" in {
    val factGraph = newFactGraph()
    applyScenario11PickHohLivedNotSeparated(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusHOH") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }

  it should "be true for scenario 12 (pick HOH, married, lived, legally separated, not claiming EITC QCs)" in {
    val factGraph = newFactGraph()
    applyScenario12PickHohSeparatedNoQc(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusHOH") shouldBe true
    booleanAt(factGraph, "/isDisqualifiedMarriedNotFilingJointly") shouldBe true
  }
}
