package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.{ Dollar, Enum as FgEnum }
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** EITC qualifying-child relationship, residency, and joint-return cases aligned with
  * `src/test/resources/csv/qc-rel-res-joint-return.csv` (data rows; header/ColumnN are for tooling). “Relationship
  * anything but `none`” is modeled as `childStepFoster`. A constant filing baseline (Single, 25–64) keeps focus on the
  * child row; other filing statuses in the app work with the same `familyAndHousehold` fields.
  */
final class QcRelResJointReturnCsvEitcScenariosSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private def graphWithOneChild(
      addChild: Graph => String,
  ): (Graph, String) =
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, claimingQualifyingChildren = true)
    g.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    val id = addChild(g)
    g.set("/jobsIncomeTotal", Dollar(eitcCsvEarnedIncomeDollarsForPhaseout(1, mfj = false)))
    g.save()
    (g, id)

  it should "row 1: lived with TP, else can claim, still claim, child MFJ + refund-only, non-none relationship" in {
    val (g, id) = graphWithOneChild(addEitcQualifyingChildSomeoneElseClaimStillClaimsMfjRefundOnly)
    booleanAt(g, s"/familyAndHousehold/#$id/isEitcQualifyingChild") shouldBe true
    assertEitcCsvEligibleOutcomes(g, mfj = false, expectedEitcQualifyingChildCount = Some(1))
  }

  it should "row 2: else cannot claim, child MFJ + refund-only" in {
    val (g, id) = graphWithOneChild(addEitcQualifyingChildMfjFilingRefundOnly)
    booleanAt(g, s"/familyAndHousehold/#$id/isEitcQualifyingChild") shouldBe true
    assertEitcCsvEligibleOutcomes(g, mfj = false, expectedEitcQualifyingChildCount = Some(1))
  }

  it should "row 3: else cannot claim, child not MFJ" in {
    val (g, id) = graphWithOneChild(addEitcQualifyingChildNotMarriedFilingJointly)
    booleanAt(g, s"/familyAndHousehold/#$id/isEitcQualifyingChild") shouldBe true
    assertEitcCsvEligibleOutcomes(g, mfj = false, expectedEitcQualifyingChildCount = Some(1))
  }

}
