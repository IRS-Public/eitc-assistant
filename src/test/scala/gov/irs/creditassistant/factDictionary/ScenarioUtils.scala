package gov.irs.creditassistant.factDictionary

import gov.irs.creditassistant.scenarios.Scenario
import java.nio.file.Paths
import scala.xml.XML

def printFactsFromFile(scenario: Scenario, xmlFileName: String): Unit = {
  val basePath = "src/main/resources/credit-assistant/facts"
  val fullPath = Paths.get(basePath, s"${xmlFileName}.xml").toFile

  try {
    if (!fullPath.exists()) {
      println(s"Error: File not found at ${fullPath.getAbsolutePath}")
      return
    }

    val xml = XML.loadFile(fullPath)
    val factPaths = (xml \\ "Fact").flatMap(_ \ "@path").map(_.text)

    factPaths.foreach { path =>
      println(scenario.graph.debugFact(path))
    }
  } catch {
    case e: Exception => println(s"Could not process XML: ${e.getMessage}")
  }
}
