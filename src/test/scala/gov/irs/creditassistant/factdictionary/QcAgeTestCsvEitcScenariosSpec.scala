package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.{ Dollar, Enum as FgEnum }
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** Age-matrix scenarios for a single EITC qualifying child, aligned with `src/test/resources/csv/qc-age-test.csv` (data
  * rows; header/ColumnN are for tooling). The CSV allows several non-MFJ filing types for the `Single, HOH, MFS, QS`
  * cell; this suite uses **Single** as the representative. Each of the 3×4×3 combinations in the file is covered (TP
  * age band, MFJ row vs one of three spouse ages, and child type).
  */
final class QcAgeTestCsvEitcScenariosSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private enum TpAgeBand:
    case Under24, Age25to64, Age65Plus

  /** Row within each child-type block: first row is non-MFJ; the next three are MFJ with the given spouse age. */
  private enum MfjOrNon:
    case NonMfj, MfjSpouseUnder24, MfjSpouse25to64, MfjSpouse65Plus

  private enum ChildAgeScenario:
    case Under19, FullTimeStudent19to23, PermanentlyDisabled

  private def setPrimaryAgeRange(graph: Graph, tp: TpAgeBand): Unit =
    val e = tp match
      case TpAgeBand.Under24   => "under24"
      case TpAgeBand.Age25to64 => "age25to64"
      case TpAgeBand.Age65Plus => "65andOlder"
    graph.set("/ageRange", FgEnum(e, "/ageRangeOptions"))

  private def setNonMfjSingle(graph: Graph, tp: TpAgeBand): Unit =
    graph.set("/maritalStatus", FgEnum("single", "/maritalStatusOptions"))
    graph.set("/initialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    setPrimaryAgeRange(graph, tp)

  private def setMfj(graph: Graph, tp: TpAgeBand, slot: MfjOrNon /* not NonMfj */ ): Unit =
    assert(slot != MfjOrNon.NonMfj)
    graph.set("/maritalStatus", FgEnum("married", "/maritalStatusOptions"))
    graph.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    setPrimaryAgeRange(graph, tp)
    graph.set("/secondaryFilerHasValidSSN", true)
    graph.set("/spouseAliveEndOfTaxYear", true)
    val sec = slot match
      case MfjOrNon.MfjSpouseUnder24 => "under24"
      case MfjOrNon.MfjSpouse25to64  => "age25to64"
      case MfjOrNon.MfjSpouse65Plus  => "65andOlder"
      case MfjOrNon.NonMfj           => throw IllegalStateException()
    graph.set("/ageRangeSecondary", FgEnum(sec, "/ageRangeOptions"))

  private def addChildForScenario(graph: Graph, c: ChildAgeScenario): String =
    c match
      case ChildAgeScenario.Under19               => addEitcQualifyingChildUnder19(graph)
      case ChildAgeScenario.FullTimeStudent19to23 => addEitcQualifyingChild19To23FullTimeStudent(graph)
      case ChildAgeScenario.PermanentlyDisabled   => addEitcQualifyingPermanentlyDisabledChild(graph)

  private def runScenario(
      tp: TpAgeBand,
      row: MfjOrNon,
      child: ChildAgeScenario,
      label: String,
  ): Unit =
    val g = newFactGraph()
    applyEitcCsvScenarioBaseline(g, claimingQualifyingChildren = true)
    val mfj = row != MfjOrNon.NonMfj
    if mfj then setMfj(g, tp, row)
    else setNonMfjSingle(g, tp)
    val id = addChildForScenario(g, child)
    g.set("/jobsIncomeTotal", Dollar(eitcCsvEarnedIncomeDollarsForPhaseout(1, mfj)))
    g.save()
    withClue(s"$label") {
      booleanAt(g, s"/familyAndHousehold/#$id/isEitcQualifyingChild") shouldBe true
      assertEitcCsvEligibleOutcomes(g, mfj = mfj, expectedEitcQualifyingChildCount = Some(1))
    }

  private def describeRow(row: MfjOrNon): String =
    row match
      case MfjOrNon.NonMfj           => "non-MFJ (Single rep.)"
      case MfjOrNon.MfjSpouseUnder24 => "MFJ, spouse 24 and under"
      case MfjOrNon.MfjSpouse25to64  => "MFJ, spouse 25–64"
      case MfjOrNon.MfjSpouse65Plus  => "MFJ, spouse 65+"

  private def describeTp(tp: TpAgeBand): String = tp match
    case TpAgeBand.Under24   => "TP 24 and under"
    case TpAgeBand.Age25to64 => "TP 25–64"
    case TpAgeBand.Age65Plus => "TP 65+"

  private def describeChild(c: ChildAgeScenario): String = c match
    case ChildAgeScenario.Under19               => "child 18 and under"
    case ChildAgeScenario.FullTimeStudent19to23 => "child 19–23, full-time student"
    case ChildAgeScenario.PermanentlyDisabled   => "child permanently disabled"

  for
    c <- ChildAgeScenario.values
    tp <- TpAgeBand.values
    row <- MfjOrNon.values
  do
    it should s"qc-age-test: ${describeChild(c)}, ${describeTp(tp)}, ${describeRow(row)}" in
      runScenario(tp, row, c, s"child=$c tp=$tp row=$row")

}
