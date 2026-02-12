import moment from 'moment'
import { getToday } from '../../../../helpers/dateHelper'

const getSocialSecurityAmount = (ssiIncomes, param) => {
  let finalAmount = 0,
    diff = 0

  ssiIncomes.forEach((ssiIncome) => {
    if (ssiIncome.incomeEndDate < moment(getToday(param))) {
      finalAmount += ssiIncome.ssiBenefitsYTD
    } else {
      diff = ssiIncome.incomeEndDate.diff(ssiIncome.incomeStartDate, 'months') + 1
      finalAmount += (ssiIncome.ssiMonthlyAmount * diff)
    }
  })

  return finalAmount
}
const getDepCareCredit = (agi, filingStatus, incomes, credits, param) => {
  let depCareKidsChosen = credits.numOfChildDependentCareQC,
    holdJob = '', // need to loop thru all incomes and find if any say no
    otherEarning = 0, // add all Current Incomes
    comparative = agi,
    estimateCareExpense = credits.childDependentCareAmount,
    personLimit = 0,
    intermediate = 0,
    chCrMultiplier = 0,
    depCareCredit = 0.0,
    numOfJobs = incomes.currentIncomes.length, // currentIncomes
    formerSalaries = 0, // add all PastIncomes
    lowestSalary = [],
    totalJobs = numOfJobs + incomes.pastIncomes.length,
    totalIncomeAmt = 0,
    nonWageIncome = 0,
    ssiFinalAmt = getSocialSecurityAmount(incomes.ssiIncomes, param)

  const { CH_DEP_LIMIT, CH_DEP_RATES, CH_DEP_AMT, CH_DEP_PCT } = param

  incomes.pastIncomes.forEach((pastIncome) => {
    formerSalaries += pastIncome.totalWages
    totalIncomeAmt += pastIncome.totalWages
  })

  incomes.currentIncomes.forEach((currIncome) => {
    totalIncomeAmt += currIncome.totalWages
  })

  Object.keys(incomes.otherIncome).forEach((item) => {
    if (['scholarship', 'unemployment', 'investments'].includes(item)) {
      nonWageIncome += ['', undefined].includes(incomes.otherIncome[item].info[0].amount) ? 0 : parseInt(incomes.otherIncome[item].info[0].amount)
    }
    if (item !== 'otherTaxes') {
      otherEarning += ['', undefined].includes(incomes.otherIncome[item].info[0].amount) ? 0 : parseInt(incomes.otherIncome[item].info[0].amount)
    }
  })

  if (numOfJobs > 0) {
    holdJob = incomes.currentIncomes[0].holdJobAllYear// QUESTION: is this for the first job or can it be for any job?

    for (let i = 0; i > numOfJobs; i++) {
      lowestSalary.push(incomes.currentIncomes[i].wages)
    }
    lowestSalary.sort((a, b) => a - b)
  }
  /* If no qualifying persons, no credit */
  if (depCareKidsChosen !== null && (depCareKidsChosen === '0' || depCareKidsChosen === 0)) {
    depCareCredit = 0;
  }
  /* If no AGI, no credit */
  else if (agi === 0) {
    depCareCredit = 0;
  }
  /* If MFJ, no prior job, only 1 current job, and no non-wage earned income --
  in other words, joint and only 1 source of earned income -- credit cannot be claimed */
  else if (filingStatus === 'married' && holdJob === 'allYear' && totalJobs === 1 && otherEarning === 0) {
    depCareCredit = 0;
  } else { /* Limit the qualified expenses */
    if (depCareKidsChosen !== null && (depCareKidsChosen === '1' || depCareKidsChosen === 1)) {
      personLimit = CH_DEP_LIMIT;
    } else {
      personLimit = 2 * CH_DEP_LIMIT;
    }

    if (estimateCareExpense > personLimit) {
      estimateCareExpense = personLimit;
    }

    if (filingStatus === 'married' && numOfJobs > 0) {
      comparative = lowestSalary[0]
      if (formerSalaries > 0 && formerSalaries < comparative) {
        comparative = formerSalaries
      }
      if (otherEarning > 0 && otherEarning < comparative) {
        comparative = otherEarning
      }
    } else {
      comparative = totalIncomeAmt - (nonWageIncome + ssiFinalAmt)
    }

    if (comparative < estimateCareExpense) {
      intermediate = comparative;
    } else {
      intermediate = estimateCareExpense;
    }

    for (let i = CH_DEP_RATES - 1; i >= 0; i--) {
      if (agi > CH_DEP_AMT[i]) {
        chCrMultiplier = CH_DEP_PCT[i]
        break;
      }
    }
    depCareCredit = chCrMultiplier * intermediate;
  }

  return depCareCredit
}

export default getDepCareCredit
