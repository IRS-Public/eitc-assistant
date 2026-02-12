import getAgi from './utils/getAgi'
import getTaxableIncome from './utils/getTaxableIncome'
import getStudentLoanPhaseOut from './utils/adjustments/getStudentLoanPhaseOut'
import getFinalMedDeduction from './utils/deductions/getFinalMedDeduction'
import getTotalFromArray from './utils/getTotalFromArray'
import getDeductions from './utils/deductions/getDeductions'
import getStandardDeduction from './utils/deductions/getStandardDeduction'
import getTaxCredits from './utils/taxCredits/getTaxCredits'
import getDepCareCredit from './utils/taxCredits/getDepCareCredit'
import getTax from './utils/getTax'
import getTotalTaxLiability from './utils/getTotalTaxLiability'
import getTotalIncome from './utils/income/getTotalIncome'
import getTaxablePartSSI from './utils/income/getTaxablePartSSI'
import getTotalWHTaxesYTD from './utils/income/getTotalWHTaxesYTD'
import getSSandMedTaxes from './utils/income/getSSandMedTaxes'
import getIncomeFutureFlag from './utils/income/getIncomeFutureFlag'
import getSelfEmployTax from './utils/getSelfEmployTax'
import getMedTaxMod from './utils/getMedTaxMod'
import predictEstWH from './utils/predictEstWH'
import getOverUnderAmt from './utils/slider/getOverUnderAmt'
import getQBIDeduction from './utils/income/getQBIDeduction'
import getFinalW4Recom from './utils/getFinalW4Recom'
import getSliderProps from './utils/slider/getSliderProps'
import getResultsBoxPorps from './utils/results/getResultsBoxPorps'
import getRecommendationProps from './utils/results/getRecommendationProps'
import getTotalAdjustments from './utils/adjustments/getTotalAdjustments'

class Taxpayer {
  constructor(site, param) {
    this.site = site
    this.slider = this.site.slider
    this.param = param
  }

  get totalIncome() {
    return this.param ? getTotalIncome(this.site, this.param) : null
  }

  get agi() {
    const { filingStatus } = this.site.forms.aboutYou.values
    const { adjustments } = this.site.forms.adjustments.values

    return getAgi(filingStatus, adjustments, this.totalIncome, this.param)
  }

  get totalAdjustments() {
    const { filingStatus } = this.site.forms.aboutYou.values
    const { adjustments } = this.site.forms.adjustments.values

    return getTotalAdjustments(adjustments, filingStatus, this.totalIncome, this.param)
  }

  get ssiIncome() {
    const { filingStatus } = this.site.forms.aboutYou.values

    return getTaxablePartSSI(this.totalIncome.ssiIncomes, this.agi.agi, filingStatus, this.param)
  }

  get totalWHTaxesYTD() {
    const { otherIncome } = this.site.forms.incomeWithholding.values
    return getTotalWHTaxesYTD(this.totalIncome, otherIncome, false)
  }

  get totalWHTaxesYTDFuture() {
    const { otherIncome } = this.site.forms.incomeWithholding.values
    return getTotalWHTaxesYTD(this.totalIncome, otherIncome, true)
  }

  get incomeFutureFlag() {
    return getIncomeFutureFlag(this.totalIncome)
  }

  get ssAndMedTaxes() {
    return getSSandMedTaxes(this.totalIncome, this.param)
  }

  get selfEmployTax() {
    return getSelfEmployTax(this.totalIncome, this.param)
  }

  get studentLoanPhaseOutDed() {
    const { filingStatus } = this.site.forms.aboutYou.values
    const { adjustments } = this.site.forms.adjustments.values
    const studentLoanTotal = getTotalFromArray(adjustments.studentLoan.info, this.param.studentLoanDeductionCap)

    return getStudentLoanPhaseOut(this.agi.modAGI, studentLoanTotal, filingStatus, this.param)
  }

  get medTaxMod() {
    const { filingStatus } = this.site.forms.aboutYou.values

    return getMedTaxMod(filingStatus, this.totalIncome, this.selfEmployTax, this.param)
  }

  get taxableIncome() {
    return getTaxableIncome(this.site, this.agi.agi, this.selfEmployTax, this.param)
  }

  get totalDeductions() {
    return getDeductions(this.site, this.agi.agi, this.param)
  }

  get finalMedDeduction() {
    const { deductionPayments } = this.site.forms.deductions.values
    const medicalTotal = getTotalFromArray(deductionPayments.medical.info)
    return getFinalMedDeduction(medicalTotal, this.agi.agi, this.param.med_limit)
  }

  get standardDeduction() {
    return getStandardDeduction(this.site, this.agi.earnedIncomeComp, this.param)
  }

  get taxOnTaxableIncome() {
    return getTax(this.site, this.taxableIncome, this.param)
  }

  get taxCredits() {
    return getTaxCredits(this.site, this.taxOnTaxableIncome, this.ssAndMedTaxes, this.totalIncome, this.agi.totalIncomeForEITC, this.param)
  }

  get depCareCredit() {
    const { filingStatus } = this.site.forms.aboutYou.values
    const { values } = this.site.forms.taxCredits

    return getDepCareCredit(this.agi.agi, filingStatus, this.totalIncome, values, this.param)
  }

  get qbiDeduction() {
    const seChecked = this.site.forms.incomeWithholding.values.otherIncome.selfEmployment.checked

    let qbiTaxableIncome = 0
    if (seChecked) {
      qbiTaxableIncome = getQBIDeduction(this.site, this.taxableIncome, this.selfEmployTax, this.param).finalQBI
    }

    return qbiTaxableIncome
  }

  get totalTaxLiability() {
    return getTotalTaxLiability(this.taxCredits, this.taxOnTaxableIncome, this.selfEmployTax, this.medTaxMod)
  }

  get projectWithholding() {
    return predictEstWH(this.totalIncome, this.totalWHTaxesYTD, this.param)
  }

  get finalW4Recom() {
    const { otherIncome } = this.site.forms.incomeWithholding.values
    const estFinalTax = this.totalTaxLiability.finalTaxObligation - (this.selfEmployTax + this.medTaxMod)
    return getFinalW4Recom(this.totalIncome, this.projectWithholding, this.totalTaxLiability.finalTaxObligation, this.totalWHTaxesYTD, this.slider.value, otherIncome, this.agi, estFinalTax)
  }

  get overUnderAmt() {
    return getOverUnderAmt(this.totalIncome, this.totalTaxLiability.finalTaxObligation, this.totalWHTaxesYTD, this.projectWithholding)
  }

  get sliderProps() {
    return getSliderProps(this.overUnderAmt, this.taxableIncome, this.finalW4Recom.shutDownSalary, this.finalW4Recom.shutDownWithholding)
  }

  get resultsBoxProps() {
    return getResultsBoxPorps(this.projectWithholding, this.totalTaxLiability.finalTaxObligation, this.ssiIncome, this.taxCredits, this.totalTaxLiability.taxBeforeRefundable)
  }

  get recommendationProps() {
    return getRecommendationProps(this.overUnderAmt, this.sliderProps, this.finalW4Recom, this.site.forms.aboutYou.values.filingStatus)
  }
}

export default Taxpayer
