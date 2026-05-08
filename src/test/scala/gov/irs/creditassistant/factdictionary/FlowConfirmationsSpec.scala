package gov.irs.creditassistant.factdictionary

import gov.irs.factgraph.types.Enum as FgEnum
import gov.irs.factgraph.Graph
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

/** TXE-21928: browser-only flow flags in flowConfirmations.xml — writable + persist/clear like other /flow* facts. */
final class FlowConfirmationsSpec extends AnyFlatSpec with Matchers with CreditAssistantTestHelpers {

  "/flowShowTaxYearChangeConfirm and /flowPendingChosenTaxYear" should "round-trip set + save (mirrors JS pending state)" in {
    val g = newFactGraph()
    g.set("/flowShowTaxYearChangeConfirm", true)
    g.set("/flowPendingChosenTaxYear", FgEnum("2024", "/taxYearOptions"))
    g.save()
    booleanAt(g, "/flowShowTaxYearChangeConfirm") shouldBe true
    g.get("/flowPendingChosenTaxYear").complete shouldBe true
  }

  they should "clear when deleted (mirrors Cancel / close handlers)" in {
    val g = newFactGraph()
    g.set("/flowShowTaxYearChangeConfirm", true)
    g.set("/flowPendingChosenTaxYear", FgEnum("2024", "/taxYearOptions"))
    g.save()
    g.delete("/flowShowTaxYearChangeConfirm")
    g.delete("/flowPendingChosenTaxYear")
    g.save()
    assertBooleanGateOff(g, "/flowShowTaxYearChangeConfirm")
    g.get("/flowPendingChosenTaxYear").complete shouldBe false
  }

  "/flowShowMfjToNonmfjQcClearConfirm and /flowPendingInitialFilingStatus" should "round-trip set + save" in {
    val g = newFactGraph()
    g.set("/flowShowMfjToNonmfjQcClearConfirm", true)
    g.set("/flowPendingInitialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    g.save()
    booleanAt(g, "/flowShowMfjToNonmfjQcClearConfirm") shouldBe true
    g.get("/flowPendingInitialFilingStatus").complete shouldBe true
  }

  they should "clear when deleted" in {
    val g = newFactGraph()
    g.set("/flowShowMfjToNonmfjQcClearConfirm", true)
    g.set("/flowPendingInitialFilingStatus", FgEnum("single", "/filingStatusOptions"))
    g.save()
    g.delete("/flowShowMfjToNonmfjQcClearConfirm")
    g.delete("/flowPendingInitialFilingStatus")
    g.save()
    assertBooleanGateOff(g, "/flowShowMfjToNonmfjQcClearConfirm")
    g.get("/flowPendingInitialFilingStatus").complete shouldBe false
  }
}
