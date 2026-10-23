package gov.irs.creditassistant.parser

import gov.irs.creditassistant.exceptions.InvalidFormConfig
import gov.irs.creditassistant.parser.Condition
import gov.irs.creditassistant.parser.Utils.optionString
import gov.irs.creditassistant.parser.Utils.validateFact
import gov.irs.creditassistant.CreditAssistantTemplateEngine
import gov.irs.factgraph.FactDictionary
import org.thymeleaf.context.Context
import scala.xml.Elem

case class ItemTitle(question: String, hint: Option[String])

object ItemTitle {
  def fromXml(
      fgCollectionElement: Elem,
      path: String,
      collectionTranslationContext: TranslationContext,
  ): Option[ItemTitle] = {
    val itemTitleNode = fgCollectionElement \ "item-title"
    if (itemTitleNode.isEmpty) return None

    val questionNode = itemTitleNode.head \ "question"
    if (questionNode.isEmpty) {
      throw InvalidFormConfig(s"item-title for collection $path is missing a question")
    }
    val question = questionNode.head.child.mkString.strip
    if (question.isEmpty) {
      throw InvalidFormConfig(s"item-title for collection $path has an empty question")
    }

    val hintNode = itemTitleNode.head \ "hint"
    val hint = Option.when(hintNode.nonEmpty)(hintNode.head.child.mkString.strip)

    val translationContext = collectionTranslationContext.forChildWithId("itemTitle")
    translationContext.updateValue("question", question)
    hint.foreach(translationContext.updateValue("hint", _))

    Some(ItemTitle(question, hint))
  }
}

case class FgCollection(
    path: String,
    itemName: String,
    disallowEmpty: String,
    condition: Option[Condition],
    translationContext: TranslationContext,
    children: Seq[FlowNode],
    determiner: String,
    addItemIfTrue: Option[String],
    itemTitle: Option[ItemTitle],
) extends FlowNode {
  def html(templateEngine: CreditAssistantTemplateEngine): String = {
    val context = new Context()
    context.setVariable("path", path)
    val translationKeyBase = translationContext.fullKey()
    context.setVariable("disallowEmpty", disallowEmpty)
    val childrenHtml = children.html(templateEngine)
    context.setVariable("collectionFacts", childrenHtml)
    context.setVariable("condition", condition.map(_.path).orNull)
    context.setVariable("operator", condition.map(_.operator.toString).orNull)
    context.setVariable("addItemIfTrue", addItemIfTrue.getOrElse(""))
    context.setVariable("contentKey", translationKeyBase)
    context.setVariable("hasItemTitle", itemTitle.isDefined)
    context.setVariable("hasItemTitleHint", itemTitle.exists(_.hint.isDefined))
    context.setVariable("itemName", itemName)
    context.setVariable("determiner", determiner)

    templateEngine.process("nodes/fg-collection", context)
  }
}

object FgCollection extends FlowNodeParser {
  override def fromXml(
      fgCollectionElement: Elem,
      flowParser: FlowParser,
      parentTranslationContext: TranslationContext,
  ): FgCollection = {
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

    val translationContext = parentTranslationContext.forChildWithId("collection" + path)

    val itemTitle = ItemTitle.fromXml(fgCollectionElement, path, translationContext)

    val children = flowParser.parseChildElements(fgCollectionElement, translationContext, Seq("item-title"))

    FgCollection(
      path,
      itemName,
      disallowEmpty,
      condition,
      translationContext,
      children,
      determiner,
      addItemIfTrue,
      itemTitle,
    )
  }

  private def validateFgCollection(path: String, factDictionary: FactDictionary): Unit = {
    validateFact(path, factDictionary)
    if (factDictionary.getDefinition(path).typeNode != "CollectionNode")
      throw InvalidFormConfig(s"Path $path must be of type CollectionNode")
  }
}
