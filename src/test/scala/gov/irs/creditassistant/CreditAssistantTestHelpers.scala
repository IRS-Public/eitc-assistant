package gov.irs.creditassistant

import gov.irs.factgraph.Graph

/** Shared Credit Assistant fact-graph setup for ScalaTest suites. */
trait CreditAssistantTestHelpers:

  def newFactGraph(): Graph =
    val creditAssistantFactDictionary = loadCreditAssistantFactDictionary()
    val factGraph = Graph(creditAssistantFactDictionary.factDictionary)
    factGraph

  /** Complete boolean facts only; fails the test if the path is still incomplete. */
  def booleanAt(graph: Graph, path: String): Boolean =
    booleanOptionAt(graph, path) match
      case Some(b) => b
      case None    =>
        throw new AssertionError(
          s"Incomplete boolean fact at $path (graph not ready for .get); use booleanOptionAt or assertBooleanGateOff",
        )

  /** Boolean value when the fact graph has finished deriving this path; otherwise `None`. */
  def booleanOptionAt(graph: Graph, path: String): Option[Boolean] =
    graph.get(path).value.map(_.asInstanceOf[Boolean])

  /** Complete numeric fact interpreted as whole-dollar long. */
  def longAt(graph: Graph, path: String): Long =
    graph.get(path).value match
      case Some(v) => BigDecimal(v.toString).toLong
      case None    => throw new AssertionError(s"Incomplete numeric fact at $path")

  /** For flow gates: not shown / not active means either incomplete or explicitly false, never complete true. */
  def assertBooleanGateOff(graph: Graph, path: String): Unit =
    if booleanOptionAt(graph, path).contains(true) then
      throw AssertionError(
        s"""expected "$path" not to be complete true (got ${booleanOptionAt(graph, path)})""",
      )
