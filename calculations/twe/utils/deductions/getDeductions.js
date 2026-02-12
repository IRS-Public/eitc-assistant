import getTotalFromArray from '../getTotalFromArray'
import getStandardDeduction from './getStandardDeduction'
import getFinalMedicalDeduction from './getFinalMedDeduction'

const getDeductions = (site, agi, param) => {
    const { filingStatus } = site.forms.aboutYou.values
    const { deductions, deductionPayments, itemizedCalculations } = site.forms.deductions.values

    const standardDeductionAmount = getStandardDeduction(site, 0, param),
        itemizedAnyWay = itemizedCalculations.length > 0,
        deductionChoice = deductions === 'itemizedDeduction' ? 'itemized' : 'standard'

    let totalItemizedDeductions = 0,
        finalDeductionAmount = standardDeductionAmount

    // Taxes you paid SALT limits
    const saltLimit = filingStatus === 'married-separate' ? param.SALT_tax_limit_mfs : param.SALT_tax_limit
    const saltTotal = getTotalFromArray(deductionPayments.paid.info, saltLimit)

    // Limit med/dent based on AGI
    const medicalTotal = getTotalFromArray(deductionPayments.medical.info)
    // console.log('medicalTotal', medicalTotal)
    // console.log('agimed', agi)

    const finalMedicalDeduction = getFinalMedicalDeduction(medicalTotal, agi, param.med_limit)

    // const finalMedicalDeduction = medicalTotal - Math.round(agi * param.med_limit) <= 0
    //     ? 0
    //     : medicalTotal - Math.round(agi * param.med_limit)

    const deductionNames = [
        'qualified',
        'charity',
        'casualty',
        'other'
    ]

    deductionNames.forEach((name) => {
        totalItemizedDeductions += getTotalFromArray(deductionPayments[name].info)
    })
    totalItemizedDeductions += saltTotal + finalMedicalDeduction

    // if(field === "otherItemizedDeductions") {
    //     if (currentYear <= 2017 || currentYear >= 2026) {
    //         if (other !== null) {
    //             otherLimit = Math.round(agi * .02)
    //             deductions.currencyFields.other -= otherLimit
    //             if (other < 0) {
    //                 deductions.currencyFields.other = 0
    //             }
    //         }
    //     }
    // }

    //     totalDeductions = taxPayer.deductions.totals.totalDeductions,
    //     itemizedAnyWay = taxPayer.deductions.regularFields.itemizedAnyWay,
    //     stdDeduction = taxPayer.calculations.stdDeduction,
    //     currentYear = param.current_year,
    //     exemptions = 0,
    //     taxableIncome = 0,
    //     kiddieFlagItemized = false,
    //     seCheck = taxPayer.aboutYou.regularFields

    // if (itemizedAnyWay) {
    //     taxableIncome = agi - totalDeductions
    //     //kiddieFlagItemized = true
    // } else {
    //     if (totalDeductions > stdDeduction) {
    //         taxableIncome = agi - totalDeductions
    //         //kiddieFlagItemized = true
    //     } else {
    //         taxableIncome = agi - stdDeduction;
    //     }
    // }

    // if (currentYear <= 2017 || currentYear >= 2026) {
    //     taxableIncome -= exemptions;
    //     if (taxableIncome < 0.0) {
    //         taxableIncome = 0.0;
    //     }
    // }

    // if (seCheck.incomeSelfEmploymentCheck || seCheck.incomeSelfEmploymentCheckSpouse) {
    //     taxPayer.calculations.tentativeTaxableIncome = taxableIncome
    //     taxableIncome = computeQBIDeduction(taxPayer, taxableIncome)
    // }

    // taxPayer.calculations.kiddieFlagItemized = kiddieFlagItemize
    // console.log('total', totalItemizedDeductions)
    // console.log('saltTotal', saltTotal)
    // console.log('finalMedicalDeduction', finalMedicalDeduction)

    if (deductionChoice === 'itemized') {
        finalDeductionAmount = totalItemizedDeductions < standardDeductionAmount
            ? standardDeductionAmount
            : totalItemizedDeductions

        if (itemizedAnyWay) {
            finalDeductionAmount = totalItemizedDeductions
        }
        // kiddieFlagItemized = true
    }

    return finalDeductionAmount
}

export default getDeductions
