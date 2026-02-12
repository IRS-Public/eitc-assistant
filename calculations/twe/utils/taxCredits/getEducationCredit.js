import getAgi from '../getAgi'

const getEducationCredit = (site, taxBeforeCredits, incomes, param) => {
    const { filingStatus, demographics } = site.forms.aboutYou.values
    const { values } = site.forms.taxCredits
    const educationCredit = ['', undefined].includes(values.aotc) ? 0 : parseInt(values.aotc)
    const LLCCredit = ['', undefined].includes(values.llc) ? 0 : parseInt(values.llc)
    const foreignTaxCredit = values.foreignTaxCredit === '' ? 0 : parseInt(values.foreignTaxCredit)
    const childDependentCareAmount = values.childDependentCareAmount === '' ? 0 : parseInt(values.childDependentCareAmount)
    const isDependent = demographics.includes('claimedAsDependent')
    const { adjustments } = site.forms.adjustments.values

    const agi = getAgi(filingStatus, adjustments, incomes, param)

    let Line1 = educationCredit,
        Line3 = agi.agi,
        Line4 = 0,
        Line5 = 0,
        Line6 = 0,
        Line7 = 0,
        Line8 = 0,
        Line9 = 0,
        Line10 = LLCCredit,
        Line11 = 0,
        Line12 = 0,
        Line13 = 0,
        Line14 = agi.agi,
        Line15 = 0,
        Line16 = 0,
        Line17 = 0,
        Line18 = 0,
        clwLine3 = 0,
        clwLine4 = 0,
        clwLine5 = 0,
        clwLine6 = 0,
        clwLine7 = 0,
        refundableAOTC = 0

    // Refundable AOTC Calculations

    if (filingStatus === 'married') {
        Line4 = Math.max(0, 180000 - Line3);
        Line5 = 20000;
        Line6 = Math.min(Line4 / Line5, 1);
        if (isDependent) {
            Line7 = 0;
        } else {
            Line7 = Line1 * Line6;
        }
        refundableAOTC = Line7 * 0.4;
    } else {
        Line4 = Math.max(0, 90000 - Line3);
        Line5 = 10000;
        Line6 = Math.min(Line4 / Line5, 1);
        if (isDependent) {
            Line7 = 0;
        } else {
            Line7 = Line1 * Line6
        }
        refundableAOTC = Line7 * 0.4
    }
    Line8 = refundableAOTC

    // Nonrefundable Education Credits Calculations

    Line9 = Line7 - Line8
    Line11 = Math.min(Line10, 10000)
    Line12 = Line11 * 0.2;
    if (filingStatus === 'married') {
        Line13 = 136000;
    } else {
        Line13 = 68000;
    }
    Line15 = Line13 - Line14;
    if (Line15 <= 0) {
        Line18 = 0;
    } else {
        if (filingStatus === 'married') {
            Line16 = 20000;
        } else {
            Line16 = 10000;
        }
        Line17 = Math.min(Line15 / Line16, 1)
        Line18 = Line12 * Line17;
    }

    // Credit Limit Worksheet

    clwLine3 = Line18 + Line9
    clwLine4 = taxBeforeCredits
    clwLine5 = foreignTaxCredit + childDependentCareAmount
    clwLine6 = Math.max(clwLine4 - clwLine5, 0)
    clwLine7 = Math.min(clwLine3, clwLine6)

    // const total = refundableAOTC + clwLine7

    return { refundableAOTC, 'nonRefundableAOTC': clwLine7 }
}

export default getEducationCredit
