package gov.irs.creditassistant.parser

import gov.irs.creditassistant.parser.{ Condition, ConditionOperator }
import gov.irs.creditassistant.parser.{ FgAlert, FlowNode, FlowNodeParser, FlowParser }
import gov.irs.creditassistant.CreditAssistantTemplateEngine
import org.thymeleaf.context.Context
import scala.xml.Elem

case class FgAlert(
    condition: Option[Condition],
    alertType: String,
    knockout: Boolean,
    translationContext: TranslationContext,
    children: Seq[FlowNode],
) extends FlowNode {
  override def html(templateEngine: CreditAssistantTemplateEngine): String = {
    val context = new Context()
    context.setVariable("condition", condition.map(_.path).orNull)
    context.setVariable("operator", condition.map(_.operator.toString).orNull)
    context.setVariable("alertType", alertType)
    val headingKey = translationContext.fullKey("heading")
    val heading = templateEngine.messageResolver.resolveMessage(headingKey)
    context.setVariable("heading", heading)
    val childrenHtml = children.html(templateEngine)
    context.setVariable("children", childrenHtml)
    context.setVariable("knockout", java.lang.Boolean.valueOf(knockout))

    templateEngine.process("nodes/fg-alert", context)
  }
}

object FgAlert extends FlowNodeParser {
  override def fromXml(
      fgAlertElement: Elem,
      flowParser: FlowParser,
      parentTranslationContext: TranslationContext,
  ): FgAlert = {
    val alertType = fgAlertElement \@ "alert-type"

    val heading = (fgAlertElement \ "heading").head.child.mkString.strip

    val conditionPath = fgAlertElement \@ "condition"
    val conditionOperator = fgAlertElement \@ "operator"
    val condition = Option.when(conditionPath.nonEmpty && conditionOperator.nonEmpty)(
      Condition(conditionPath, ConditionOperator.fromAttribute(conditionOperator)),
    )

    val knockout = (fgAlertElement \@ "knockout") == "true"

    val translationContext = parentTranslationContext.forChildWithoutUniqueId(fgAlertElement.label, heading)
    translationContext.updateValue("heading", heading)
    val children = flowParser.parseChildElements(fgAlertElement, translationContext, List("heading"))

    FgAlert(condition, alertType, knockout, translationContext, children)
  }
}
