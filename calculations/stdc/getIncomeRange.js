const getIncomeRange = (year, income) => {
    let incomeRange = null

    // 2013
    if (year <= 2013) {
        if (income < 20000) {
            incomeRange = 1
        } else if (income >= 20000 && income < 30000) {
            incomeRange = 2
        } else if (income >= 30000 && income < 40000) {
            incomeRange = 3
        } else if (income >= 40000 && income < 50000) {
            incomeRange = 4
        } else if (income >= 50000 && income < 60000) {
            incomeRange = 5
        } else if (income >= 60000 && income < 70000) {
            incomeRange = 6
        } else if (income >= 70000 && income < 80000) {
            incomeRange = 7
        } else if (income >= 80000 && income < 90000) {
            incomeRange = 8
        } else if (income >= 90000 && income < 100000) {
            incomeRange = 9
        } else if (income >= 100000 && income < 120000) {
            incomeRange = 10
        } else if (income >= 120000 && income < 140000) {
            incomeRange = 11
        } else if (income >= 140000 && income < 160000) {
            incomeRange = 12
        } else if (income >= 160000 && income < 180000) {
            incomeRange = 13
        } else if (income >= 180000 && income < 200000) {
            incomeRange = 14
        } else if (income >= 200000) {
            incomeRange = 15
        } else {
            incomeRange = 0
        }
    }

    // 2014 - current
    if (year >= 2014 && year <= 2020) {
        if (income < 20000) {
            incomeRange = 1
        } else if (income >= 20000 && income < 30000) {
            incomeRange = 2
        } else if (income >= 30000 && income < 40000) {
            incomeRange = 3
        } else if (income >= 40000 && income < 50000) {
            incomeRange = 4
        } else if (income >= 50000 && income < 60000) {
            incomeRange = 5
        } else if (income >= 60000 && income < 70000) {
            incomeRange = 6
        } else if (income >= 70000 && income < 80000) {
            incomeRange = 7
        } else if (income >= 80000 && income < 90000) {
            incomeRange = 8
        } else if (income >= 90000 && income < 100000) {
            incomeRange = 9
        } else if (income >= 100000 && income < 120000) {
            incomeRange = 10
        } else if (income >= 120000 && income < 140000) {
            incomeRange = 11
        } else if (income >= 140000 && income < 160000) {
            incomeRange = 12
        } else if (income >= 160000 && income < 180000) {
            incomeRange = 13
        } else if (income >= 180000 && income < 200000) {
            incomeRange = 14
        } else if (income >= 200000 && income < 225000) {
            incomeRange = 15
        } else if (income >= 225000 && income < 250000) {
            incomeRange = 16
        } else if (income >= 250000 && income < 275000) {
            incomeRange = 17
        } else if (income >= 275000 && income < 300000) {
            incomeRange = 18
        } else if (income >= 300000) {
            incomeRange = 19
        } else {
            incomeRange = 0
        }
    }

    return incomeRange
}

export default getIncomeRange
