package gov.irs.creditassistant.generators

import gov.irs.creditassistant.parser.Flow
import gov.irs.creditassistant.parser.Page
import gov.irs.creditassistant.CreditAssistantTemplateEngine
import org.thymeleaf.context.Context
import os.Path
import scala.collection.mutable.LinkedHashMap
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
  // The first route segment maps a page to its source flow module (about-you.xml, etc).
  // Routes like "/about-you/marital-status" → "about-you".
  private def moduleSlug(route: String): String = {
    val parts = route.stripPrefix("/").split("/", 2)
    if (parts.nonEmpty && parts(0).nonEmpty) parts(0) else "other"
  }

  // Counts the number of `condition="..."` attributes Thymeleaf wrote into the rendered HTML.
  // This includes fg-set, fg-alert, fg-collection, fg-detail, and any conditional HTML elements.
  private val conditionAttrRegex = """\bcondition="[^"]+"""".r
  private def countConditions(html: String): Int = conditionAttrRegex.findAllIn(html).size

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

    // Pre-render every page once, alongside its module slug and condition count.
    case class RenderedPage(page: Page, content: String, conditionCount: Int)
    val rendered = flow.pages.map { page =>
      val content = page.html(templateEngine)
      RenderedPage(page, content, countConditions(content))
    }

    // Group by module while preserving the order in which modules first appear in flow.pages
    // (which mirrors the include order in flow/index.xml).
    val grouped = LinkedHashMap.empty[String, List[RenderedPage]]
    rendered.foreach { r =>
      val slug = moduleSlug(r.page.route)
      grouped.update(slug, grouped.getOrElse(slug, List.empty) :+ r)
    }

    val sections = grouped.toList.map { case (slug, rps) =>
      val pages = rps.map { rp =>
        Map(
          "route" -> rp.page.route,
          "title" -> templateEngine.messageResolver.resolveMessage(rp.page.titleKey),
          "content" -> rp.content,
          "conditionCount" -> Integer.valueOf(rp.conditionCount),
        ).asJava
      }
      val sectionTitle = templateEngine.messageResolver.resolveMessage(s"all-screens.section.$slug")
      Map(
        "slug" -> slug,
        "title" -> sectionTitle,
        "pageCount" -> Integer.valueOf(rps.size),
        "conditionCount" -> Integer.valueOf(rps.map(_.conditionCount).sum),
        "pages" -> pages.asJava,
      ).asJava
    }

    context.setVariable("sections", sections.asJava)

    val content = templateEngine.process("all-screens", context)

    WebsitePage("/all-screens", content, languageCode)
  }
}
