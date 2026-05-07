package gov.irs.creditassistant.parser

import gov.irs.creditassistant.exceptions.InvalidFormConfig
import gov.irs.factgraph.FactDictionary
import scala.xml.Elem

enum FlowNodeType {
  case FG_ALERT
  case FG_APPLY
  case FG_COLLECTION
  case FG_DETAIL
  case FG_SET
  case HTML
  case MODAL
  case PAGE
  case SECTION
}
object FlowNodeType:
  def fromLabel(label: String): FlowNodeType = label match
    // Named elements with custom parsing logic
    case "fg-alert"      => FlowNodeType.FG_ALERT
    case "fg-apply"      => FlowNodeType.FG_APPLY
    case "fg-collection" => FlowNodeType.FG_COLLECTION
    case "fg-detail"     => FlowNodeType.FG_DETAIL
    case "fg-set"        => FlowNodeType.FG_SET
    case "modal-dialog"  => FlowNodeType.MODAL
    case "page"          => FlowNodeType.PAGE
    case "section"       => FlowNodeType.SECTION
    // Treat all other elements as HTML
    case _ => FlowNodeType.HTML

case class FlowParser(
    factDictionary: FactDictionary,
) {
  def parseChildElements(
      parent: Elem,
      parentTranslationContext: TranslationContext,
      excludedLabels: Seq[String] = Seq.empty[String],
  ): Seq[FlowNode] = {
    val childElements = (parent \ "_").filter(c => !excludedLabels.contains(c.label))

    if (childElements.isEmpty) {
      throw InvalidFormConfig(s"Encountered an empty element for which there is no parser configured: $parent")
    }
    childElements.collect { case element: Elem =>
      parseElement(element, parentTranslationContext)
    }
  }

  private def parseElement(
      element: Elem,
      parentTranslationContext: TranslationContext,
  ): FlowNode =
    FlowNodeType.fromLabel(element.label) match {
      case FlowNodeType.FG_ALERT      => FgAlert.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.FG_APPLY      => FgApply.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.FG_COLLECTION => FgCollection.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.FG_DETAIL     => FgDetail.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.FG_SET        => FgSet.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.HTML          => Html.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.MODAL         => Modal.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.SECTION       => Section.fromXml(element, this, parentTranslationContext)
      case FlowNodeType.PAGE          =>
        throw InvalidFormConfig(
          s"Encountered 'page' element outside of flow config root. Pages are only supported as top-level flow config elements.",
        )
    }
}
