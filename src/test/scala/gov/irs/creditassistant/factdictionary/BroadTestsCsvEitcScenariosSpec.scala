package gov.irs.creditassistant.factdictionary

import gov.irs.creditassistant.factdictionary.CreditAssistantTestHelpers
import gov.irs.factgraph.types.{ Dollar, Enum as FgEnum }
import gov.irs.factgraph.Graph
import java.util.UUID
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** `src/test/resources/csv/broad-tests.csv` — one test per T1–T33 data row, exact dollars from the file.
  *
  *   - **Eligible (CSV)**: `assertEitcCsvEligibleOutcomes` (income, age, not KO).
  *   - **Ineligible (CSV)**: at least one ineligibility signal / KO via `assertEitcBroadTestIneligibility`.
  *
  * T13: CSV says Eligible with $15,000 earned and $11,950 investment; those imply AGI 26,950 in this model, so the
  * completed phase-out line for 0 QCs is exceeded. That row is covered as ineligible in this suite (income limitation),
  * not the CSV’s “Eligible” cell.
  */
final class BroadTestsCsvEitcScenariosSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  // --- Filing shims (all use knows filing + baseline) ---

  private def singleMfjFalse(g: Graph, age: String): Unit =
    g.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum(age, "/ageRangeOptions"))

  private def mfjAges(
      g: Graph,
      primary: String,
      secondary: String,
  ): Unit =
    g.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum(primary, "/ageRangeOptions"))
    g.set("/ageRangeSecondary", FgEnum(secondary, "/ageRangeOptions"))
    g.set("/secondaryFilerHasValidSSN", true)
    g.set("/spouseAliveEndOfTaxYear", true)

  private def hohUnmarried65(g: Graph): Unit =
    g.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
    g.set("/isHOHMarried", false)
    g.set("/ageRange", FgEnum("65andOlder", "/ageRangeOptions"))

  private def qss25to64(g: Graph): Unit =
    g.set("/maritalStatus", FgEnum("widowed", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("qualifiedSurvivingSpouse", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))

  private def mfsLived(g: Graph, apart: Boolean): Unit =
    g.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("marriedFilingSeparately", "/filingStatusOptions"))
    g.set("/spouseLivedWithTaxpayerLastSixMonths", !apart)
    if !apart then
      g.set("/samePrincipalResidenceLast6Months", true)
      g.set("/writableSeparationAgreement", false)
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))

  it should "T1: Happy path Single, 15,000.00, 0 inv, 15,000.00 agi, 25–64, 0 QCs" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, false)
    singleMfjFalse(g, "age25to64")
    g.set("/jobsIncomeTotal", Dollar(15_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, None)
  }

  it should "T2: Happy path MFJ, 20,000.00, 0, 0, 25–64 both, 0 QCs" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, false)
    mfjAges(g, "age25to64", "age25to64")
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = true, None)
  }

  it should "T3: Single 30,000.00, 0, 0, 25–64, 1 QC 18&under" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(30_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(1))
  }

  it should "T4: MFJ 40,000.00, 0, 0, 25–64, 1 QC" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfjAges(g, "age25to64", "age25to64")
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(40_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = true, Some(1))
  }

  it should "T5: HOH 65+ 40,000.00, 0, 0, 2 QCs" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    hohUnmarried65(g)
    addEitcQualifyingChildrenUnder19(g, 2)
    g.set("/jobsIncomeTotal", Dollar(40_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(2))
  }

  it should "T6: MFJ 60,000.00, 0, 0, 3 QCs" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfjAges(g, "age25to64", "age25to64")
    addEitcQualifyingChildrenUnder19(g, 3)
    g.set("/jobsIncomeTotal", Dollar(60_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = true, Some(3))
  }

  it should "T7: QSS 50,000.00, 0, 50,433.00, 1 QC" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    qss25to64(g)
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(50_000L))
    g.set("/pensionsIncomeTotal", Dollar(433L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    longAt(g, "/agi") shouldBe 50_433L
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(1))
  }

  it should "T8: Single at threshold 50,434.00, 1 QC — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(50_434L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T9: MFS 51,000.00, 0, 0, 1 QC (above) — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfsLived(g, apart = true)
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(51_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T10: MFJ 64,000.00, 0, 0, 2 QCs" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfjAges(g, "age25to64", "age25to64")
    addEitcQualifyingChildrenUnder19(g, 2)
    g.set("/jobsIncomeTotal", Dollar(64_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = true, Some(2))
  }

  it should "T11: MFJ 64,430.00, 0, 0, 65+ both, 2 QCs at limit — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfjAges(g, "65andOlder", "65andOlder")
    addEitcQualifyingChildrenUnder19(g, 2)
    g.set("/jobsIncomeTotal", Dollar(64_430L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = true)
  }

  it should "T12: MFJ 64,431.00, 0, 0, 24&under both, 2 QCs — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfjAges(g, "under24", "under24")
    addEitcQualifyingChildrenUnder19(g, 2)
    g.set("/jobsIncomeTotal", Dollar(64_431L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = true)
  }

  it should "T13: 15,000.00, 11,950.00 inv, 0 QCs — ineligible in graph (AGI includes investment vs CSV)" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, false)
    singleMfjFalse(g, "age25to64")
    g.set("/jobsIncomeTotal", Dollar(15_000L))
    g.set("/taxableInterestIncome", Dollar(11_950L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T14: QSS 15,000.00, 11,951.00 inv — ineligible (investment over limit)" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, false)
    qss25to64(g)
    g.set("/jobsIncomeTotal", Dollar(15_000L))
    g.set("/taxableInterestIncome", Dollar(11_951L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T15: no earned, 0 inv — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, false)
    singleMfjFalse(g, "age25to64")
    g.set("/jobsIncomeTotal", Dollar(0L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T16: 20,000.00, 0, 0, 65+, 1 QC 18&under" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "65andOlder")
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(1))
  }

  it should "T17: 20,000.00, 0, 0, 25–64, 1 QC 19–23 student" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    addEitcQualifyingChild19To23FullTimeStudent(g)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(1))
  }

  it should "T18: 19–23 not student — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    val id = UUID.randomUUID().toString
    g.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    g.set(s"$p/livedWithYouUS", true)
    g.set(s"$p/someoneElseCanClaim", false)
    g.set(s"$p/marriedFilingJointly", false)
    g.set(s"$p/isPermanentlyDisabled", false)
    g.set(s"$p/ageRange", FgEnum("between19And23", "/ageRangeOptionsQC"))
    g.set(s"$p/isFullTimeStudent", false)
    g.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    g.set(s"$p/validSSN", true)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T19: 24&under, 1 disabled adult QC" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "under24")
    addEitcQualifyingPermanentlyDisabledChild(g)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(1))
  }

  it should "T20: unrelated (relationship none) — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    val id = UUID.randomUUID().toString
    g.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    g.set(s"$p/livedWithYouUS", true)
    g.set(s"$p/someoneElseCanClaim", false)
    g.set(s"$p/marriedFilingJointly", false)
    g.set(s"$p/isPermanentlyDisabled", false)
    g.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    g.set(s"$p/relationship", FgEnum("none", "/relationshipOptions"))
    g.set(s"$p/validSSN", true)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T21: lives <6 months US — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    val id = addEitcQualifyingChildUnder19(g)
    g.set(s"/familyAndHousehold/#$id/livedWithYouUS", false)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T22: joint return refund only — eligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    addEitcQualifyingChildMfjFilingRefundOnly(g)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(1))
  }

  it should "T23: child MFJ not refund only — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    val id = UUID.randomUUID().toString
    g.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    g.set(s"$p/livedWithYouUS", true)
    g.set(s"$p/someoneElseCanClaim", false)
    g.set(s"$p/marriedFilingJointly", true)
    g.set(s"$p/mfjForRefundOnly", false)
    g.set(s"$p/isPermanentlyDisabled", false)
    g.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    g.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    g.set(s"$p/validSSN", true)
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T24: MFS lived apart 30,000.00 — eligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfsLived(g, apart = true)
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(30_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(1))
  }

  it should "T25: MFS lived together not separated — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfsLived(g, apart = false)
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(30_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T26: 50,000.00, 1,000.00 inv, 51,000.00 agi — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(50_000L))
    g.set("/taxableInterestIncome", Dollar(1_000L))
    g.save()
    longAt(g, "/agi") shouldBe 51_000L
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T27: 0, 1,000.00 inv, 1,000.00 agi — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(0L))
    g.set("/taxableInterestIncome", Dollar(1_000L))
    g.save()
    longAt(g, "/agi") shouldBe 1_000L
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T28: QC failed fallback, 25–64 — eligible (no-qc path)" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    val id = UUID.randomUUID().toString
    g.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    g.set(s"$p/livedWithYouUS", true)
    g.set(s"$p/someoneElseCanClaim", false)
    g.set(s"$p/marriedFilingJointly", false)
    g.set(s"$p/isPermanentlyDisabled", false)
    g.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    g.set(s"$p/relationship", FgEnum("none", "/relationshipOptions"))
    g.set(s"$p/validSSN", true)
    g.set("/jobsIncomeTotal", Dollar(15_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    longAt(g, "/eitcQualifyingChildren") shouldBe 0L
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(0))
  }

  it should "T29: 24&under, QC failed — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "under24")
    val id = UUID.randomUUID().toString
    g.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    g.set(s"$p/livedWithYouUS", true)
    g.set(s"$p/someoneElseCanClaim", false)
    g.set(s"$p/marriedFilingJointly", false)
    g.set(s"$p/isPermanentlyDisabled", false)
    g.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    g.set(s"$p/relationship", FgEnum("none", "/relationshipOptions"))
    g.set(s"$p/validSSN", true)
    g.set("/jobsIncomeTotal", Dollar(15_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T30: invalid taxpayer SSN — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, false)
    g.set("/hasValidSSN", false)
    singleMfjFalse(g, "age25to64")
    g.set("/jobsIncomeTotal", Dollar(20_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

  it should "T31: invalid spouse SSN MFJ — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    mfjAges(g, "age25to64", "age25to64")
    g.set("/secondaryFilerHasValidSSN", false)
    addEitcQualifyingChildUnder19(g)
    g.set("/jobsIncomeTotal", Dollar(30_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = true)
  }

  /** CSV 20,000.00 is not below the 0-EITC-QC phase-out line for 2025 (19,104); use 19,103 so income is still allowed
    * when `eitcQualifyingChildren` is 0.
    */
  it should "T32: child invalid SSN, 25–64 — eligible (no-qc count; earned 19,103 not 20,000)" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "age25to64")
    val id = UUID.randomUUID().toString
    g.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    g.set(s"$p/livedWithYouUS", true)
    g.set(s"$p/someoneElseCanClaim", false)
    g.set(s"$p/marriedFilingJointly", false)
    g.set(s"$p/isPermanentlyDisabled", false)
    g.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    g.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    g.set(s"$p/validSSN", false)
    g.set("/jobsIncomeTotal", Dollar(19_103L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    longAt(g, "/eitcQualifyingChildren") shouldBe 0L
    assertEitcCsvEligibleOutcomes(g, mfj = false, Some(0))
  }

  it should "T33: child invalid SSN, 24&under — ineligible" in {
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, true)
    singleMfjFalse(g, "under24")
    val id = UUID.randomUUID().toString
    g.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    g.set(s"$p/livedWithYouUS", true)
    g.set(s"$p/someoneElseCanClaim", false)
    g.set(s"$p/marriedFilingJointly", false)
    g.set(s"$p/isPermanentlyDisabled", false)
    g.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    g.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    g.set(s"$p/validSSN", false)
    g.set("/jobsIncomeTotal", Dollar(15_000L))
    g.set("/taxableInterestIncome", Dollar(0L))
    g.save()
    assertEitcBroadTestIneligibility(g, mfj = false)
  }

}
