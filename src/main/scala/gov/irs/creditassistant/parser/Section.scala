package gov.irs.creditassistant.parser

import gov.irs.creditassistant.CreditAssistantTemplateEngine
import org.thymeleaf.context.Context
import scala.xml.Elem

case class Section(children: Seq[FlowNode]) extends FlowNode {
  override def html(templateEngine: CreditAssistantTemplateEngine): String = {
    val childrenHtml = children.html(templateEngine)

    val context = new Context()
    context.setVariable("childrenHtml", childrenHtml)
    templateEngine.process("nodes/section", context)
  }
}
object Section extends FlowNodeParser {
  override def fromXml(section: Elem, flowParser: FlowParser, level: Int): Section = {
    val children = flowParser.parseChildElements(section, level)

    Section(children)
  }
}
