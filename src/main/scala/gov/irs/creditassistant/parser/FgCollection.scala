package gov.irs.creditassistant.parser

import gov.irs.creditassistant.exceptions.InvalidFormConfig
import gov.irs.creditassistant.parser.Condition
import gov.irs.creditassistant.parser.Utils.{ optionString, validateFact }
import gov.irs.creditassistant.CreditAssistantTemplateEngine
import gov.irs.factgraph.FactDictionary
import org.thymeleaf.context.Context
import scala.xml.Elem

case class FgCollection(
    path: String,
    itemName: String,
    disallowEmpty: String,
    condition: Option[Condition],
    children: Seq[FlowNode],
    determiner: String,
    addItemIfTrue: Option[String],
) extends FlowNode {
  def html(templateEngine: CreditAssistantTemplateEngine): String = {
    val context = new Context()
    context.setVariable("path", path)
    context.setVariable("itemName", itemName)
    context.setVariable("disallowEmpty", disallowEmpty)
    val childrenHtml = children.html(templateEngine)
    context.setVariable("collectionFacts", childrenHtml)
    context.setVariable("condition", condition.map(_.path).orNull)
    context.setVariable("operator", condition.map(_.operator.toString).orNull)
    context.setVariable("determiner", determiner)
    context.setVariable("addItemIfTrue", addItemIfTrue.getOrElse(""))

    templateEngine.process("nodes/fg-collection", context)
  }
}

object FgCollection extends FlowNodeParser {
  override def fromXml(fgCollectionElement: Elem, flowParser: FlowParser, level: Int): FgCollection = {
    val factDictionary = flowParser.factDictionary

    val path = fgCollectionElement \@ "path"
    val itemName = fgCollectionElement \@ "item-name"
    val disallowEmpty = fgCollectionElement \@ "disallow-empty"
    val condition = Condition.getCondition(fgCollectionElement, factDictionary)
    val determiner = fgCollectionElement \@ "determiner"
    val addItemIfTrue = optionString(fgCollectionElement \@ "add-item-if-true")

    if (itemName.isEmpty) {
      throw InvalidFormConfig("item-name is a required property of FgCollection but was blank")
    }

    validateFgCollection(path, factDictionary)

    addItemIfTrue.foreach { factPath =>
      validateFact(factPath, factDictionary)
      if (!factDictionary.getDefinition(factPath).isBoolean) {
        throw InvalidFormConfig(s"add-item-if-true $factPath must be a boolean fact")
      }
    }

    val children = flowParser.parseChildElements(fgCollectionElement, level)

    FgCollection(path, itemName, disallowEmpty, condition, children, determiner, addItemIfTrue)
  }

  private def validateFgCollection(path: String, factDictionary: FactDictionary): Unit = {
    validateFact(path, factDictionary)
    if (factDictionary.getDefinition(path).typeNode != "CollectionNode")
      throw InvalidFormConfig(s"Path $path must be of type CollectionNode")
  }
}
