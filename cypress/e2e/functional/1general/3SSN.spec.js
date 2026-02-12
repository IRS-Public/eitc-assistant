/* eslint-disable max-len */


describe('General Page', () => {
    it('Valid SSN Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            
            // Question
            cy.get('[data-testid="validSSN-label"]').should('have.text', content.general.validSSN).and('be.visible')
            cy.get('[data-testid="validSSNHelpTip"]').should('be.visible').click()

            // Helptip
            cy.get('[data-testid="validSSNToolTipHeader"]').should('have.text', content.toolTip.validSSNToolTipHeader).and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph1"]').should('have.text', content.toolTip.validSSNToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph2"]').should('have.text', content.toolTip.validSSNToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph3"]').should('have.text', content.toolTip.validSSNToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph4"]').should('have.text', content.toolTip.validSSNToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="validSSNToolTipList0"]').should('have.text', content.toolTip.validSSNToolTipList0).and('be.visible')
            cy.get('[data-testid="validSSNToolTipList1"]').should('have.text', content.toolTip.validSSNToolTipList1).and('be.visible')
            cy.get('[data-testid="validSSNToolTipList2"]').should('have.text', content.toolTip.validSSNToolTipList2).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="validSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="validSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="foreignIncome-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="validSSN-no"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-label"]').should('be.visible')
        })
    })
    it('Valid SSN Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="validSSN-errorListItem"]').should('have.text', content.error.validSSNError).click()
            cy.get('[data-testid="validSSN-error-message"]').should('have.text', content.error.validSSNError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // DQ when user selects "No"
            cy.get('[data-testid="validSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading)
            cy.get('[data-testid="validSSNWarning-p1"]').should('have.text', content.error.validSSNDQParagraph1)
            cy.get('[data-testid="validSSNWarning-p2"]').should('have.text', content.error.validSSNDQParagraph2)
            cy.get('[data-testid="validSSNWarning-a1"]').should('have.attr', 'href', content.error.validSSNDQLink1)
        })
    })
})
