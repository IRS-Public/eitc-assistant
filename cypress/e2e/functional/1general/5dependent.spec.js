/* eslint-disable max-len */


describe('General Page', () => {
    it('Claimed as a Dependent Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            
            // Question
            cy.get('[data-testid="claimedAsDependent-label"]').should('have.text', content.general.claimedAsDependent).and('be.visible')
            cy.get('[data-testid="claimedAsDependentHelpTip"]').should('be.visible').click()

            // Helptip
            cy.get('[data-testid="claimToolTipHeader"]').should('have.text', content.toolTip.claimToolTipHeader).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph1"]').should('have.text', content.toolTip.claimToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimToolTipList0"]').should('have.text', content.toolTip.claimToolTipList0).and('be.visible')
            cy.get('[data-testid="claimToolTipList1"]').should('have.text', content.toolTip.claimToolTipList1).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph2"]').should('have.text', content.toolTip.claimToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph3"]').should('have.text', content.toolTip.claimToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph4"]').should('have.text', content.toolTip.claimToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="claimToolTipLink1"]').should('have.attr', 'href', content.toolTip.claimToolTipLink1).and('be.visible')
            cy.get('[data-testid="claimToolTipLink2"]').should('have.attr', 'href', content.toolTip.claimToolTipLink2).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="claimedAsDependent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="claimedAsDependent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="age-2023-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="claimedAsDependent-yes"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-label"]').should('be.visible')
        })
    })
    it('Claimed as a Dependent Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="claimedAsDependent-errorListItem"]').should('have.text', content.error.claimedAsDependentError).click()
            cy.get('[data-testid="claimedAsDependent-error-message"]').should('have.text', content.error.claimedAsDependentError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // DQ when user selects "Yes"
            cy.get('[data-testid="claimedAsDependent-yes"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading)
            cy.get('[data-testid="claimedAsDependentWarning-p1"]').should('have.text', content.error.claimedAsDependentDQParagraph1)
            cy.get('[data-testid="claimedAsDependentWarning-p2"]').should('have.text', content.error.claimedAsDependentDQParagraph2)
            cy.get('[data-testid="claimedAsDependentWarning-p3"]').should('have.text', content.error.claimedAsDependentDQParagraph3)
            cy.get('[data-testid="claimedAsDependentWarning-a1"]').should('have.attr', 'href', content.error.claimedAsDependentDQLink1)
            
        })
    })
})
