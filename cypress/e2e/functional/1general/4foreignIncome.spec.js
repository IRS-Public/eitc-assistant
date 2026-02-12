/* eslint-disable max-len */


describe('General Page', () => {
    it('Foreign Income Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            
            // Question
            cy.get('[data-testid="foreignIncome-label"]').should('have.text', content.general.foreignIncome).and('be.visible')
            cy.get('[data-testid="foreignIncomeHelpTip"]').should('be.visible').click()

            // Helptip
            cy.get('[data-testid="foreignIncomeToolTipHeader"]').should('have.text', content.toolTip.foreignIncomeToolTipHeader).and('be.visible')
            cy.get('[data-testid="foreignIncomeToolTipParagraph1"]').should('have.text', content.toolTip.foreignIncomeToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="foreignIncomeToolTipLink1"]').should('have.attr', 'href', content.toolTip.foreignIncomeToolTipLink1).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="foreignIncome-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="foreignIncome-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="claimedAsDependent-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="foreignIncome-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-label"]').should('be.visible')
        })
    })
    it('Foreign Income Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="foreignIncome-errorListItem"]').should('have.text', content.error.foreignIncomeError).click()
            cy.get('[data-testid="foreignIncome-error-message"]').should('have.text', content.error.foreignIncomeError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // DQ when user selects "Yes"
            cy.get('[data-testid="foreignIncome-yes"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading)
            cy.get('[data-testid="foreignIncomeWarning-p1"]').should('have.text', content.error.foreignIncomeDQParagraph1)
            cy.get('[data-testid="foreignIncomeWarning-p2"]').should('have.text', content.error.foreignIncomeDQParagraph2)
            cy.get('[data-testid="foreignIncomeWarning-a1"]').should('have.attr', 'href', content.error.foreignIncomeDQLink1)
            cy.get('[data-testid="foreignIncomeWarning-a2"]').should('have.attr', 'href', content.error.foreignIncomeDQLink2)
        })
    })
})
