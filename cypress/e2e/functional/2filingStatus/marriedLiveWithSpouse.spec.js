/* eslint-disable max-len */

// Question only displays with ARPA flow

describe('Filing Status Page', () => {
    it('Did you live with Spouse (Married) Question - Path 1 MFS', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            
            // Question
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('have.text', content.filingStatus.liveApartFromSpouse).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="liveApartFromSpouseHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="liveApartFromSpouse-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="liveApartFromSpouse-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not be visible yet
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "No", Number of Dependents question displays
            cy.get('[data-testid="liveApartFromSpouse-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "Yes", Legal Doc question displays
            cy.get('[data-testid="liveApartFromSpouse-yes"]').click()
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.visible')
        })
    })
    it('Did you live with Spouse (Married) Question - Path 2 HOH', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-head-Of-Household"]').click()
            cy.get('[data-testid="isMarriedHoH-yes"]').click()
            
            // Question
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('have.text', content.filingStatus.liveApartFromSpouse).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="liveApartFromSpouseHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="liveApartFromSpouse-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="liveApartFromSpouse-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not be visible yet
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "No", Number of Dependents question displays
            cy.get('[data-testid="liveApartFromSpouse-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "Yes", Legal Doc question displays
            cy.get('[data-testid="liveApartFromSpouse-yes"]').click()
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.visible')
        })
    })
    it('Did you live with Spouse (Married) Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="liveApartFromSpouse-errorListItem"]').should('have.text', content.error.liveApartFromSpouseError).click()
            cy.get('[data-testid="liveApartFromSpouse-error-message"]').should('have.text', content.error.liveApartFromSpouseError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
