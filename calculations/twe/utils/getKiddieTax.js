const getKiddieTax = (taxPayer) => {
    let fs = taxPayer.calculations.filingStatusKey,
        { isDependent } = taxPayer.aboutYou.regularFields,
        unearnedIncome = taxPayer.calculations.nonWageIncome,
        kiddieEstateTax = param.KIDDIETAX_ESTATE_TAX,
        { kiddieFlag } = taxPayer.calculations,
        { taxableIncome } = taxPayer.calculations,
        kiddieLookup = param.KIDDIETAX_lookup,
        bracketFloor = param.bracket_floor,
        taxRate = param.tax_rate,
        unearnedHelper = unearnedIncome - kiddieEstateTax[0],
        final8615Helper = unearnedHelper < taxableIncome ? unearnedHelper : taxableIncome,
        form8615Tax = taxableIncome - final8615Helper,
        kiddieTax = 0,
        helper = 0,
        line2,
        line3,
        line4,
        line5,
        line6,
        line7,
        line8,
        line9,
        line10,
        line11,
        line12,
        line13,
        line14,
        line15,
        line16,
        line17,
        line18,
        line19,
        line20,
        line21,
        line22,
        line23,
        line24,
        line25 = 0

    if (fs === 0 || fs === 2 || fs === 3) {
        if (isDependent === 'yes') {
            kiddieTax = kiddieEstateTax[1] + form8615Tax
            line2 = kiddieTax > taxableIncome ? taxableIncome : kiddieTax
            helper = kiddieLookup.table[fs][0]
            line3 = line2 > helper ? helper : line2
            line4 = line3 * taxRate[0]
            helper = kiddieLookup.table[fs][1]
            line5 = line2 > helper ? helper : line2
            line6 = line5 - line3 > 0 ? line5 - line3 : 0
            line7 = line6 * taxRate[1]
            line8 = line2 > bracketFloor.table[fs][3] ? bracketFloor.table[fs][3] : line2
            line9 = line8 - line5 > 0 ? line8 - line5 : 0
            line10 = line9 * taxRate[2]
            // the 9300 is updated annually {estateTax}
            line11 = form8615Tax + kiddieEstateTax[2]
            line12 = taxableIncome > line11 ? line11 : taxableIncome
            line13 = line12 > bracketFloor.table[fs][4] ? bracketFloor.table[fs][4] : line12
            line14 = line13 - line8 > 0 ? line13 - line8 : 0
            line15 = line14 * taxRate[3]
            line16 = line12 > bracketFloor.table[fs][5] ? bracketFloor.table[fs][5] : line12
            line17 = line16 - line13 > 0 ? line16 - line13 : 0
            line18 = line17 * taxRate[4]
            // the 12750 is updated annually {estateTax}
            line19 = form8615Tax + kiddieEstateTax[3]
            line20 = taxableIncome > line19 ? line19 : taxableIncome
            helper = kiddieLookup.table[fs][2]
            line21 = line20 > helper ? helper : line20
            line22 = line21 - line16 > 0 ? line21 - line16 : 0
            line23 = line22 * taxRate[5]
            line24 = taxableIncome - line21 > 0 ? taxableIncome - line21 : 0
            line25 = line24 * taxRate[6]

            kiddieTax = line4 + line7 + line10 + line15 + line18 + line23 + line25
            // kiddieFlag = true
        }
    }

    taxPayer.calculations.kiddieTax = kiddieTax
    taxPayer.calculations.kiddieFlag = kiddieFlag

    return taxPayer.calculations
}
