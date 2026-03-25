package gov.irs.creditassistant

import gov.irs.factgraph.FactDictionary
import java.io.File
import scala.io.Source
import scala.xml.{ Elem, NodeBuffer }

case class CreditAssistantFactDictionary(factDictionary: FactDictionary, xml: Elem)

def loadFactXml(): Elem = {
  val factDirectoryPath = os.pwd / "src" / "main" / "resources" / "credit-assistant" / "facts"
  val factsDirectory = new File(factDirectoryPath.toString)
  val listOfFiles = if (factsDirectory.exists && factsDirectory.isDirectory) {
    factsDirectory.listFiles.filter(_.isFile).filter(_.getName.endsWith(".xml")).toList
  } else {
    List.empty[File]
  }

  val facts = new NodeBuffer()
  for (file <- listOfFiles) {
    val fileName = file.getName()
    val factsFile = Source.fromResource(s"credit-assistant/facts/$fileName").getLines().mkString("\n")
    val factXmlNodes = xml.XML.loadString(factsFile)
    val factNodes = factXmlNodes \ "Facts" \ "_"
    facts ++= factNodes
  }

  <FactDictionaryModule>
    <Facts>
      {facts}
    </Facts>
  </FactDictionaryModule>
}

def loadCreditAssistantFactDictionary(): CreditAssistantFactDictionary = {
  val factXml = loadFactXml()
  val factDictionary = FactDictionary.fromXml(factXml)
  CreditAssistantFactDictionary(factDictionary, factXml)
}
