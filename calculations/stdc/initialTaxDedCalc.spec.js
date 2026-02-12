import initialTaxDedCalc from "./initialTaxDedCalc.js"

describe("Test initialTaxDeduction calculation", ()=> {
    test("local category 4", ()=> {
        const localCategory = 4
        const pctOfYear = 1
        const localTax = 144
        const localTaxRate = 0.04 
        const stateTax = 606
        const stateTaxRate = 0.04
        const cat4Test = initialTaxDedCalc(localCategory, pctOfYear, localTax, localTaxRate, stateTax, stateTaxRate)
        expect(cat4Test).toBe(1182)
        
    }),
    test("local category 3", ()=> {
        const localCategory = 3
        const pctOfYear = 1
        const localTax = null
        const localTaxRate = 0.02 
        const stateTax = 1011
        const stateTaxRate = 0.0625
        const cat3Test = initialTaxDedCalc(localCategory, pctOfYear, localTax, localTaxRate, stateTax, stateTaxRate)
        expect(cat3Test).toBe(1334.52)
    }),
    test("local category 1", ()=> {
        const localCategory = 1
        const pctOfYear = 1
        const localTax = null
        const localTaxRate = 0
        const stateTax = 789
        const stateTaxRate = 0.0625
        const cat1Test = initialTaxDedCalc(localCategory, pctOfYear, localTax, localTaxRate, stateTax, stateTaxRate)
        expect(cat1Test).toBe(789)

    })
})
