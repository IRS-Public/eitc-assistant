/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Spouse Alive Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            // Spouse questions only display when taxpayer's age is "18 and under" or "24 and over" & a student
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            // Question
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('have.text', content.filingStatus.wasSpouseAliveEndOfYear).and('be.visible')

            // No Helptip
            cy.get('[data-testid="wasSpouseAliveEndOfYearHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible') // next question
            // When user selects "No", the deceased spouse age question should display
            cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.visible')
            // When user selects "Yes", the spouse age question should display
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-label"]').should('be.visible')
        })
    })
    it('Spouse Alive Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            // Spouse questions only display when taxpayer's age is Under 24
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="wasSpouseAliveEndOfYear-errorListItem"]').should('have.text', content.error.wasSpouseAliveEndOfYearError).click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-error-message"]').should('have.text', content.error.wasSpouseAliveEndOfYearError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
