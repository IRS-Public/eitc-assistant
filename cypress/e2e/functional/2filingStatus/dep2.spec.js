/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Dependent 2 Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-yes"]').click()
            cy.get('[data-testid="claimDependent1-no"]').click()
            
            // Question
            cy.get('[data-testid="claimDependent2-label"]').should('have.text', content.filingStatus.claimDependent2).and('be.visible')
            // Helptip
            cy.get('[data-testid="claimDependent2HelpTip"]').click()
            cy.get('[data-testid="claimDependent2HelpTipHeading1"]').should('have.text', content.toolTip.claimDependent2ToolTipHeading).and('be.visible')
            cy.get('[data-testid="claimDependent2HelpTipParagraph1"]').should('have.text', content.toolTip.claimDependent2ToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimDependent2HelpTipList0"]').should('have.text', content.toolTip.claimDependent2ToolTipList0).and('be.visible')
            cy.get('[data-testid="claimDependent2HelpTipList1"]').should('have.text', content.toolTip.claimDependent2ToolTipList1).and('be.visible')
            cy.get('[data-testid="claimDependent2HelpTipList2"]').should('have.text', content.toolTip.claimDependent2ToolTipList2).and('be.visible')
            cy.get('[data-testid="claimDependent2HelpTipParagraph2"]').should('have.text', content.toolTip.claimDependent2ToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimDependent2HelpTipLink1"]').should('have.attr', 'href', content.toolTip.claimDependent2ToolTipLink1).and('be.visible')
            cy.get('[data-testid="claimDependent2HelpTip"]').click()
            cy.get('[data-testid="claimDependent2HelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="claimDependent2-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="claimDependent2-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fsToolResultTitle-label"]').should('not.exist') // Filing Status Tool Results should not be visible
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.not.visible') // next question should not be visible
            // When user selects "Yes", User should get Qualifying Widow results and the num of deps question should display
            cy.get('[data-testid="claimDependent2-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.qualifyingWidowResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the upKeep3 question should display
            cy.get('[data-testid="claimDependent2-no"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible') 
        })
    })
    it('Dependent 2 Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-yes"]').click()
            cy.get('[data-testid="claimDependent1-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="claimDependent2-errorListItem"]').should('have.text', content.error.claimDependent2Error).click()
            cy.get('[data-testid="claimDependent2-error-message"]').should('have.text', content.error.claimDependent2Error)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
