/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Marital Status Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            
            // Filing Status Tool Title
            cy.get('[data-testid="filingStatusToolTitle"]').should('have.text', content.filingStatus.toolTitle).and('be.visible')
            
            // Question
            cy.get('[data-testid="maritalStatus-label"]').should('have.text', content.filingStatus.maritalStatus).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="maritalStatusHelpTip"]').click()
            cy.get('[data-testid="maritalStatusHelpTipHeading1"]').should('have.text', content.toolTip.maritalStatusToolTipHeading).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTipParagraph1"]').should('have.text', content.toolTip.maritalStatusToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTipHeading2"]').should('have.text', content.toolTip.maritalStatusToolTipHeading2).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTipParagraph2"]').should('have.text', content.toolTip.maritalStatusToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTip"]').click()
            cy.get('[data-testid="maritalStatusHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="maritalStatus-married"]').should('have.text', content.filingStatus.married).and('be.visible')
            cy.get('[data-testid="maritalStatus-divorced"]').should('have.text', content.filingStatus.divorced).and('be.visible')
            cy.get('[data-testid="maritalStatus-widow"]').should('have.text', content.filingStatus.widowed).and('be.visible')
            cy.get('[data-testid="maritalStatus-neverMarried"]').should('have.text', content.filingStatus.neverMarried).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fileJointReturn-label"]').should('be.not.visible') // next questions should not display yet
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.not.visible') // next questions should not display yet
            cy.get('[data-testid="spousesPassing-label"]').should('be.not.visible') // next questions should not display yet
            // When user selects "Married or Legally Seperated", the joint return question should display
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-label"]').should('be.visible')
            // When user selects "Divorced", the upkeep home 3 question should display
            cy.get('[data-testid="maritalStatus-divorced"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible')
            // When user selects "Widowed", the when did spouse pass away question should display
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-label"]').should('be.visible')
            // When user selects "Never Married", the upkeep home 3 question should display
            cy.get('[data-testid="maritalStatus-neverMarried"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible')
            
        })
    })
    it('Marital Status Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="maritalStatus-errorListItem"]').should('have.text', content.error.maritalStatusError).click()
            cy.get('[data-testid="maritalStatus-error-message"]').should('have.text', content.error.maritalStatusError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
