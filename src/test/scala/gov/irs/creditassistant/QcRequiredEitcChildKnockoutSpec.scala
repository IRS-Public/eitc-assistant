package gov.irs.creditassistant

import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import java.util.UUID
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** Fact-graph checks for Qualifying Children page knockouts when EITC requires a QC: Single/QSS/MFJ (claiming QC,
  * outside 25–64); MFS; married HOH; or unmarried HOH (outside 25–64) — plus results-layer /maybeEligibleForEitc guard
  * when cohort applies but /eitcQualifyingChildren is zero.
  */
final class QcRequiredEitcChildKnockoutSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private def applyCohortSingleUnder24ClaimingQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    graph.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    graph.set("/primaryFilerIsClaimingQualifyingChildren", true)
  }

  private def applyCohortMfsAge25to64ClaimingQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("marriedFilingSeparately", "/filingStatusOptions"))
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
    graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    graph.set("/primaryFilerIsClaimingQualifyingChildren", true)
  }

  private def applyCohortMarriedHohClaimingQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
    graph.set("/isHOHMarried", true)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
    graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    graph.set("/primaryFilerIsClaimingQualifyingChildren", true)
  }

  private def applyCohortUnmarriedHohUnder24ClaimingQc(graph: Graph): Unit = {
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
    graph.set("/isHOHMarried", false)
    graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
    graph.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    graph.set("/primaryFilerIsClaimingQualifyingChildren", true)
  }

  /** Materialize an empty committed collection so /familyAndHousehold is IsComplete (mirrors `FgCollectionItem.clear`).
    */
  private def materializeEmptyFamilyAndHousehold(graph: Graph): Unit = {
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    // Remove the row by deleting the member root. (`removeFromCollection` calls `set` without
    // allowCollectionItemDelete; deleting `/…/#id` lets Fact.delete shrink the parent Collection.)
    graph.delete(s"/familyAndHousehold/#$id")
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

  it should "be false when cohort applies but primary is in the 25–64 age band (single)" in {
    val g = newFactGraph()
    applyCohortSingleUnder24ClaimingQc(g)
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    g.save()
    assertBooleanGateOff(g, "/flowShouldShowQcRequiredAddChildKnockout")
  }

  "/flowCohortEitcRequiresQualifyingChildEntry" should "be true for MFS, 25–64, claiming EITC qualifying children" in {
    val g = newFactGraph()
    applyCohortMfsAge25to64ClaimingQc(g)
    g.save()
    booleanAt(g, "/flowCohortEitcRequiresQualifyingChildEntry") shouldBe true
  }

  it should "be true for married HOH, 25–64, claiming EITC qualifying children" in {
    val g = newFactGraph()
    applyCohortMarriedHohClaimingQc(g)
    g.save()
    booleanAt(g, "/flowCohortEitcRequiresQualifyingChildEntry") shouldBe true
  }

  it should "be true for unmarried HOH, under 24, claiming EITC qualifying children" in {
    val g = newFactGraph()
    applyCohortUnmarriedHohUnder24ClaimingQc(g)
    g.save()
    booleanAt(g, "/flowCohortEitcRequiresQualifyingChildEntry") shouldBe true
  }

  it should "be true for unmarried HOH, 65 and older, claiming EITC qualifying children" in {
    val g = newFactGraph()
    applyCohortUnmarriedHohUnder24ClaimingQc(g)
    g.set("/ageRange", FgEnum("65andOlder", "/ageRangeOptions"))
    g.save()
    booleanAt(g, "/flowCohortEitcRequiresQualifyingChildEntry") shouldBe true
  }

  it should "be false for unmarried HOH, 25–64, claiming EITC qualifying children" in {
    val g = newFactGraph()
    applyCohortUnmarriedHohUnder24ClaimingQc(g)
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    g.save()
    assertBooleanGateOff(g, "/flowCohortEitcRequiresQualifyingChildEntry")
  }

  "/flowShouldShowQcRequiredAddChildKnockout" should "be true for MFS 25–64 when household is empty" in {
    val g = newFactGraph()
    applyCohortMfsAge25to64ClaimingQc(g)
    g.save()
    booleanAt(g, "/flowShouldShowQcRequiredAddChildKnockout") shouldBe true
  }

  it should "be true for unmarried HOH under 24 when household is empty" in {
    val g = newFactGraph()
    applyCohortUnmarriedHohUnder24ClaimingQc(g)
    g.save()
    booleanAt(g, "/flowShouldShowQcRequiredAddChildKnockout") shouldBe true
  }

  "/flowDisqualifiedEitcZeroEitcChildrenWhenQcEntryRequired" should "be true when MFS cohort applies and eitc QC count is zero" in {
    val g = newFactGraph()
    applyCohortMfsAge25to64ClaimingQc(g)
    materializeEmptyFamilyAndHousehold(g)
    g.save()
    booleanAt(g, "/flowDisqualifiedEitcZeroEitcChildrenWhenQcEntryRequired") shouldBe true
  }

  it should "be true when unmarried HOH under 24 cohort applies and eitc QC count is zero" in {
    val g = newFactGraph()
    applyCohortUnmarriedHohUnder24ClaimingQc(g)
    materializeEmptyFamilyAndHousehold(g)
    g.save()
    booleanAt(g, "/flowDisqualifiedEitcZeroEitcChildrenWhenQcEntryRequired") shouldBe true
  }

  "/flowShouldAllowAddAnotherQualifyingChild" should "be true when fewer than three EITC QCs are counted" in {
    val g = newFactGraph()
    applyCohortSingleUnder24ClaimingQc(g)
    g.save()
    booleanAt(g, "/flowShouldAllowAddAnotherQualifyingChild") shouldBe true
  }

  "QC required knockout wrapper facts" should "turn on after Continue flag is set for the empty-household path" in {
    val g = newFactGraph()
    applyCohortSingleUnder24ClaimingQc(g)
    g.set("/flowClickedNextOnQualifyingChildrenPage", true)
    g.save()
    booleanAt(g, "/flowShouldShowQcRequiredAddChildKnockoutAfterContinue") shouldBe true
  }
}
