package gov.irs.creditassistant.factDictionary

import gov.irs.creditassistant.loadFactXml
import gov.irs.factgraph.{ FactDictionary, FactDictionaryForTests, Graph, Path }
import gov.irs.factgraph.types.WritableType

def setupFactDictionary(): FactDictionary =
  val factXml = loadFactXml()
  FactDictionaryForTests.fromXml(factXml)

def makeGraphWith(factDictionary: FactDictionary, facts: (Path, WritableType)*): Graph = {
  val graph = Graph(factDictionary)
  facts.foreach { case (path, value) =>
    graph.set(path, value)
  }
  graph
}
