import { factGraph } from './fg-fact-graph.js'

/*
 * <fg-show> - Display the current value and/or status of a fact.
 */
class FgShow extends HTMLElement {
  constructor () {
    super()
    this.updateListener = () => this.render()
  }

  connectedCallback () {
    this.path = this.getAttribute('path')
    document.addEventListener('fg-update', this.updateListener)
    this.render()
  }

  disconnectedCallback () {
    document.removeEventListener('fg-update', this.updateListener)
  }

  render () {
    // This is a temporary enhancement to allow showing all values of a fact without knowing the collection id
    const results = (this.path.indexOf('*') !== -1)
      ? factGraph.getVect(this.path).Lgov_irs_factgraph_monads_MaybeVector$Multiple__f_vect.sci_Vector__f_prefix1.u
      : [factGraph.get(this.path)]

    let outputHtml = ''
    for (const result of results) {
      if (outputHtml !== '') outputHtml += ', '
      if (result.hasValue) {
        const value = result.get.toString()
        if (result.get.s_math_BigDecimal__f_bigDecimal) {
          const minimumFractionDigits = (value % 1 === 0) ? 0 : 2
          const options = { style: 'currency', currency: 'USD', minimumFractionDigits }
          outputHtml += new Intl.NumberFormat('en-US', options).format(value)
        } else {
          outputHtml += value
        }
      } else {
        outputHtml += '<span class="text-base">-</span>'
      }
    }

    this.innerHTML = outputHtml
  }
}
customElements.define('fg-show', FgShow)

/*
 * <fg-reset> - button to reset the Fact Graph.
 */
class FgReset extends HTMLElement {
  connectedCallback () {
    this.addEventListener('click', this)
  }

  handleEvent () {
    sessionStorage.removeItem('factGraph')
    window.location = '/app/eitc/'
  }
}
customElements.define('fg-reset', FgReset)
