/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Joint Return with Deceased Spouse (previous years) Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            
            // Question
            cy.get('[data-testid="entitledJointReturnDeceased-label"]').should('have.text', content.filingStatus.entitledJointReturnDeceased).and('be.visible')
            cy.get('[data-testid="entitledJointReturnDeceasedHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="entitledJointReturnDeceased-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="houseUpkeep2-label"]').should('be.not.visible') // next question should not be visible yet
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "No", house upkeep 3 question should display
            cy.get('[data-testid="entitledJointReturnDeceased-no"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible')
            // When user selects "Yes", house upkeep 2 question should display
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-label"]').should('be.visible')
            
        })
    })
    it('Joint Return with Deceased Spouse (previous years) Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="entitledJointReturnDeceased-errorListItem"]').should('have.text', content.error.entitledJointReturnDeceasedError).click()
            cy.get('[data-testid="entitledJointReturnDeceased-error-message"]').should('have.text', content.error.entitledJointReturnDeceasedError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
