import moment from 'moment'
import filingStatusKey from '../filingStatusKey'
import { getToday } from '../../../../helpers/dateHelper'

const getSocialSecurityAmount = (ssiIncomes, param) => {
    let finalAmount = 0,
        diff = 0

    ssiIncomes.forEach((ssiIncome) => {
        if (ssiIncome.incomeEndDate < moment(getToday(param))) {
            finalAmount += ssiIncome.totalIncome
        } else {
            diff = ssiIncome.incomeEndDate.diff(ssiIncome.incomeStartDate, 'months') + 1
            finalAmount += (ssiIncome.ssiMonthlyAmount * diff)
        }
    })
    return finalAmount
}
const getTaxablePartSSI = (ssiIncomes, agi, filingStatus, param) => {
    const { SS_TAX_THRESHOLD_1 } = param,
        { SS_TAX_THRESHOLD_2 } = param,
        fsKey = filingStatusKey(filingStatus),
        ssiFinalAmount = getSocialSecurityAmount(ssiIncomes, param)

    let socialSecurityTaxableAmt = 0,
        checkForThreshold = 0,
        interimValueLine9ssWorksheet = 0,
        interimValueLine11ssWorksheet = 0,
        interimValueLine12ssWorksheet = 0,
        interimValueLine14ssWorksheet = 0,
        interimValueLine16ssWorksheet = 0;

    if (agi <= 0 || ssiFinalAmount === 0) {
        return socialSecurityTaxableAmt;
    }

    checkForThreshold = agi + 0.5 * ssiFinalAmount;
    interimValueLine9ssWorksheet = checkForThreshold - SS_TAX_THRESHOLD_1[fsKey];
    interimValueLine11ssWorksheet = interimValueLine9ssWorksheet - SS_TAX_THRESHOLD_2[fsKey];

    if (interimValueLine11ssWorksheet < 0) {
        interimValueLine11ssWorksheet = 0;
    }

    interimValueLine12ssWorksheet = interimValueLine9ssWorksheet < SS_TAX_THRESHOLD_2[fsKey] ? interimValueLine9ssWorksheet : SS_TAX_THRESHOLD_2[fsKey];

    if (fsKey === 2) {
        interimValueLine16ssWorksheet = checkForThreshold * 0.85;
    } else {
        interimValueLine14ssWorksheet = 0.5 * (ssiFinalAmount < interimValueLine12ssWorksheet ? ssiFinalAmount : interimValueLine12ssWorksheet);
        interimValueLine16ssWorksheet = interimValueLine14ssWorksheet + 0.85 * interimValueLine11ssWorksheet;
    }

    socialSecurityTaxableAmt = interimValueLine16ssWorksheet < 0.85 * ssiFinalAmount ? interimValueLine16ssWorksheet : 0.85 * ssiFinalAmount;

    if (socialSecurityTaxableAmt < 0) {
        socialSecurityTaxableAmt = 0;
    }
    // taxPayer.calculations.agi += socialSecurityTaxableAmt
    // taxPayer.adjustments.totals.agi += socialSecurityTaxableAmt
    // taxPayer.adjustments.totals.totalIncome += socialSecurityTaxableAmt

    // console.log('ssiTaxableAmt', socialSecurityTaxableAmt)

    return socialSecurityTaxableAmt;
}

export default getTaxablePartSSI
