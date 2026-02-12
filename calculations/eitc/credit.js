import param from './EITCParams.json'

const credit = (year, numOfQC, filingStatus, total) => {

    const { EITCComputationMFJ, EITCComputationSingle } = param[year]

    let earnedIncomeTaxCredit = 0
    const eitcEligKids = numOfQC > 3 ? 3 : numOfQC

    let totalIncomeForEITC = (Math.floor(total / 50) * 50) + 25


    if (eitcEligKids !== null) {
        if (filingStatus === 'married') {
            if (totalIncomeForEITC === 0) {
                earnedIncomeTaxCredit = 0
            } else if (
                totalIncomeForEITC < EITCComputationMFJ.table[eitcEligKids].A
            ) {
                earnedIncomeTaxCredit = EITCComputationMFJ.table[eitcEligKids].R1 * totalIncomeForEITC
            } else if (
                totalIncomeForEITC >= EITCComputationMFJ.table[eitcEligKids].A
                && totalIncomeForEITC <= EITCComputationMFJ.table[eitcEligKids].B
            ) {
                earnedIncomeTaxCredit = EITCComputationMFJ.table[eitcEligKids].M
            } else if (
                totalIncomeForEITC > EITCComputationMFJ.table[eitcEligKids].B
                && totalIncomeForEITC < EITCComputationMFJ.table[eitcEligKids].L
            ) {
                earnedIncomeTaxCredit
                    = EITCComputationMFJ.table[eitcEligKids].M
                    - EITCComputationMFJ.table[eitcEligKids].R2
                    * (totalIncomeForEITC- EITCComputationMFJ.table[eitcEligKids].B)

            } else if (
                totalIncomeForEITC >= EITCComputationMFJ.table[eitcEligKids].L
            ) {
                earnedIncomeTaxCredit = 0
            }
        } else {
            if (totalIncomeForEITC === 0) {
                earnedIncomeTaxCredit = 0
            } else if (
                totalIncomeForEITC < EITCComputationSingle.table[eitcEligKids].A
            ) {
                earnedIncomeTaxCredit
                    = EITCComputationSingle.table[eitcEligKids].R1 * totalIncomeForEITC
            } else if (
                totalIncomeForEITC
                >= EITCComputationSingle.table[eitcEligKids].A
                && totalIncomeForEITC <= EITCComputationSingle.table[eitcEligKids].B
            ) {
                earnedIncomeTaxCredit = EITCComputationSingle.table[eitcEligKids].M
            } else if (
                totalIncomeForEITC > EITCComputationSingle.table[eitcEligKids].B
                && totalIncomeForEITC < EITCComputationSingle.table[eitcEligKids].L
            ) {
                earnedIncomeTaxCredit
                    = EITCComputationSingle.table[eitcEligKids].M - EITCComputationSingle.table[eitcEligKids].R2
                    * (totalIncomeForEITC - EITCComputationSingle.table[eitcEligKids].B)
                    
            } else if (
                totalIncomeForEITC >= EITCComputationSingle.table[eitcEligKids].L
            ) {
                earnedIncomeTaxCredit = 0
            }
        }
    }

    return earnedIncomeTaxCredit < 0 ? 0 : (Math.ceil(earnedIncomeTaxCredit))
}

export default credit
