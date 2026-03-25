package gov.irs.creditassistant.parser

import gov.irs.creditassistant.CreditAssistantTemplateEngine
import scala.xml.Elem

trait FlowNode {
  def html(templateEngine: CreditAssistantTemplateEngine): String
}

extension (flowNodes: Seq[FlowNode]) {
  def html(templateEngine: CreditAssistantTemplateEngine): String = flowNodes.map(node => node.html(templateEngine)).mkString("")
}

trait FlowNodeParser {
  def fromXml(element: Elem, flowParser: FlowParser, level: Int): FlowNode
}
