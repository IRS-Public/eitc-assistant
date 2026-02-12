/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Dependent 1 Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-yes"]').click()
            
            // Question
            cy.get('[data-testid="claimDependent1-label"]').should('have.text', content.filingStatus.claimDependent1).and('be.visible')
            // Helptip
            cy.get('[data-testid="claimDependent1HelpTip"]').click()
            cy.get('[data-testid="claimDependentHelpTipHeading1"]').should('have.text', content.toolTip.claimDependentToolTipHeading).and('be.visible')
            cy.get('[data-testid="claimDependentHelpTipParagraph1"]').should('have.text', content.toolTip.claimDependentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimDependentHelpTipHeading2"]').should('have.text', content.toolTip.claimDependentToolTipHeading2).and('be.visible')
            cy.get('[data-testid="claimDependentHelpTipParagraph2"]').should('have.text', content.toolTip.claimDependentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimDependentHelpTipLink1"]').should('have.attr', 'href', content.toolTip.claimDependentToolTipLink1).and('be.visible')
            cy.get('[data-testid="claimDependent1HelpTip"]').click()
            cy.get('[data-testid="claimDependentHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="claimDependent1-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="claimDependent1-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fsToolResultTitle-label"]').should('not.exist') // Filing Status Tool Results should not display yet
            cy.get('[data-testid="claimDependent2-label"]').should('be.not.visible') // next question should not display yet
            // When user selects "Yes", the Qualifying Widow results should display, then the Number of Dependents question should display
            cy.get('[data-testid="claimDependent1-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.qualifyingWidowResults).and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            //  when user selects "No", the dep 2 question should display
            cy.get('[data-testid="claimDependent1-no"]').click()
            cy.get('[data-testid="claimDependent2-label"]').should('be.visible') 
        })
    })
    it('Dependent 1 Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="claimDependent1-errorListItem"]').should('have.text', content.error.claimDependent1Error).click()
            cy.get('[data-testid="claimDependent1-error-message"]').should('have.text', content.error.claimDependent1Error)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
