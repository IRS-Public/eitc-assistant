package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** Fact-graph checks for MFJ spouse-alive / spouse-age flow gates (`/flowShouldSeeMfjSpouseFollowUpForEitcAgeRules`,
  * etc.).
  */
final class MfjSpouseFollowUpFlowGatesSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  /** Scenario 1: User knows filing status MFJ, primary age 24 and under, spouse has valid SSN. */
  private def applyScenario1MfjKnowsStatusUnder24SpouseSsnYes(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    graph.set("/secondaryFilerHasValidSSN", true)
  }

  /** Scenario 2: User knows filing status MFJ, primary age 65 and older, spouse has valid SSN. */
  private def applyScenario2MfjKnowsStatus65PlusSpouseSsnYes(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("65andOlder", "/ageRangeOptions"))
    graph.set("/secondaryFilerHasValidSSN", true)
  }

  /** Scenario 3: User knows filing status MFJ, primary age 25–64, spouse has valid SSN (MFJ EITC age follow-up does not
    * apply).
    */
  private def applyScenario3MfjKnowsStatusAge25to64SpouseSsnYes(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    graph.set("/secondaryFilerHasValidSSN", true)
  }

  /** Scenario 4: User knows filing status MFJ, primary under 24, spouse does not have valid SSN. */
  private def applyScenario4MfjKnowsStatusUnder24SpouseSsnNo(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    graph.set("/secondaryFilerHasValidSSN", false)
  }

  /** Scenario 5: User knows filing status MFJ, primary under 24, spouse has valid SSN; spouse-alive is completed
    * in-test.
    */
  private def applyScenario5MfjUnder24SpouseSsnYesBeforeSpouseAlive(graph: Graph): Unit =
    applyScenario1MfjKnowsStatusUnder24SpouseSsnYes(graph)

  /** Scenario 6: User knows filing status MFJ, primary 65+, spouse has valid SSN; spouse alive answered yes. */
  private def applyScenario6Mfj65PlusSpouseAliveYes(graph: Graph): Unit = {
    applyScenario2MfjKnowsStatus65PlusSpouseSsnYes(graph)
    graph.set("/spouseAliveEndOfTaxYear", true)
  }

  /** Scenario 7: User does not know filing status; married, intends MFJ, same residence, not separated; primary under
    * 24, spouse valid SSN.
    */
  private def applyScenario7DeriveMfjUnder24SpouseSsnYes(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", false)
    graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    graph.set("/intendsToFileJointlyMFJ", true)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
    graph.set("/samePrincipalResidenceLast6Months", true)
    graph.set("/writableSeparationAgreement", false)
    graph.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    graph.set("/secondaryFilerHasValidSSN", true)
  }

  "/flowShouldSeeMfjSpouseFollowUpForEitcAgeRules" should "be true for scenario 1 (knows MFJ, primary under 24, spouse valid SSN)" in {
    val factGraph = newFactGraph()
    applyScenario1MfjKnowsStatusUnder24SpouseSsnYes(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/flowShouldSeeMfjSpouseFollowUpForEitcAgeRules") shouldBe true
    booleanAt(factGraph, "/flowShouldSeeSpouseAliveEndOfTaxYear") shouldBe true
    booleanAt(factGraph, "/flowShouldSeeSpouseAgeRange") shouldBe false
  }

  it should "be true for scenario 2 (knows MFJ, primary 65+, spouse valid SSN)" in {
    val factGraph = newFactGraph()
    applyScenario2MfjKnowsStatus65PlusSpouseSsnYes(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/flowShouldSeeMfjSpouseFollowUpForEitcAgeRules") shouldBe true
    booleanAt(factGraph, "/flowShouldSeeSpouseAliveEndOfTaxYear") shouldBe true
    booleanAt(factGraph, "/flowShouldSeeSpouseAgeRange") shouldBe false
  }

  it should "be false for scenario 3 (knows MFJ, primary 25–64, spouse valid SSN)" in {
    val factGraph = newFactGraph()
    applyScenario3MfjKnowsStatusAge25to64SpouseSsnYes(factGraph)
    factGraph.save()
    booleanOptionAt(factGraph, "/flowShouldSeeMfjSpouseFollowUpForEitcAgeRules") shouldBe Some(false)
    assertBooleanGateOff(factGraph, "/flowShouldSeeSpouseAliveEndOfTaxYear")
  }

  it should "be false for scenario 4 (knows MFJ, under 24, spouse no valid SSN)" in {
    val factGraph = newFactGraph()
    applyScenario4MfjKnowsStatusUnder24SpouseSsnNo(factGraph)
    factGraph.save()
    booleanOptionAt(factGraph, "/flowShouldSeeMfjSpouseFollowUpForEitcAgeRules") shouldBe Some(false)
    assertBooleanGateOff(factGraph, "/flowShouldSeeSpouseAliveEndOfTaxYear")
  }

  "/flowShouldSeeSpouseAgeRange" should "be true for scenario 5 (MFJ under 24, after spouse-alive answered)" in {
    val factGraph = newFactGraph()
    applyScenario5MfjUnder24SpouseSsnYesBeforeSpouseAlive(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/flowShouldSeeSpouseAgeRange") shouldBe false
    factGraph.set("/spouseAliveEndOfTaxYear", true)
    factGraph.save()
    booleanAt(factGraph, "/flowShouldSeeSpouseAgeRange") shouldBe true
  }

  it should "be true for scenario 6 (MFJ 65+, spouse-alive answered)" in {
    val factGraph = newFactGraph()
    applyScenario6Mfj65PlusSpouseAliveYes(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/flowShouldSeeSpouseAgeRange") shouldBe true
  }

  it should "be true for scenario 7 (derive MFJ, under 24, spouse valid SSN)" in {
    val factGraph = newFactGraph()
    applyScenario7DeriveMfjUnder24SpouseSsnYes(factGraph)
    factGraph.save()
    booleanAt(factGraph, "/isFilingStatusMFJ") shouldBe true
    booleanAt(factGraph, "/flowShouldSeeMfjSpouseFollowUpForEitcAgeRules") shouldBe true
    booleanAt(factGraph, "/flowShouldSeeSpouseAliveEndOfTaxYear") shouldBe true
  }
}
