package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.{ Dollar, Enum as FgEnum }
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** Positive EITC scenarios with zero qualifying children, aligned with `src/test/resources/csv/elig-no-qcs.csv` (data
  * rows only; header/ColumnN rows in the file are for tooling).
  *
  * Assertions use the same facts the flow relies on: income phase-out (`/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits`,
  * as in `flow/results.xml`) and age for no-QC (`/isDisqualifiedForEitcAgeWithoutQualifyingChildren`, as in
  * `flow/filing-status.xml`), which are driven by `/ageRange` and `/ageRangeSecondary`, not `/maybeEligibleForEitc*`,
  * which still ties no-QC filer age to `dateOfBirth` in the fact dictionary.
  *
  * We also assert that no EITC flow knockouts (see `flow` XML, `knockout="true"` on `fg-alert`) are in a blocking
  * state: flow gates are not "on" (see `assertBooleanGateOff`), and one-sided disqualifier facts are the safe value so
  * the user can reach the results page. Check implementations are shared in `CreditAssistantTestHelpers`
  * (`assertEitcCsvEligibleOutcomes`, `assertNoBlockingEitcFlowKnockouts`).
  */
final class EligNoQcsCsvEitcScenariosSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  /** Income safely below 0-QC self and MFJ phase-out lines for 2025 in this graph. */
  private val earnedSelf: Long = 18_000L
  private val earnedMfj: Long = 25_000L

  private def applyCommonWithholding(graph: Graph): Unit =
    applyEitcCsvScenarioBaseline(graph, claimingQualifyingChildren = false)

  it should "row 1 (Single, 25–64, 0 QCs): eligible per CSV" in {
    val g = newFactGraph()
    applyCommonWithholding(g)
    g.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    g.set("/jobsIncomeTotal", Dollar(earnedSelf))
    g.save()
    assertUxAlignedEligibleNoQc(g, mfj = false)
  }

  it should "row 2 (HOH, unmarried, 25–64, 0 QCs): eligible per CSV" in {
    val g = newFactGraph()
    applyCommonWithholding(g)
    g.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("headOfHousehold", "/filingStatusOptions"))
    g.set("/isHOHMarried", false)
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    g.set("/jobsIncomeTotal", Dollar(earnedSelf))
    g.save()
    assertUxAlignedEligibleNoQc(g, mfj = false)
  }

  it should "row 3 (QSS, 25–64, 0 QCs): eligible per CSV" in {
    val g = newFactGraph()
    applyCommonWithholding(g)
    g.set("/maritalStatus", FgEnum("widowed", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("qualifiedSurvivingSpouse", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    g.set("/jobsIncomeTotal", Dollar(earnedSelf))
    g.save()
    assertUxAlignedEligibleNoQc(g, mfj = false)
  }

  it should "row 4 (MFJ, primary 25–64, spouse any age, 0 QCs): eligible per CSV" in {
    val g = newFactGraph()
    applyCommonWithholding(g)
    g.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("age25to64", "/ageRangeOptions"))
    g.set("/secondaryFilerHasValidSSN", true)
    g.set("/jobsIncomeTotal", Dollar(earnedMfj))
    g.save()
    assertUxAlignedEligibleNoQc(g, mfj = true)
  }

  it should "row 5 (MFJ, primary 65+, spouse 25–64, 0 QCs): eligible per CSV" in {
    val g = newFactGraph()
    applyCommonWithholding(g)
    g.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    g.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("65andOlder", "/ageRangeOptions"))
    g.set("/secondaryFilerHasValidSSN", true)
    g.set("/spouseAliveEndOfTaxYear", true)
    g.set("/ageRangeSecondary", FgEnum("age25to64", "/ageRangeOptions"))
    g.set("/jobsIncomeTotal", Dollar(earnedMfj))
    g.save()
    assertUxAlignedEligibleNoQc(g, mfj = true)
  }

  private def assertUxAlignedEligibleNoQc(graph: Graph, mfj: Boolean): Unit =
    assertEitcCsvEligibleOutcomes(graph, mfj = mfj, expectedEitcQualifyingChildCount = None)

}
