const initialTaxDedCalc = (localCategory, pctOfYear, localTax, localTaxRate, stateTax, stateTaxRate) => {
    let tax = null

    if (localCategory >= 4) {
        // Tax = (Percentage of residence in the year) * ((Local Tax * Local Tax Rate * 100) + State Tax)
        tax = pctOfYear * ((localTax * localTaxRate * 100) + stateTax)
    } else if (localCategory === 3) {
        // Tax = (Percentage of residence in the year) * (State Tax * (1 + (Local Tax Rate / State Tax Rate))
        tax = pctOfYear * (stateTax * (1 + (localTaxRate / stateTaxRate)))
    } else {
        // Tax = Percentage of residence in the year * State Tax
        tax = pctOfYear * stateTax
    }
    return tax
}

export default initialTaxDedCalc
