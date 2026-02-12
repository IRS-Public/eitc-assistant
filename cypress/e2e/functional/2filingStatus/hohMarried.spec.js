/* eslint-disable max-len */

// Question only displays with ARPA flow

describe('Filing Status Page', () => {
    it('Head Of Household, Are you Married Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-head-Of-Household"]').click()
            
            // Question
            cy.get('[data-testid="isMarriedHoH-label"]').should('have.text', content.filingStatus.isMarriedHoH).and('be.visible')
            
            //Helptip
            cy.get('[data-testid="isMarriedHoHHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="isMarriedHoH-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="isMarriedHoH-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not be visible yet
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "No", Number of Dependents question displays
            cy.get('[data-testid="isMarriedHoH-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "Yes", did you live with your spouse question displays
            cy.get('[data-testid="isMarriedHoH-yes"]').click()
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('be.visible')
        })
    })
    it('Head Of Household, Are you Married Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-head-Of-Household"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="isMarriedHoH-errorListItem"]').should('have.text', content.error.isMarriedHoHError).click()
            cy.get('[data-testid="isMarriedHoH-error-message"]').should('have.text', content.error.isMarriedHoHError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
