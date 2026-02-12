/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Filing Status Known Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            // Question
            cy.get('[data-testid="fsKnown-label"]').should('have.text', content.filingStatus.fsKnown).and('be.visible')
            cy.get('[data-testid="fsKnownHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="fsKnown-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="fsKnown-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="filingStatus-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="maritalStatus-label"]').should('be.not.visible') // next question
            // When user selects "No", the Filing Status Tool Title should display, then the Marital Status question
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="filingStatusToolTitle"]').should('have.text', content.filingStatus.toolTitle).and('be.visible')
            cy.get('[data-testid="maritalStatus-label"]').should('be.visible')
            // When user selects "Yes", the Filing Status question should display
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-label"]').should('be.visible') 
            
        })
    })
    it('Filing Status Known Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="fsKnown-errorListItem"]').should('have.text', content.error.fsKnownError).click()
            cy.get('[data-testid="fsKnown-error-message"]').should('have.text', content.error.fsKnownError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
