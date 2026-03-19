package gov.irs.twe.parser.recursive

import gov.irs.twe.TweTemplateEngine
import scala.xml.Elem

// TODO: FgWithholdingAdjustments does not contain any updates for recursive parsing, so we can just used the existing code.
//       in an effort to not alter existing code while comparing outputs, I've simply wrapped it with the new traits
case class FgWithholdingAdjustments(legacyFgWithholdingAdjustments: gov.irs.twe.parser.FgWithholdingAdjustments)
    extends FlowNode {
  override def html(templateEngine: TweTemplateEngine): String = {
    // TODO: merge with existing logic
    legacyFgWithholdingAdjustments.html(templateEngine)
  }
}

object FgWithholdingAdjustments extends FlowNodeParser {
  override def fromXml(
      fgWithholdingAdjustmentsElement: Elem,
      flowParser: FlowParser,
      level: Int,
  ): FgWithholdingAdjustments = {
    // TODO: merge with existing logic
    val legacyFgWithholdingAdjustments =
      gov.irs.twe.parser.FgWithholdingAdjustments.parse(fgWithholdingAdjustmentsElement, flowParser.factDictionary)

    FgWithholdingAdjustments(legacyFgWithholdingAdjustments)
  }
}
