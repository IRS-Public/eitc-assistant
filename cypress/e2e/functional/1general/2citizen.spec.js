/* eslint-disable max-len */


describe('General Page', () => {
    it('Citizen Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            // Question
            cy.get('[data-testid="citizen-label"]').should('have.text', content.general.citizen2023).and('be.visible')
            cy.get('[data-testid="citizenHelpTip"]').should('be.visible').click()

            // Helptip
            cy.get('[data-testid="citizenToolTipHeader"]').should('have.text', content.toolTip.citizenToolTipHeader).and('be.visible')
            cy.get('[data-testid="citizenToolTipParagraph1"]').should('have.text', content.toolTip.citizenToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="citizenToolTipParagraph2"]').should('have.text', content.toolTip.citizenToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="citizenToolTipParagraph3"]').should('have.text', content.toolTip.citizenToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="citizenToolTipLink"]').should('have.attr', 'href', content.toolTip.citizenToolTipLink1).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="citizen-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="citizen-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="validSSN-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="citizen-no"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-label"]').should('be.visible')
        })
    })
    it('Citizen Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="citizen-errorListItem"]').should('have.text', content.error.citizenError).click()
            cy.get('[data-testid="citizen-error-message"]').should('have.text', content.error.citizenError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // DQ when user selects "No"
            cy.get('[data-testid="citizen-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading)
            cy.get('[data-testid="citizenWarning-p1"]').should('have.text', content.error.citizenDQParagraph1)
            cy.get('[data-testid="citizenWarning-p2"]').should('have.text', content.error.citizenDQParagraph2)
            cy.get('[data-testid="citizenWarning-a1"]').should('have.attr', 'href',  content.error.citizenDQLink1)
        })
    })
})
