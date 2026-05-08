package gov.irs.creditassistant.factdictionary

import gov.irs.creditassistant.loadCreditAssistantFactDictionary
import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import java.util.UUID
import org.scalatest.matchers.should.Matchers

/** Shared Credit Assistant fact-graph setup for ScalaTest suites. */
trait CreditAssistantTestHelpers extends Matchers:

  def newFactGraph(): Graph =
    val creditAssistantFactDictionary = loadCreditAssistantFactDictionary()
    val factGraph = Graph(creditAssistantFactDictionary.factDictionary)
    factGraph

  /** Complete boolean facts only; fails the test if the path is still incomplete. */
  def booleanAt(graph: Graph, path: String): Boolean =
    booleanOptionAt(graph, path) match
      case Some(b) => b
      case None    =>
        throw new AssertionError(
          s"Incomplete boolean fact at $path (graph not ready for .get); use booleanOptionAt or assertBooleanGateOff",
        )

  /** Boolean value when the fact graph has finished deriving this path; otherwise `None`. */
  def booleanOptionAt(graph: Graph, path: String): Option[Boolean] =
    graph.get(path).value.map(_.asInstanceOf[Boolean])

  /** Complete numeric fact interpreted as whole-dollar long. */
  def longAt(graph: Graph, path: String): Long =
    graph.get(path).value match
      case Some(v) => BigDecimal(v.toString).toLong
      case None    => throw new AssertionError(s"Incomplete numeric fact at $path")

  /** For flow gates: not shown / not active means either incomplete or explicitly false, never complete true. */
  def assertBooleanGateOff(graph: Graph, path: String): Unit =
    if booleanOptionAt(graph, path).contains(true) then
      throw AssertionError(
        s"""expected "$path" not to be complete true (got ${booleanOptionAt(graph, path)})""",
      )

  /** Shared "about you" and withholding fields for CSV-driven EITC scenario tests (see `src/test/resources/csv/`. */
  def applyEitcCsvScenarioBaseline(graph: Graph, claimingQualifyingChildren: Boolean): Unit =
    graph.set("/chosenTaxYear", FgEnum("2025", "/taxYearOptions"))
    graph.set("/knowsFilingStatus", true)
    graph.set("/primaryFilerIsClaimingQualifyingChildren", claimingQualifyingChildren)
    graph.set("/hasForm2555ForeignEarnedIncome", false)
    graph.set("/hasForeignEarnedIncome", false)
    graph.set("/eitcQcOfAnother", false)
    graph.set("/isClaimedAsDependent", false)
    graph.set("/primaryFilerIsClaimedOnAnotherReturn", false)
    graph.set("/isUSCitizenOrResidentAlien", true)
    graph.set("/hasValidSSN", true)

  /** One EITC qualifying child (under 19, valid SSN, child relationship, US, not joint, no one else can claim). */
  def addEitcQualifyingChildUnder19(graph: Graph): String =
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    graph.set(s"$p/livedWithYouUS", true)
    graph.set(s"$p/someoneElseCanClaim", false)
    graph.set(s"$p/marriedFilingJointly", false)
    graph.set(s"$p/isPermanentlyDisabled", false)
    graph.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    graph.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    graph.set(s"$p/validSSN", true)
    id

  def addEitcQualifyingChildrenUnder19(graph: Graph, count: Int): Unit =
    (1 to count).foreach(_ => addEitcQualifyingChildUnder19(graph))

  /** EITC QC age 19–23 and a full-time student (qualifies via `meetsAgeTestStudent`). */
  def addEitcQualifyingChild19To23FullTimeStudent(graph: Graph): String =
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    graph.set(s"$p/livedWithYouUS", true)
    graph.set(s"$p/someoneElseCanClaim", false)
    graph.set(s"$p/marriedFilingJointly", false)
    graph.set(s"$p/isPermanentlyDisabled", false)
    graph.set(s"$p/ageRange", FgEnum("between19And23", "/ageRangeOptionsQC"))
    graph.set(s"$p/isFullTimeStudent", true)
    graph.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    graph.set(s"$p/validSSN", true)
    id

  /** `qc-rel-res-joint-return.csv` row: lived with TP, someone else can claim, TP still claims, child MFJ, refund-only
    * MFJ.
    */
  def addEitcQualifyingChildSomeoneElseClaimStillClaimsMfjRefundOnly(graph: Graph): String =
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    graph.set(s"$p/livedWithYouUS", true)
    graph.set(s"$p/someoneElseCanClaim", true)
    graph.set(s"$p/isClaimingQCRegardless", true)
    graph.set(s"$p/marriedFilingJointly", true)
    graph.set(s"$p/mfjForRefundOnly", true)
    graph.set(s"$p/isPermanentlyDisabled", false)
    graph.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    graph.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    graph.set(s"$p/validSSN", true)
    id

  /** CSV: someone else cannot claim; child MFJ, filing refund-only. */
  def addEitcQualifyingChildMfjFilingRefundOnly(graph: Graph): String =
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    graph.set(s"$p/livedWithYouUS", true)
    graph.set(s"$p/someoneElseCanClaim", false)
    graph.set(s"$p/marriedFilingJointly", true)
    graph.set(s"$p/mfjForRefundOnly", true)
    graph.set(s"$p/isPermanentlyDisabled", false)
    graph.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    graph.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    graph.set(s"$p/validSSN", true)
    id

  /** CSV: not married filing jointly (no `mfjForRefundOnly`); lived with, rel, age, SSN. */
  def addEitcQualifyingChildNotMarriedFilingJointly(graph: Graph): String =
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    graph.set(s"$p/livedWithYouUS", true)
    graph.set(s"$p/someoneElseCanClaim", false)
    graph.set(s"$p/marriedFilingJointly", false)
    graph.set(s"$p/isPermanentlyDisabled", false)
    graph.set(s"$p/ageRange", FgEnum("under19", "/ageRangeOptionsQC"))
    graph.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    graph.set(s"$p/validSSN", true)
    id

  /** EITC QC who is permanently disabled (qualifies via `meetsAgeTestDisability` without the under-19 band). */
  def addEitcQualifyingPermanentlyDisabledChild(graph: Graph): String =
    val id = UUID.randomUUID().toString
    graph.addToCollection("/familyAndHousehold", id)
    val p = s"/familyAndHousehold/#$id"
    graph.set(s"$p/livedWithYouUS", true)
    graph.set(s"$p/someoneElseCanClaim", false)
    graph.set(s"$p/marriedFilingJointly", false)
    graph.set(s"$p/isPermanentlyDisabled", true)
    graph.set(s"$p/ageRange", FgEnum("over24", "/ageRangeOptionsQC"))
    graph.set(s"$p/relationship", FgEnum("childStepFoster", "/relationshipOptions"))
    graph.set(s"$p/validSSN", true)
    id

  /** Income safely below 2025 completed phase-out in the CSVs for 1/2/3 QCs and MFJ vs non-MFJ. */
  def eitcCsvEarnedIncomeDollarsForPhaseout(qcCount: Int, mfj: Boolean): Long =
    (qcCount, mfj) match
      case (1, false) => 48_000L
      case (1, true)  => 55_000L
      case (2, false) => 55_000L
      case (2, true)  => 62_000L
      case (3, false) => 60_000L
      case (3, true)  => 66_000L
      case _          => throw IllegalArgumentException(s"unsupported qcCount=$qcCount mfj=$mfj")

  /** Results-page eligibility: not income/AGI disqualified, no no-QC age KO, and no blocking `knockout` flow facts. */
  def assertEitcCsvEligibleOutcomes(
      graph: Graph,
      mfj: Boolean,
      expectedEitcQualifyingChildCount: Option[Int] = None,
  ): Unit =
    booleanAt(graph, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits") shouldBe false
    booleanAt(graph, "/isDisqualifiedForEitcAgeWithoutQualifyingChildren") shouldBe false
    for n <- expectedEitcQualifyingChildCount do longAt(graph, "/eitcQualifyingChildren") shouldBe n
    assertNoBlockingEitcFlowKnockouts(graph, mfj = mfj)

  /** Ineligible in `broad-tests.csv` sense: a blocking condition or flow-income KO, or (last resort) not
    * `maybeEligibleForEitc`.
    */
  def assertEitcBroadTestIneligibility(graph: Graph, mfj: Boolean): Unit =
    val eitcDisq = booleanOptionAt(graph, "/eitcDisqualifiedDueToAgiOrEarnedIncomeLimits").contains(true)
    val investmentKo = booleanOptionAt(graph, "/belowEitcInvestmentIncomeLimit") == Some(false)
    val ssnTp = booleanOptionAt(graph, "/hasValidSSN") == Some(false)
    val ssnSpouse = mfj && booleanOptionAt(graph, "/secondaryFilerHasValidSSN") == Some(false)
    val marriage = booleanOptionAt(graph, "/isDisqualifiedMarriedNotFilingJointly") == Some(true)
    val ageNoQc = booleanOptionAt(graph, "/isDisqualifiedForEitcAgeWithoutQualifyingChildren") == Some(true)
    val hasEarnedFalse = booleanOptionAt(graph, "/hasEarnedIncome") == Some(false)
    val noEarnedKo =
      booleanOptionAt(graph, "/flowShouldShowNonPositiveEarnedIncomeKnockoutAfterContinue").contains(true)
    val agiGate =
      booleanOptionAt(graph, "/flowShouldShowEitcAgiKnockoutOnAdjustmentsPage").contains(true)
    val incLimitQc = booleanOptionAt(graph, "/flowShouldShowEitcIncomeLimitKnockoutAfterContinue").contains(true)
    val qcAddKo = booleanOptionAt(graph, "/flowShouldShowQcRequiredAddChildKnockoutAfterContinue").contains(true)
    val koWithQC = booleanOptionAt(graph, "/isDisqualifiedForEitcAgeWithQualifyingChildren").contains(true)
    atLeastOneInelig(
      eitcDisq,
      investmentKo,
      ssnTp,
      ssnSpouse,
      marriage,
      ageNoQc,
      hasEarnedFalse,
      noEarnedKo,
      agiGate,
      incLimitQc,
      qcAddKo,
      koWithQC,
    )

  private def atLeastOneInelig(f: Boolean*): Unit =
    if f.forall(!_) then
      throw AssertionError(
        "expected a broad-test ineligibility signal (EITC disq, investment KO, SSN, marriage, age, no earned income, flow KO, or not maybeEligibleForEitc)",
      )

  /** EITC `fg-alert` with `knockout="true"` on the path to results: gates off, safe about-you and filing values. */
  def assertNoBlockingEitcFlowKnockouts(graph: Graph, mfj: Boolean): Unit =
    booleanAt(graph, "/isUSCitizenOrResidentAlien") shouldBe true
    booleanAt(graph, "/hasValidSSN") shouldBe true
    booleanAt(graph, "/hasForeignEarnedIncome") shouldBe false
    booleanAt(graph, "/isClaimedAsDependent") shouldBe false
    assert(!booleanOptionAt(graph, "/isDisqualifiedMarriedNotFilingJointly").contains(true))
    booleanAt(graph, "/hasLivedInUSMore6Months") shouldBe true
    if mfj then booleanAt(graph, "/secondaryFilerHasValidSSN") shouldBe true
    else assert(!booleanOptionAt(graph, "/secondaryFilerHasValidSSN").contains(false))
    assert(!booleanOptionAt(graph, "/deceasedSpouseValidSSNOnDateOfDeath").contains(false))
    booleanAt(graph, "/belowEitcInvestmentIncomeLimit") shouldBe true
    assertBooleanGateOff(graph, "/flowShouldShowNonPositiveEarnedIncomeKnockoutAfterContinue")
    assertBooleanGateOff(graph, "/flowShouldShowEitcAgiKnockoutOnAdjustmentsPage")
    assertBooleanGateOff(graph, "/flowShouldShowEitcIncomeLimitKnockoutAfterContinue")
    assertBooleanGateOff(graph, "/flowShouldShowQcRequiredAddChildKnockoutAfterContinue")
