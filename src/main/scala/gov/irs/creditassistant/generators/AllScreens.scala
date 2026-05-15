package gov.irs.creditassistant.generators

import gov.irs.creditassistant.parser.Flow
import gov.irs.creditassistant.CreditAssistantTemplateEngine
import org.thymeleaf.context.Context
import os.Path
import scala.jdk.CollectionConverters.*

case class AllScreens(pages: List[WebsitePage], factDictionary: xml.Elem) {
  def save(directoryPath: Path): Unit = {
    os.remove.all(directoryPath)

    for (page <- this.pages) {
      val target = directoryPath / page.route
      os.write(target, page.html(), null, createFolders = true)
    }

    val resourcesSource = os.pwd / "src" / "main" / "resources" / "credit-assistant" / "website-static"
    val resourcesTarget = directoryPath / "resources"
    os.copy(resourcesSource, resourcesTarget)
  }
}

object AllScreens {
  def generate(
      flow: Flow,
      languageCode: String,
      supportedLocales: Map[String, String],
  ): WebsitePage = {
    val templateEngine = new CreditAssistantTemplateEngine(languageCode)
    val context = new Context()
    context.setVariable("title", "All Screens")

    context.setVariable("languageCode", languageCode)
    context.setVariable("supportedLocales", supportedLocales.asJava)
    context.setVariable("currentPageRoute", "/all-screens")

    val pages = flow.pages.map(page =>
      Map(
        "route" -> page.route,
        "title" -> templateEngine.messageResolver.resolveMessage(page.titleKey),
        "content" -> page.html(templateEngine),
      ).asJava,
    )
    context.setVariable("pages", pages.asJava)

    val content = templateEngine.process("all-screens", context)

    WebsitePage("/all-screens", content, languageCode)
  }
}
