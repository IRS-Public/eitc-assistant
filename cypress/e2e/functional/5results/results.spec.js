describe('Results Page', () => {
    it('Results Page Content', () => {
        cy.get('@contentJSON').then((content) => {
            cy.qualifyingChildrenPage()
            cy.get('[data-testid="resultsTitle"]').should('have.text', content.results.title).and('be.visible')
            cy.get('[data-testid="resultsIntro-p1"]').should('have.text', content.results.resultsIntroParagraph1).and('be.visible')
            cy.get('[data-testid="resultsIntro-p2"]').should('have.text', content.results.resultsIntroParagraph2).and('be.visible')
            cy.get('[data-testid="resultsNextSteps-heading"]').should('have.text', content.results.resultsNextStepsHeading).and('be.visible')
            cy.get('[data-testid="resultsNextSteps-subtitle"]').should('have.text', content.results.resultsNextStepsSubtitle).and('be.visible')
            cy.get('[data-testid="onlineHeading"]').should('have.text', content.results.onlineHeading).and('be.visible')
            cy.get('[data-testid="onlineContent"]').should('have.text', content.results.onlineContent).and('be.visible')
            cy.get('[data-testid="onlineButton"]').should('have.text', content.results.onlineButton).and('be.visible').and('have.attr', 'href', content.results.onlineButtonLink).and('have.attr', 'target', '_blank').and('be.visible')
            cy.get('[data-testid="inPersonHeading"]').should('have.text', content.results.inPersonHeading).and('be.visible')
            cy.get('[data-testid="inPersonContent"]').should('have.text', content.results.inPersonContent).and('be.visible')
            cy.get('[data-testid="inPersonButton"]').should('have.text', content.results.inPersonButton).and('have.attr', 'href', content.results.inPersonButtonLink).and('have.attr', 'target', '_blank').and('be.visible')
            cy.get('[data-testid="paperFormsHeading"]').should('have.text', content.results.paperFormsHeading).and('be.visible')
            cy.get('[data-testid="paperFormsContent"]').should('have.text', content.results.paperFormsContentWithQC).and('be.visible')
            cy.get('[data-testid="paperFormsLink-1"]').should('have.attr', 'href', content.results.paperFormsLink1).and('have.attr', 'target', '_blank').and('be.visible')
            cy.get('[data-testid="paperFormsLink-2"]').should('have.attr', 'href', content.results.paperFormsLink2).and('have.attr', 'target', '_blank').and('be.visible')
            cy.get('[data-testid="paperFormsLink-3"]').should('have.attr', 'href', content.results.paperFormsLink3).and('have.attr', 'target', '_blank').and('be.visible')
            cy.get('[data-testid="paperFormsButton"]').should('have.text', content.results.paperFormsButton).and('have.attr', 'href', content.results.paperFormsButtonLink).and('have.attr', 'target', '_blank').and('be.visible')
            
                // Paper Forms box has different content and links when user does/doesn't have QC
                // Switch to No QC & lower AGI so the taxpayer still qualifies for EITC
                cy.get('[data-testid="stepIndicatorStep3"]').click()
                cy.get('[data-testid="wagesFederalWithheld0-input"]').clear().type('5000').should('have.value', '$5,000')
                cy.get('[data-testid="stepIndicatorStep4"]').click()
                cy.get('[data-testid="children.0.live51Pct-no"]').click()
                cy.get('[data-testid="children.1.live51Pct-no"]').click()
                cy.get('[data-testid="children.2.live51Pct-no"]').click()
                cy.get('[data-testid="us50Percent-yes"]').click()
                cy.get('[data-testid="nextButton"]').click()
                
                cy.get('[data-testid="paperFormsContent"]').should('have.text', content.results.paperFormsContentNoQC).and('be.visible')
                cy.get('[data-testid="paperFormsLink-2"]').should('have.attr', 'href', content.results.paperFormsLink2).and('be.visible')
                cy.get('[data-testid="paperFormsLink-3"]').should('have.attr', 'href', content.results.paperFormsLink3).and('be.visible')
            
            cy.get('[data-testid="amendedReturnsHeading"]').should('have.text', content.results.amendedReturnsHeading).and('be.visible')
            cy.get('[data-testid="amendedReturnContent"]').should('have.text', content.results.amendedReturnsContent).and('be.visible')
            cy.get('[data-testid="amendedReturnButton"]').should('have.text', content.results.amendedReturnsButton).and('have.attr', 'href', content.results.amendedReturnsButtonLink).and('be.visible')
            cy.get('[data-testid="importantNote"]').should('have.text', content.results.importantNote).and('be.visible')
            
            // Change AGI back 
            cy.get('[data-testid="stepIndicatorStep3"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear().type('50000').should('have.value', '$50,000')
            cy.get('[data-testid="stepIndicatorStep5"]').click()

            // Verify table
            cy.get('[data-testid="summaryHeading"]').should('have.text', content.results.summaryHeading).and('be.visible')
            cy.get('[data-testid="resultsTableSubtitle"]').should('have.text', content.results.resultsTableSubtitle).and('be.visible')
            
            // Year
            cy.get('[data-testid="taxYearLabel"]').should('have.text', content.results.yearLabel).and('be.visible')
            cy.get('[data-testid="year-resultTable"]').should('have.text', content.results.yearResult).and('be.visible')
            cy.get('[data-testid="taxYear-edit"]').should('have.text', content.results.edit).and('be.visible').click()
            cy.get('[data-testid="year-label"]').should('be.visible') // question on General Info page
            cy.get('[data-testid="stepIndicatorStep5"]').click()

            // Filing Status
            cy.get('[data-testid="filingStatusLabel"]').should('have.text', content.results.filingStatusLabel).and('be.visible')
            cy.get('[data-testid="filingStatus-resultTable"]').should('have.text', content.results.filingStatusResult).and('be.visible')
            cy.get('[data-testid="filingStatus-edit"]').should('have.text', content.results.edit).and('be.visible').click()
            cy.get('[data-testid="fsKnown-label"]').should('be.visible') // question on Filing Status page
            cy.get('[data-testid="stepIndicatorStep5"]').click()

            // AGI
            cy.get('[data-testid="agiLabel"]').should('have.text', content.results.agiLabel).and('be.visible')
            cy.get('[data-testid="agi-resultTable"]').should('have.text', content.results.agiResult).and('be.visible')
            cy.get('[data-testid="agi-edit"]').should('have.text', content.results.edit).and('be.visible').click()
            cy.get('[data-testid="wagesFederalWithheldLabel"]').should('be.visible') // checkbox on AGI page
            cy.get('[data-testid="stepIndicatorStep5"]').click()

            cy.get('[data-testid="earnedLabel"]').should('have.text', content.results.earnedIncomeLabel).and('be.visible')
            cy.get('[data-testid="unearnedLabel"]').should('have.text', content.results.unearnedIncomeLabel).and('be.visible')
            cy.get('[data-testid="adjustmentLabel"]').should('have.text', content.results.adjustmentsLabel).and('be.visible')
            cy.get('[data-testid="wagesFederalWithheld-resultTable"]').should('have.text', content.results.wagesResult).and('be.visible')
            cy.get('[data-testid="taxDeferredRetirement-resultTable"]').should('have.text', content.results.retirementResult).and('be.visible')
            cy.get('[data-testid="cafeteria-resultTable"]').should('have.text', content.results.hsaResult).and('be.visible')
            cy.get('[data-testid="healthInsurance-resultTable"]').should('have.text', content.results.healthInsuranceResult).and('be.visible')
            cy.get('[data-testid="federalIncomeNotWithheld-resultTable"]').should('have.text', content.results.wagesNoTaxesResult).and('be.visible')
            cy.get('[data-testid="selfEmploymentPaidFINW-resultTable"]').should('have.text', content.results.selfEmploymentTaxesFINWResult).and('be.visible')
            cy.get('[data-testid="selfEmploymentExpensesFINW-resultTable"]').should('have.text', content.results.selfEmploymentExpensesFINWResult).and('be.visible')
            cy.get('[data-testid="selfEmploymentGross-resultTable"]').should('have.text', content.results.selfEmploymentGrossResult).and('be.visible')
            cy.get('[data-testid="selfEmploymentPaidSEG-resultTable"]').should('have.text', content.results.selfEmploymentTaxesSEGResult).and('be.visible')
            cy.get('[data-testid="selfEmploymentExpensesSEG-resultTable"]').should('have.text', content.results.selfEmploymentExpensesSEGResult).and('be.visible')
            cy.get('[data-testid="disabilityRetirement-resultTable"]').should('have.text', content.results.disabilityResult).and('be.visible')
            cy.get('[data-testid="foreignEarnedIncome-resultTable"]').should('have.text', content.results.foreignIncomeResult).and('be.visible')
            cy.get('[data-testid="prisonIncome-resultTable"]').should('have.text', content.results.prisonResult).and('be.visible')
            cy.get('[data-testid="pension-resultTable"]').should('have.text', content.results.pensionResult).and('be.visible')
            cy.get('[data-testid="unemploymentInsurance-resultTable"]').should('have.text', content.results.unemploymentResult).and('be.visible')
            cy.get('[data-testid="socialSecurityRailroad-resultTable"]').should('have.text', content.results.ssRailroadResult).and('be.visible')
            cy.get('[data-testid="scholarship-resultTable"]').should('have.text', content.results.scholarshipResult).and('be.visible')
            cy.get('[data-testid="investments-resultTable"]').should('have.text', content.results.investmentResult).and('be.visible')
            cy.get('[data-testid="unearnedOther-resultTable"]').should('have.text', content.results.otherUnearnedResult).and('be.visible')
            cy.get('[data-testid="sepSimpleFINW-resultTable"]').should('have.text', content.results.sepFINWResult).and('be.visible')
            cy.get('[data-testid="selfEmploymentInsuranceFINW-resultTable"]').should('have.text', content.results.selfEmployedHealthInsuranceFINWResult).and('be.visible')
            cy.get('[data-testid="sepSimpleSEG-resultTable"]').should('have.text', content.results.sepSEGWResult).and('be.visible')
            cy.get('[data-testid="selfEmploymentInsuranceSEG-resultTable"]').should('have.text', content.results.selfEmployedHealthInsuranceSEGWResult).and('be.visible')
            cy.get('[data-testid="studentLoan-resultTable"]').should('have.text', content.results.studentLoanResult).and('be.visible')
            cy.get('[data-testid="educator-resultTable"]').should('have.text', content.results.educatorResult).and('be.visible')
            
            // spot check the Edit link for Educator
            cy.get('[data-testid="educator-edit"]').should('have.text', content.results.edit).and('be.visible').click()
            cy.get('[data-testid="wagesFederalWithheldLabel"]').should('be.visible') // checkbox on AGI page
            cy.get('[data-testid="stepIndicatorStep5"]').click()

            cy.get('[data-testid="ira-resultTable"]').should('have.text', content.results.iraResult).and('be.visible')
            cy.get('[data-testid="hsa-resultTable"]').should('have.text', content.results.hsaAdjustmentsResult).and('be.visible')
            cy.get('[data-testid="moving-resultTable"]').should('have.text', content.results.movingResult).and('be.visible')
            cy.get('[data-testid="alimony-resultTable"]').should('have.text', content.results.alimonyResult).and('be.visible')
            cy.get('[data-testid="earlyWithdrawalPenalty-resultTable"]').should('have.text', content.results.savingsResult).and('be.visible')
            cy.get('[data-testid="business-resultTable"]').should('have.text', content.results.employeeExpensesResult).and('be.visible')
            cy.get('[data-testid="otherAdjustments-resultTable"]').should('have.text', content.results.otherAdjustmentsResult).and('be.visible')
            
            // lower AGI so that the user still qualifies with no children
            cy.get('[data-testid="stepIndicatorStep3"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear().type('5000').should('have.value', '$5,000')
            cy.get('[data-testid="stepIndicatorStep5"]').click()
               
            // Qualifying Children
            cy.get('[data-testid="childrenLabel"]').should('have.text', content.results.qualifyingChildrenLabel).and('be.visible')
            cy.get('[data-testid="qualifyingChildren-resultTable"]').should('have.text', content.results.qualifyingChild0Result).and('be.visible')
            cy.get('[data-testid="children-edit"]').should('have.text', content.results.edit).and('be.visible').click()
            // should go to QC page, change # of QC back to 3
            cy.get('[data-testid="children.0.live51Pct-yes"]').click() 
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="stepIndicatorStep5"]').click()
            cy.get('[data-testid="qualifyingChildren-resultTable"]').should('have.text', content.results.qualifyingChild3Result).and('be.visible')
            
            // Buttons
            cy.get('[data-testid="printButton"]').should('have.text', content.results.print).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.visible').click()
            cy.get('[data-testid="children.0.live51Pct-label"]').should('be.visible') // question on QC Page
            cy.get('[data-testid="stepIndicatorStep5"]').click()

            cy.get('[data-testid="startOverLink"]').should('have.text', content.results.startOver).and('be.visible').click()
            // verify start over works
            cy.get('[data-testid="year-label"]').should('be.visible') // user is on Gen Info page
            cy.get('[data-testid="stepIndicatorStep2"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible') // skip ahead warning
            cy.get('[data-testid="stepIndicatorStep3"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
            cy.get('[data-testid="stepIndicatorStep4"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
            cy.get('[data-testid="stepIndicatorStep5"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
        })
    })
})