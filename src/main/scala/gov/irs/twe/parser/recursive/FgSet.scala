package gov.irs.twe.parser.recursive

import gov.irs.twe.TweTemplateEngine
import scala.xml.Elem

// TODO: FgSet does not contain any updates for recursive parsing, so we can just used the existing code.
//       in an effort to not alter existing code while comparing outputs, I've simply wrapped it with the new traits
case class FgSet(legacyFgSet: gov.irs.twe.parser.FgSet) extends FlowNode {
  def html(templateEngine: TweTemplateEngine): String = {
    // TODO: Port over logic completely/or ensure merged properly when replacing old logic
    //       For now, its fine to just use the existing calls because we don't do any recursive parsing of FgSets
    legacyFgSet.html(templateEngine)
  }
}

object FgSet extends FlowNodeParser {
  override def fromXml(fgSetElement: Elem, flowParser: FlowParser, level: Int): FgSet = {
    // TODO: Port over logic completely/or ensure merged properly when replacing old logic
    //       For now, its fine to just use the existing calls because we don't do any recursive parsing of FgSets
    val legacyFgSet = gov.irs.twe.parser.FgSet.parse(fgSetElement, flowParser.factDictionary)

    FgSet(legacyFgSet)
  }
}
