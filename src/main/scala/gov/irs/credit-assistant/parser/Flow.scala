package gov.irs.creditassistant.parser

import gov.irs.creditassistant.exceptions.InvalidFormConfig
import gov.irs.creditassistant.Log
import gov.irs.factgraph.FactDictionary

case class Flow(pages: List[Page])

object Flow {
  def fromXmlConfig(config: xml.Elem, factDictionary: FactDictionary): Flow = {
    if (config.label != "FlowConfig") {
      throw InvalidFormConfig(s"Expected a top-level <FlowConfig>, found ${config.label}")
    }

    val pages = (config \ "page").map(page => Page.parse(page, factDictionary)).toList
    Log.info(s"Generated flow with ${pages.length} pages")

    Flow(pages)
  }
}
