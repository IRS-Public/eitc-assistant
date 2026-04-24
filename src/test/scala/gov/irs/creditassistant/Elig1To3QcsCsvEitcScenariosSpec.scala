package gov.irs.creditassistant

import gov.irs.factgraph.types.Dollar
import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** Positive EITC scenarios with 1, 2, or 3 qualifying children, aligned with `src/test/resources/csv/elig-1-3-qcs.csv`
  * (data rows; header/ColumnN are for tooling). Each row in the CSV (except back-to-back duplicate MFJ lines) is
  * represented once per QC count.
  *
  * Shared setup and assertions come from `CreditAssistantTestHelpers` (same as `EligNoQcsCsvEitcScenariosSpec`).
  */
final class Elig1To3QcsCsvEitcScenariosSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  /** Unique filing profiles from the CSV (MFJ listed once; column “Spouse live…” / “Legally separated” where
    * applicable).
    */
  private enum FilingProfile:
    case Single, HohMarriedLegallySeparated, HohMarriedSpouseNotLived, HohUnmarried, Qss, MfsSpouseNotLived,
      MfsLegallySeparated, Mfj

  private def applyFilingProfile(graph: Graph, p: FilingProfile): Boolean =
    p match
      case FilingProfile.Single =>
        graph.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        false
      case FilingProfile.HohMarriedLegallySeparated =>
        graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
        graph.set("/isHOHMarried", true)
        graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
        graph.set("/writableSeparationAgreement", true)
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        false
      case FilingProfile.HohMarriedSpouseNotLived =>
        graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
        graph.set("/isHOHMarried", true)
        graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        false
      case FilingProfile.HohUnmarried =>
        graph.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
        graph.set("/isHOHMarried", false)
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        false
      case FilingProfile.Qss =>
        graph.set("/maritalStatus", FgEnum("widowed", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("qualifiedSurvivingSpouse", "/filingStatusOptions"))
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        false
      case FilingProfile.MfsSpouseNotLived =>
        graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("marriedFilingSeparately", "/filingStatusOptions"))
        graph.set("/spouseLivedWithTaxpayerLastSixMonths", false)
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        false
      case FilingProfile.MfsLegallySeparated =>
        graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("marriedFilingSeparately", "/filingStatusOptions"))
        graph.set("/spouseLivedWithTaxpayerLastSixMonths", true)
        graph.set("/writableSeparationAgreement", true)
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        false
      case FilingProfile.Mfj =>
        graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
        graph.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
        graph.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
        graph.set("/secondaryFilerHasValidSSN", true)
        graph.set("/spouseAliveEndOfTaxYear", true)
        graph.set("/ageRangeSecondary", FgEnum("age25to64", "/ageRangeOptions"))
        true

  private def runRow(qc: Int, profile: FilingProfile, label: String): Unit =
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, claimingQualifyingChildren = true)
    val mfj = applyFilingProfile(g, profile)
    addEitcQualifyingChildrenUnder19(g, qc)
    g.set("/jobsIncomeTotal", Dollar(eitcCsvEarnedIncomeDollarsForPhaseout(qc, mfj)))
    g.save()
    withClue(s"qcCount=$qc profile=$label") {
      assertEitcCsvEligibleOutcomes(g, mfj = mfj, expectedEitcQualifyingChildCount = Some(qc))
    }

  private val profiles: Seq[(FilingProfile, String)] = Seq(
    (FilingProfile.Single, "Single"),
    (FilingProfile.HohMarriedLegallySeparated, "HOH married, spouse lived, legally separated"),
    (FilingProfile.HohMarriedSpouseNotLived, "HOH married, spouse not lived in home"),
    (FilingProfile.HohUnmarried, "HOH unmarried"),
    (FilingProfile.Qss, "QSS"),
    (FilingProfile.MfsSpouseNotLived, "MFS spouse not lived in home"),
    (FilingProfile.MfsLegallySeparated, "MFS lived together, legally separated"),
    (FilingProfile.Mfj, "MFJ"),
  )

  for qc <- 1 to 3 do
    for (prof, name) <- profiles do
      it should s"elig-1-3-qcs: $qc QC(s), $name" in
        runRow(qc, prof, name)

}
