const getStandardDeduction = (site, earnedIncomeBump, param) => {
    /* Constants from Parameters JSON File */
    const {
        SD_SINGLE,
        SD_HOH,
        SD_SEPARATE,
        SD_JOINT,
        SD_SINGLE_FACTOR,
        SD_MARRIED_FACTOR,
        EARNED_INCOME_BUMP,
        MIN_AMOUNT,
    } = param

    let standardDeduction = 0,
        earnedIncomeComp = earnedIncomeBump + EARNED_INCOME_BUMP // Need to add Total Scholarship & Grant incomes

    const { filingStatus, demographics } = site.forms.aboutYou.values,
        claimDependents = demographics.includes('willClaimDependents'),
        boxFlag = ((filingStatus === 'married-separate' && claimDependents) || filingStatus === 'married'),
        factorFlag = (filingStatus === 'single' || filingStatus === 'head-of-household'),
        isDependent = demographics.includes('claimedAsDependent'),
        isBlind = demographics.includes('blind') ? 1 : 0,
        isBlindSpouse = boxFlag && demographics.includes('blindSpouse') ? 1 : 0,
        sixtyFiveOlder = demographics.includes('is65OrOlder') ? 1 : 0,
        sixtyFiveOlderSpouse = boxFlag && demographics.includes('is65OrOlderSpouse') ? 1 : 0,
        boxes = isBlind + isBlindSpouse + sixtyFiveOlder + sixtyFiveOlderSpouse,
        boxFactorAmt = factorFlag ? SD_SINGLE_FACTOR * boxes : SD_MARRIED_FACTOR * boxes

    if (!isDependent) {
        switch (filingStatus) {
            case 'single':
                standardDeduction = SD_SINGLE
                break
            case 'head-of-household':
                standardDeduction = SD_HOH
                break
            case 'married-separate':
                standardDeduction = SD_SEPARATE
                break
            case 'married':
                standardDeduction = SD_JOINT
                break
            case 'widow':
                standardDeduction = SD_JOINT
                break
            default:
        }
    } else {
        /* Standard Deduction for Dependents */
        earnedIncomeComp = earnedIncomeComp < MIN_AMOUNT ? MIN_AMOUNT : earnedIncomeComp

        switch (filingStatus) {
            case 'single':
                earnedIncomeComp = earnedIncomeComp > SD_SINGLE ? SD_SINGLE : earnedIncomeComp
                break
            case 'married-separate':
                earnedIncomeComp = earnedIncomeComp > SD_SEPARATE ? SD_SEPARATE : earnedIncomeComp
                break
            case 'head-of-household':
                earnedIncomeComp = earnedIncomeComp > SD_HOH ? SD_HOH : earnedIncomeComp
                break
            case 'married':
            case 'widow':
                earnedIncomeComp = earnedIncomeComp > SD_JOINT ? SD_JOINT : earnedIncomeComp
                break
            default:
                break
        }
        standardDeduction = earnedIncomeComp
    }

    return standardDeduction + boxFactorAmt
}

export default getStandardDeduction
