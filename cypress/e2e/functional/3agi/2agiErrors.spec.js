/* eslint-disable max-len */
describe('AGI Page', () => {
        it('Errors', () => {
            cy.get('@contentJSON').then((content) => {
            cy.filingStatusPage()

            // No Selection
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Wages - fully testing component
            cy.get('[data-testid="wagesFederalWithheldLabel"]').click()
            cy.get('[data-testid="addAnother-wagesFederalWithheld"]').click()
            cy.get('[data-testid="addAnother-wagesFederalWithheld"]').click()
            cy.get('[data-testid="addAnother-wagesFederalWithheld"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')
            cy.get('[data-testid="wagesFederalWithheld0-input"] + span').should('not.exist')
            cy.get('[data-testid="wagesFederalWithheld1-input"] + span').should('not.exist')
            cy.get('[data-testid="wagesFederalWithheld2-input"] + span').should('not.exist')
            cy.get('[data-testid="wagesFederalWithheld3-input"] + span').should('not.exist')

            // Retirement Plan
            cy.get('[data-testid="taxDeferredRetirementLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // HSA
            cy.get('[data-testid="cafeteriaLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Health Insurance
            cy.get('[data-testid="healthInsuranceLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Taxes not withheld (FINW)
            cy.get('[data-testid="federalIncomeNotWithheldLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // FINW Self-Employment taxes paid
            cy.get('[data-testid="selfEmploymentPaidFINWLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // FINW SEP, Simple Plans
            cy.get('[data-testid="sepSimpleFINWLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // FINW Health Insurance
            cy.get('[data-testid="selfEmploymentInsuranceFINWLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // FINW Expenses
            cy.get('[data-testid="selfEmploymentExpensesFINWLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Self-Employment Gross Income (SEP)
            cy.get('[data-testid="selfEmploymentGrossLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // SEP Self-Employment taxes paid
            cy.get('[data-testid="selfEmploymentPaidSEGLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // SEP SEP, Simple Plans
            cy.get('[data-testid="sepSimpleSEGLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // SEP Health Insurance
            cy.get('[data-testid="selfEmploymentInsuranceSEGLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // SEP Expenses
            cy.get('[data-testid="selfEmploymentExpensesSEGLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // UNEARNED INCOME ERRORS

            // Pension
            cy.get('[data-testid="pensionLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Unemployment Insurance
            cy.get('[data-testid="unemploymentInsuranceLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // SS or Railroad
            cy.get('[data-testid="socialSecurityRailroadLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Scholarship/Grant
            cy.get('[data-testid="scholarshipLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Investment Income
            cy.get('[data-testid="investmentsLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Other Income
            cy.get('[data-testid="unearnedOtherLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // ADJUSTMENTS TO INCOME ERRORS
            
            // Student Loan
            cy.get('[data-testid="studentLoanLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Educator Expenses
            cy.get('[data-testid="educatorLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // IRA
            cy.get('[data-testid="iraLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // HSA
            cy.get('[data-testid="hsaLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Moving for Military
            cy.get('[data-testid="movingLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Alimony
            cy.get('[data-testid="alimonyLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Withdrawl from Savings
            cy.get('[data-testid="earlyWithdrawalPenaltyLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Business Expenses
            cy.get('[data-testid="businessLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Other Adjustments
            cy.get('[data-testid="otherAdjustmentsLabel"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible').click()
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')

            // Over Earned Income limit (Scenario: Single, MAX: $56,837)
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('51832').should('have.value', '$51,832')
            cy.get('[data-testid="earnedIncomeLimitWarningHeading"]').should('not.exist')
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear().type('56838').should('have.value', '$56,838')
            cy.get('[data-testid="earnedIncomeLimitWarningHeading"]').should('have.text', content.agi.overEarnedIncomeLimitHeader).and('be.visible')
            cy.get('[data-testid="earnedIncomeLimitWarning-p1"]').should('have.text', content.agi.overEarnedIncomeLimitParagraph1).and('be.visible')
            cy.get('[data-testid="earnedIncomeLimitWarning-p2"]').should('have.text', content.agi.overEarnedIncomeLimitParagraph2).and('be.visible')
            cy.get('[data-testid="earnedIncomeLimitWarning-a1"]').should('have.attr', 'href', content.agi.overEarnedIncomeLimitLink).and('be.visible')
            cy.get('[data-testid="nextButton').should('be.disabled')
            
            // Over AGI limit (Scenario: Single, MAX: $56,837)
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear().type('56837').should('have.value', '$56,837')
            cy.get('[data-testid="agiLimitWarningHeading"]').should('not.exist')
            cy.get('[data-testid="investments0-input"]').clear().type('2').should('have.value', '$2')
            cy.get('[data-testid="studentLoan0-input"]').clear().type('1').should('have.value', '$1')
            cy.get('[data-testid="agiTotal"]').should('have.text', `${content.agi.totalAgi}$56,838`).and('be.visible')
            cy.get('[data-testid="agiLimitWarningHeading"]').should('have.text', content.agi.overAGILimitHeader).and('be.visible')
            cy.get('[data-testid="agiLimitWarning-p1"]').should('have.text', content.agi.overAGILimitParagraph1).and('be.visible')
            cy.get('[data-testid="agiLimitWarning-p2"]').should('have.text', content.agi.overAGILimitParagraph2).and('be.visible')
            cy.get('[data-testid="agiLimitWarning-a1"]').should('have.attr', 'href', content.agi.overAGILimitLink).and('be.visible')
            cy.get('[data-testid="nextButton').should('be.disabled')
        })
    })
})

