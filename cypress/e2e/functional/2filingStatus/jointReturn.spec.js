/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Joint Return with your Spouse Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            
            // Question
            cy.get('[data-testid="fileJointReturn-label"]').should('have.text', content.filingStatus.fileJointReturn).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="fileJointReturnHelpTip"]').click()
            cy.get('[data-testid="jointReturnHelpTipHeading1"]').should('have.text', content.toolTip.fileJointReturnToolTipHeading).and('be.visible')
            cy.get('[data-testid="jointReturnHelpTipParagraph1"]').should('have.text', content.toolTip.fileJointReturnToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="fileJointReturnHelpTip"]').click()
            cy.get('[data-testid="jointReturnHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="fileJointReturn-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="fileJointReturn-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fsToolResultTitle-label"]').should('not.exist') // Filing Status Tool Results should not be visible
            cy.get('[data-testid="liveWithSpouse-label"]').should('be.not.visible') // next question should not be visible
            // When user selects "Yes", User should get Married Filing Jointly results and spouse SSN question should display
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfjResults).and('be.visible') 
            cy.get('[data-testid="spouseValidSSN-label"]').should('be.visible') 
            // When user selects "No", the live with spouse question should display
            cy.get('[data-testid="fileJointReturn-no"]').click()
            cy.get('[data-testid="liveWithSpouse-label"]').should('be.visible') 
        })
    })
    it('Joint Return with your Spouse Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="fileJointReturn-errorListItem"]').should('have.text', content.error.fileJointReturnError).click()
            cy.get('[data-testid="fileJointReturn-error-message"]').should('have.text', content.error.fileJointReturnError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
