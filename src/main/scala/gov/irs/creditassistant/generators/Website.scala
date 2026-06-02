package gov.irs.creditassistant.generators

import gov.irs.creditassistant.build.Flags
import gov.irs.creditassistant.parser.Flow
import gov.irs.creditassistant.CreditAssistantTemplateEngine
import io.circe.Printer
import org.jsoup.parser.Tag
import org.jsoup.Jsoup
import org.thymeleaf.context.Context
import os.Path
import scala.collection.immutable.ListMap
import scala.jdk.CollectionConverters.*

case class WebsitePage(route: String, content: String, languageCode: String) {
  def html(): String = {
    // This step largely serves to make the output easy to read in view-source
    val document = Jsoup.parse(content)

    // Set certain elements to "block" formatting
    // https://github.com/jhy/jsoup/issues/2141#issuecomment-2795853753
    val setElement = document.selectFirst("fg-set")
    if (setElement != null) {
      val tag = setElement.tag()
      tag.set(Tag.Block)
      setElement.children().forEach(child => child.tag().set(Tag.Block))
    }

    // Convert to an HTML string
    var html = document.html()
    // Adding a newline after each <fg-set> block to make them easier to see
    html = html.replace("</fg-set>", "</fg-set>\n")

    html
  }

  def filepath(root: Path): Path = {
    val isTranslated = languageCode != "en"
    val isNamedRoute = route != "/"

    var path = root
    if (isTranslated) path = path / languageCode
    if (isNamedRoute) {
      // In one question per screen mode, routes may have multiple segments (e.g. "/filing-status/knows-filing-status"
      // os.Path rejects "/" inside a chunk, so split it out.
      route.stripPrefix("/").split("/").filter(_.nonEmpty).foreach(seg => path = path / seg)
    }

    path / "index.html"
  }
}

case class Website(
    pages: List[WebsitePage],
    factDictionary: xml.Elem,
    flowManifestJson: Option[String] = None,
) {
  def save(directoryPath: Path): Unit = {
    os.remove.all(directoryPath)

    // Write the pages
    for (page <- this.pages) {
      val target = page.filepath(directoryPath)
      os.write(target, page.html(), null, createFolders = true)
    }

    val resourcesSource = os.pwd / "src" / "main" / "resources" / "credit-assistant" / "website-static"
    val resourcesTarget = directoryPath / "resources"
    os.copy(resourcesSource, resourcesTarget)

    val dictionaryString = factDictionary.toString
    os.write(resourcesTarget / "fact-dictionary.xml", dictionaryString, null)

    flowManifestJson.foreach(json => os.write(resourcesTarget / "flow-manifest.json", json, null))
  }
}

object Website {
  def generate(
      flow: Flow,
      dictionaryXml: xml.Elem,
      flags: Map[String, Boolean],
  ): Website = {
    val supportedLocales = ListMap(
      "en" -> "English",
      "es" -> "Español",
      "ht" -> "Kreyòl ayisyen",
      "ko" -> "한국어",
      "ru" -> "Русский",
      "vi" -> "Tiếng Việt",
      "zh-hans" -> "简体中文",
      "zh-hant" -> "繁體中文",
    )
    val locales = supportedLocales.keys.toList
    var pages = locales.flatMap { languageCode =>
      val templateEngine = new CreditAssistantTemplateEngine(languageCode)
      val navPages = flow.pages.filter(p => !p.exclude)

      val topicReps: List[gov.irs.creditassistant.parser.Page] = {
        val seen = scala.collection.mutable.LinkedHashMap.empty[String, gov.irs.creditassistant.parser.Page]
        navPages.foreach(p => seen.getOrElseUpdate(p.stepperRoute, p))
        seen.values.toList
      }
      val topicIndex: Map[String, Int] = topicReps.zipWithIndex.map { case (p, i) => p.stepperRoute -> i }.toMap

      flow.pages.zipWithIndex.map { (page, index) =>
        val titleValue = templateEngine.messageResolver.resolveMessage(page.titleKey)
        val titlePrefix = templateEngine.messageResolver.resolveMessage("title.prefix")
        val titleSuffix = templateEngine.messageResolver.resolveMessage("title.suffix")

        val title = s"$titlePrefix - $titleValue | $titleSuffix"

        val stepIndex = topicIndex.getOrElse(page.stepperRoute, 0)
        val stepTotal = topicReps.size

        val context = new Context()
        val currentPageRoute = if (!page.route.endsWith("/")) {
          page.route + "/"
        } else {
          page.route
        }
        context.setVariable("exclude", page.exclude)
        context.setVariable("title", title)
        context.setVariable("stepTitle", titleValue)
        context.setVariable("stepIndex", stepIndex)
        context.setVariable("stepTotal", stepTotal)
        context.setVariable("pages", topicReps.asJava) // th:each requires Java Iterables
        context.setVariable("currentPageRoute", currentPageRoute)
        context.setVariable("flags", flags.asJava)
        context.setVariable("languageCode", languageCode)
        context.setVariable("supportedLocales", supportedLocales.asJava)

        // Add a link for the next page if it's not the last one
        if (index < flow.pages.size - 1) {
          val nextPageHref = flow.pages(index + 1).href(languageCode)
          context.setVariable("nextPageHref", nextPageHref)
        }
        // Add a link for the last page if it's not the first one
        if (index > 0) {
          val lastPageHref = flow.pages(index - 1).href(languageCode)
          context.setVariable("lastPageHref", lastPageHref)
        } else {
          context.setVariable("first", true)
        }

        // Turn all the pages into HTML representations and join them together
        val pageHtml = page.html(templateEngine)

        context.setVariable("pageHtml", pageHtml)

        val content = templateEngine.process("page", context)
        WebsitePage(page.route, content, languageCode)
      }
    }

    if (flags.contains(Flags.allScreens)) {
      val allScreensPages = locales.map { languageCode =>
        AllScreens.generate(flow, languageCode, supportedLocales)
      }
      pages = pages ++ allScreensPages
    }

    // In single-question-per-screen mode, emit a manifest that the navigation JS uses to skip
    // pages whose gating condition is false against the live Fact Graph. The manifest is built
    // for "en" only because routes are identical across locales (only the href prefix differs);
    // the JS computes the localized href client-side from window.location.
    val manifestJson = Option.when(flags.contains(Flags.singleQuestionPerScreen)) {
      Printer.spaces2.print(FlowManifest.buildJson(flow, "en"))
    }

    Website(pages, dictionaryXml, manifestJson)
  }
}
