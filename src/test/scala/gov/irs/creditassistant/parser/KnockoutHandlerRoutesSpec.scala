package gov.irs.creditassistant.parser

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import scala.io.Source

final class KnockoutHandlerRoutesSpec extends AnyFlatSpec with Matchers {

  private val ResourceRoot = "credit-assistant"

  private def flowRoutes: Set[String] = {
    val index = scala.xml.XML.loadString(Source.fromResource(s"$ResourceRoot/flow/index.xml").mkString)
    (index \ "module")
      .map(_ \@ "src")
      .flatMap { src =>
        val module =
          scala.xml.XML.loadString(Source.fromResource(s"$ResourceRoot/flow/${src.stripPrefix("./")}").mkString)
        (module \ "page").map(_ \@ "route")
      }
      .toSet
  }

  "fg-knockout-handlers.js" should "only reveal knockouts on routes that exist in the flow" in {
    val js = Source.fromResource(s"$ResourceRoot/website-static/js/fg-knockout-handlers.js").mkString
    val handlerRoutes = """path\.includes\('/eitc(/[^']*)'\)""".r.findAllMatchIn(js).map(_.group(1)).toSeq

    handlerRoutes should not be empty
    handlerRoutes.foreach { route =>
      withClue(s"route=$route flowRoutes=$flowRoutes") {
        flowRoutes should contain(route)
      }
    }
  }
}
