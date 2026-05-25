package gov.irs.creditassistant.parser

import gov.irs.creditassistant.exceptions.InvalidFormConfig
import gov.irs.creditassistant.parser.Utils.optionString
import gov.irs.creditassistant.CreditAssistantTemplateEngine
import scala.util.matching.Regex
import scala.xml.Elem

case class Page(
    translationContext: TranslationContext,
    route: String,
    exclude: Boolean,
    children: Seq[FlowNode],
    sourcePageRoute: Option[String] = None,
    groupBy: Option[String] = None,
) extends FlowNode {
  val titleKey: String = translationContext.fullKey("title")

  /** Route used for stepper grouping: the source page when this Page was produced by PageSplitter, otherwise the route
    * itself.
    */
  def stepperRoute: String = sourcePageRoute.getOrElse(route)

  /** Page-level gating condition for nav-skip in single-question-per-screen mode.
    *
    * Only single-question pages have a meaningful page-level gate. Multi-question pages (e.g., AGI sub-sections grouped
    * by h3) deliberately return None: each question's own condition still drives in-page show/hide via
    * fg-components.js, but the page as a whole is always reachable so the user lands on at least one visible question.
    */
  def gatingCondition: Option[Condition] =
    if (countQuestions(children) != 1) None
    else {
      def find(nodes: Seq[FlowNode]): Iterator[Condition] = nodes.iterator.flatMap {
        case s: Section       => find(s.children)
        case d: FgDetail      => find(d.children)
        case fg: FgSet        => fg.condition.iterator
        case fg: FgCollection => fg.condition.iterator
        case _                => Iterator.empty
      }
      find(children).nextOption()
    }

  private def countQuestions(nodes: Seq[FlowNode]): Int = nodes.iterator.map {
    case _: FgSet        => 1
    case _: FgCollection => 1
    case s: Section      => countQuestions(s.children)
    case d: FgDetail     => countQuestions(d.children)
    case a: FgAlert      => countQuestions(a.children)
    case _               => 0
  }.sum

  /** Condition paths of all FgAlert(knockout=true) reachable from children, in DOM order. */
  def knockoutConditionPaths: Seq[String] = {
    def find(nodes: Seq[FlowNode]): Iterator[String] = nodes.iterator.flatMap {
      case s: Section               => find(s.children)
      case d: FgDetail              => find(d.children)
      case a: FgAlert if a.knockout => a.condition.map(_.path).iterator
      case _                        => Iterator.empty
    }
    find(children).toSeq
  }

  def href(languageCode: String): String = {
    val languagePortion = if (languageCode == "en") "" else s"/$languageCode"
    val routePortion = if (route == "/") "/" else s"$route/"
    s"/app/eitc$languagePortion$routePortion"
  }

  override def html(templateEngine: CreditAssistantTemplateEngine): String = {
    val pageContent = children.html(templateEngine)
    // Coerce all fg-show nodes into open, empty tags because HTML doesn't allow custom, self-closing tags
    val regex = new Regex("""<fg-show ([^>]*)>""", "attributes")
    val pageHtml = regex.replaceAllIn(
      pageContent,
      m => s"<fg-show \\${m group "attributes"}></fg-show>",
    )

    pageHtml
  }
}

object Page extends FlowNodeParser {
  override def fromXml(page: Elem, flowParser: FlowParser, parentTranslationContext: TranslationContext): Page = {
    val route =
      optionString(page \@ "route").getOrElse(throw InvalidFormConfig("<page> is missing a route attribute"))
    val title =
      optionString(page \@ "title").getOrElse(throw InvalidFormConfig("<page> is missing a title attribute"))
    val exclude = (page \@ "exclude-from-stepper").toBooleanOption.getOrElse(false)
    val groupBy = optionString(page \@ "group-by")

    val translationContext = parentTranslationContext.forChildWithId(route)
    translationContext.updateValue("title", title)

    val children = flowParser.parseChildElements(page, translationContext)
    Page(translationContext, route, exclude, children, groupBy = groupBy)
  }
}
