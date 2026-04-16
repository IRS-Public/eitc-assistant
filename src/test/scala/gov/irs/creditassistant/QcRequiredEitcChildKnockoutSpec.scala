package gov.irs.creditassistant

import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** Fact-graph checks for Qualifying Children page knockouts when EITC requires a QC (Single/QSS/MFJ, claiming QC,
  * outside 25–64).
  */
final class QcRequiredEitcChildKnockoutSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private def applyCohortSingleUnder24ClaimingQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    graph.set("/primaryFilerIsClaimingQualifyingChildren", true)
  }

  "/flowCohortEitcRequiresQualifyingChildEntry" should "be true for single, under 24, claiming EITC qualifying children" in {
    val g = newFactGraph()
    applyCohortSingleUnder24ClaimingQc(g)
    g.save()
    booleanAt(g, "/flowCohortEitcRequiresQualifyingChildEntry") shouldBe true
  }

  "/flowShouldShowQcRequiredAddChildKnockout" should "be true when cohort applies and household is empty" in {
    val g = newFactGraph()
    applyCohortSingleUnder24ClaimingQc(g)
    g.save()
    booleanAt(g, "/flowShouldShowQcRequiredAddChildKnockout") shouldBe true
    assertBooleanGateOff(g, "/flowShouldShowQcRequiredAddChildKnockoutAfterContinue")
  }

  it should "be false when cohort applies but primary is in the 25–64 age band" in {
    val g = newFactGraph()
    applyCohortSingleUnder24ClaimingQc(g)
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    g.save()
    assertBooleanGateOff(g, "/flowShouldShowQcRequiredAddChildKnockout")
  }

  "QC required knockout wrapper facts" should "turn on after Continue flag is set for the empty-household path" in {
    val g = newFactGraph()
    applyCohortSingleUnder24ClaimingQc(g)
    g.set("/flowClickedNextOnQualifyingChildrenPage", true)
    g.save()
    booleanAt(g, "/flowShouldShowQcRequiredAddChildKnockoutAfterContinue") shouldBe true
  }
}
