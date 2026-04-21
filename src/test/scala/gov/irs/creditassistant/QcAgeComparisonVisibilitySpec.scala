package gov.irs.creditassistant

import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import java.util.UUID
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** TXE-21945: show the QC age-comparison question only when age ordering is ambiguous. */
final class QcAgeComparisonVisibilitySpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private def withChild(graph: Graph, childAgeRange: String): String = {
    val id = UUID.randomUUID().toString
    graph.addToCollection("/qualifyingChildren", id)
    graph.set(s"/qualifyingChildren/#$id/isPermanentlyDisabled", false)
    graph.set(s"/qualifyingChildren/#$id/ageRange", FgEnum(childAgeRange, "/ageRangeOptionsQC"))
    id
  }

  "/qualifyingChildren/*/flowShouldSeeAgeComparison" should "be true for non-MFJ under24 when child is 19-23" in {
    val g = newFactGraph()
    g.set("/knowsFilingStatus", true)
    g.set("/initialFilingStatus", FgEnum("qualifiedSurvivingSpouse", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    val id = withChild(g, "between19And23")
    g.save()
    booleanAt(g, s"/qualifyingChildren/#$id/flowShouldSeeAgeComparison") shouldBe true
  }

  it should "be true for MFJ when both spouses are under24 and child is under19" in {
    val g = newFactGraph()
    g.set("/knowsFilingStatus", true)
    g.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    g.set("/spouseAliveEndOfTaxYear", true)
    g.set("/secondaryFilerHasValidSSN", true)
    g.set("/ageRangeSecondary", FgEnum("under24", "/ageRangeOptions"))
    val id = withChild(g, "under19")
    g.save()
    booleanAt(g, s"/qualifyingChildren/#$id/flowShouldSeeAgeComparison") shouldBe true
  }

  it should "be false for MFJ mixed ages when spouse is 25-64 and child is under19" in {
    val g = newFactGraph()
    g.set("/knowsFilingStatus", true)
    g.set("/initialFilingStatus", FgEnum("marriedFilingJointly", "/filingStatusOptions"))
    g.set("/ageRange", FgEnum("under24", "/ageRangeOptions"))
    g.set("/spouseAliveEndOfTaxYear", true)
    g.set("/secondaryFilerHasValidSSN", true)
    g.set("/ageRangeSecondary", FgEnum("age25to64", "/ageRangeOptions"))
    val id = withChild(g, "under19")
    g.save()
    assertBooleanGateOff(g, s"/qualifyingChildren/#$id/flowShouldSeeAgeComparison")
  }
}
