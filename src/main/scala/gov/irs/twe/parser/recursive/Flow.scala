package gov.irs.twe.parser.recursive

import gov.irs.factgraph.FactDictionary
import scala.xml.Elem

case class Flow(
    pages: List[Page],
)

object Flow {
  def fromXmlConfig(flowConfig: Elem, factDictionary: FactDictionary): Flow = {
    val flowParser = FlowParser(factDictionary)

    // FlowConfig is expected to have only `page` child elements relevant to parsing
    val pages = (flowConfig \ "page").collect { case pageElement: Elem =>
      Page.fromXml(pageElement, flowParser)
    }.toList

    Flow(pages)
  }
}
