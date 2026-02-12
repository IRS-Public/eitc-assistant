import moment from 'moment'
import getAnnualIncome from '../../../project/incomeWithholding/helpers/getAnnualIncome'

const
    startOfYear = (param) => moment(`January 1, ${param.current_year} 12:00:00`),
    endOfYear = (param) => moment(`December 31, ${param.current_year} 12:00:00`)

function annualized(val, effStart, effEnd, param) {
    let percentage = 0

    // if (!effStart) {
    //     effStart = startOfYear(param)
    // }
    // if (!effEnd) {
    //     effEnd = endOfYear(param)
    // }

    if (effStart === startOfYear(param) && effEnd === endOfYear(param)) {
        percentage = 1
    } else {
        if (effEnd.diff(effStart, 'days') !== 0) {
            percentage = 365.0 / (effEnd.diff(effStart, 'days') + 1)
        }
    }
    return (val * percentage);
}

export function getWHBaseAmounts(incomeType, filingStatus, param) {
    /* Constants from Parameters JSON File */
    const
        whRate = param.wh_rate,
        whRateMarried = param.wh_rate_married,
        bracketFloor = param.bracket_floor,
        whBracketFloor = incomeType === 'pension' ? param.wh_bracket_floor : param.wh_new_bracket_floor,
        whBaseAmts = [],
        whRatesCount = bracketFloor.table[0].length

    let usedWhRate = []

    for (let n = 0; n < 3; n++) { whBaseAmts[n] = [] }

    if (filingStatus === 'married' || filingStatus === 'married-separate') {
        usedWhRate = whRateMarried
    } else {
        usedWhRate = whRate
    }

    for (let i = 0; i < 3; i++) {
        whBaseAmts[i][0] = 0.0
        for (let j = 1; j < whRatesCount; j++) {
            whBaseAmts[i][j] = ((whBracketFloor.table[i][j] - whBracketFloor.table[i][j - 1]) * usedWhRate[j - 1]) + whBaseAmts[i][j - 1]
        }
    }
    return whBaseAmts
}

const getWHAmounts = (site, index, remainingPayPeriods, param) => {
    const
        { bracket_floor, wh_bracket_floor, wh_new_bracket_floor, wh_rate, WH_ALLOW } = param,
        { jobs } = site.forms.incomeWithholding.values,
        { retirement, cafeteriaPlan } = jobs[index].contributionsAndBonuses,
        { filingStatus } = site.forms.aboutYou.values,
        startDate = jobs[index].timePeriodOfJob === 'allYear' ? startOfYear(param) : moment(jobs[index].dateRange.startDate),
        endDate = jobs[index].timePeriodOfJob === 'allYear' ? endOfYear(param) : moment(jobs[index].dateRange.endDate),
        income = getAnnualIncome(site, index, param).correctedAnnualIncome,
        whCount = 101,
        arrayOfWhAmts = [],
        retirementPP = ['', undefined].includes(retirement.info[0].amount) ? 0 : parseInt(retirement.info[0].amount),
        cafeteriaPP = ['', undefined].includes(cafeteriaPlan.info[0].amount) ? 0 : parseInt(cafeteriaPlan.info[0].amount),
        retirementTotal = ['', undefined].includes(retirement.info[0].amountYTD) ? 0 : parseInt(retirement.info[0].amountYTD),
        cafeteriaTotal = ['', undefined].includes(cafeteriaPlan.info[0].amountYTD) ? 0 : parseInt(cafeteriaPlan.info[0].amountYTD),
        nonTaxPayrollDed = ((retirementPP + cafeteriaPP) * remainingPayPeriods) + retirementTotal + cafeteriaTotal,
        // totalBonus = income.bonusIncomeFutureWages + income.bonusIncomeWages + income.bonusIncomeWagesPast,
        whBaseAmts = getWHBaseAmounts(jobs[index].incomeType, filingStatus, param),
        whAllowUpdate = filingStatus === 'married' ? (3 * WH_ALLOW) : (2 * WH_ALLOW)
    let
        temp = 0,
        newTemp = 0,
        fs = filingStatus === 'married' || filingStatus === 'widow' ? 1 : 0,
        // taxpayerWages = (income + totalBonus - income.contribCafeteriaPlanAmt - income.contribTaxRetireAcctAmt)
        taxpayerWages = income - nonTaxPayrollDed
    // taxPayer.calculations.whBaseAmounts = whBaseAmts
    fs = filingStatus === 'head-of-household' ? 2 : fs

    taxpayerWages = taxpayerWages < 0 ? 0 : taxpayerWages

    if (income > 0) {
        const finalWhAllowUpdate = jobs[index].incomeType === 'pension' ? 0 : whAllowUpdate
        temp = annualized(taxpayerWages, moment(startDate), moment(endDate), param)
        newTemp = temp - finalWhAllowUpdate
    }

    if (jobs[index].incomeType === 'pension') {
        for (let k = 0; k < whCount - 1; k++) {
            for (let n = bracket_floor.table[0].length; n >= 0; n--) {
                if (newTemp > wh_bracket_floor.table[fs][n]) {
                    arrayOfWhAmts[k] = whBaseAmts[fs][n] + ((newTemp - wh_bracket_floor.table[fs][n]) * wh_rate[n])
                    break;
                } else {
                    arrayOfWhAmts[k] = 0.00
                }
            }
            newTemp -= WH_ALLOW
        }
    } else {
        for (let n = bracket_floor.table[0].length; n >= 0; n--) {
            if (temp > wh_new_bracket_floor.table[fs][n]) {
                arrayOfWhAmts[0] = whBaseAmts[fs][n] + ((temp - wh_new_bracket_floor.table[fs][n]) * wh_rate[n])
                break
            } else {
                arrayOfWhAmts[0] = 0.00
            }
        }
    }

    return arrayOfWhAmts;
}

export default getWHAmounts
