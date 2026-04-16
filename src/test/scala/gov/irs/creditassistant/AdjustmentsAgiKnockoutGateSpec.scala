package gov.irs.creditassistant

import gov.irs.factgraph.types.Dollar
import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** `/flowShouldShowEitcAgiKnockoutOnAdjustmentsPage` gates the Adjustments AGI knockout until the user clicks Next
  * once.
  */
final class AdjustmentsAgiKnockoutGateSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  private val gatePath = "/flowShouldShowEitcAgiKnockoutOnAdjustmentsPage"

  private def graphOverEitcTentativeAgiLimitFor2025Qss(graph: Graph): Unit = {
    graph.set("/chosenTaxYear", FgEnum("2025", "/taxYearOptions"))
    graph.set("/knowsFilingStatus", true)
    graph.set("/initialFilingStatus", FgEnum("qualifiedSurvivingSpouse", "/filingStatusOptions"))
    graph.set("/jobsIncomeTotal", Dollar(110_000))
  }

  it should "not be complete true when AGI is over the tentative limit but Next has not been clicked on Adjustments" in {
    val g = newFactGraph()
    graphOverEitcTentativeAgiLimitFor2025Qss(g)
    g.save()
    booleanAt(g, "/belowHighestEitcAgiLimit") shouldBe false
    assertBooleanGateOff(g, gatePath)
  }

  it should "be true when AGI is over the tentative limit and the flow has recorded Next on Adjustments" in {
    val g = newFactGraph()
    graphOverEitcTentativeAgiLimitFor2025Qss(g)
    g.set("/flowClickedNextOnAdjustmentsPage", true)
    g.save()
    booleanAt(g, gatePath) shouldBe true
  }
}
