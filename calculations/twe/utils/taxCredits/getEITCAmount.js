const getEITCAmount = (site, totalIncomeForEITC, param) => {
    /* Constants from Parameters JSON File */
    const
        { EITC_computation_mfj } = param,
        { EITC_computation_single } = param,
        { filingStatus, demographics } = site.forms.aboutYou.values,
        isDependent = demographics.includes('claimedAsDependent')

    let { numOfEitcQC } = site.forms.taxCredits.values,
        earnedIncomeTaxCredit = 0

    /* Check if more than 3 children are selected, reduce to 3 since table is 3 or more */
    if (numOfEitcQC > 3) {
        numOfEitcQC = 3;
    }

    if (numOfEitcQC !== null) {
        if (filingStatus === 'married') {
            if (totalIncomeForEITC === 0) {
                earnedIncomeTaxCredit = 0;
            } else if (totalIncomeForEITC < EITC_computation_mfj.table[numOfEitcQC][0]) {
                earnedIncomeTaxCredit = EITC_computation_mfj.table[numOfEitcQC][3] * totalIncomeForEITC;
            } else if (totalIncomeForEITC >= EITC_computation_mfj.table[numOfEitcQC][0] && totalIncomeForEITC <= EITC_computation_mfj.table[numOfEitcQC][1]) {
                earnedIncomeTaxCredit = EITC_computation_mfj.table[numOfEitcQC][4];
            } else if (totalIncomeForEITC > EITC_computation_mfj.table[numOfEitcQC][1] && totalIncomeForEITC < EITC_computation_mfj.table[numOfEitcQC][2]) {
                earnedIncomeTaxCredit = EITC_computation_mfj.table[numOfEitcQC][4] - (EITC_computation_mfj.table[numOfEitcQC][5] * (totalIncomeForEITC - EITC_computation_mfj.table[numOfEitcQC][1]));
            } else if (totalIncomeForEITC >= EITC_computation_mfj.table[numOfEitcQC][2]) {
                earnedIncomeTaxCredit = 0;
            }
        } else {
            if (totalIncomeForEITC === 0) {
                earnedIncomeTaxCredit = 0;
            } else if (totalIncomeForEITC < EITC_computation_single.table[numOfEitcQC][0]) {
                earnedIncomeTaxCredit = EITC_computation_single.table[numOfEitcQC][3] * totalIncomeForEITC;
            } else if (totalIncomeForEITC >= EITC_computation_single.table[numOfEitcQC][0] && totalIncomeForEITC <= EITC_computation_single.table[numOfEitcQC][1]) {
                earnedIncomeTaxCredit = EITC_computation_single.table[numOfEitcQC][4];
            } else if (totalIncomeForEITC > EITC_computation_single.table[numOfEitcQC][1] && totalIncomeForEITC < EITC_computation_single.table[numOfEitcQC][2]) {
                earnedIncomeTaxCredit = EITC_computation_single.table[numOfEitcQC][4] - (EITC_computation_single.table[numOfEitcQC][5] * (totalIncomeForEITC - EITC_computation_single.table[numOfEitcQC][1]));
            } else if (totalIncomeForEITC >= EITC_computation_single.table[numOfEitcQC][2]) {
                earnedIncomeTaxCredit = 0;
            }
        }
    }

    if (isDependent) {
        earnedIncomeTaxCredit = 0;
    }
    return earnedIncomeTaxCredit;
}

export default getEITCAmount
