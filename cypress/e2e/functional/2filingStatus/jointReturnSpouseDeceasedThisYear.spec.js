/* eslint-disable max-len */

describe('Filing Status Page', () => {
    it('Joint Return with Deceased Spouse (this year) Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            
            // Question
            cy.get('[data-testid="intendJointReturnDeceased-label"]').should('have.text', content.filingStatus.intendJointReturnDeceased).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="intendJointReturnDeceasedHelpTip"]').click()
            cy.get('[data-testid="jointReturnDeceasedHelpTipHeading1"]').should('have.text', content.toolTip.jointReturnDeceasedHelpTipHeading1).and('be.visible')
            cy.get('[data-testid="jointReturnDeceasedHelpTipParagraph1"]').should('have.text', content.toolTip.jointReturnDeceasedHelpTipParagraph1).and('be.visible')
            cy.get('[data-testid="intendJointReturnDeceasedHelpTip"]').click()
            cy.get('[data-testid="jointReturnDeceasedHelpTipHeading1"]').should('be.not.visible')
           
            // Radio buttons
            cy.get('[data-testid="intendJointReturnDeceased-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="intendJointReturnDeceased-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fsToolResultTitle-label"]').should('not.exist') // Filing Status Tool Results should not be visible
            cy.get('[data-testid="deceasedSpouseValidSSN-label"]').should('be.not.visible') // next question should not be visible yet
            cy.get('[data-testid="liveWithSpouse-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "No", live with spouse question should display
            cy.get('[data-testid="intendJointReturnDeceased-no"]').click()
            cy.get('[data-testid="liveWithSpouse-label"]').should('be.visible')
            // When user selects "Yes", user receives MFS filing status, and spouse SNN question should display
            cy.get('[data-testid="intendJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfjResults).and('be.visible') 
            cy.get('[data-testid="deceasedSpouseValidSSN-label"]').should('be.visible')
            
        })
    })
    it('Joint Return with Deceased Spouse (this year) Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="intendJointReturnDeceased-errorListItem"]').should('have.text', content.error.intendJointReturnDeceasedError).click()
            cy.get('[data-testid="intendJointReturnDeceased-error-message"]').should('have.text', content.error.intendJointReturnDeceasedError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
