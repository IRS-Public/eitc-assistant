/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('US 50% Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-"]').click()
            // Question
            cy.get('[data-testid="us50Percent-label"]').should('have.text', content.filingStatus.us50Percent).and('be.visible').click()
            // Helptip
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            cy.get('[data-testid="us50HelpTipHeading1"]').should('have.text', content.toolTip.us50ToolTipHeading)
            cy.get('[data-testid="us50HelpTipParagraph1"]').should('have.text', content.toolTip.us50ToolTipParagraph1)
            cy.get('[data-testid="us50HelpTipHeading2"]').should('have.text', content.toolTip.us50ToolTipHeading2)
            cy.get('[data-testid="us50HelpTipParagraph2"]').should('have.text', content.toolTip.us50ToolTipParagraph2)
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            
            // Radio buttons
            cy.get('[data-testid="us50Percent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="us50Percent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="us50Percent-yes"]').click()
        })
    })
    it('US 50% Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="us50Percent-errorListItem"]').should('have.text', content.error.us50PercentError).click()
            cy.get('[data-testid="us50Percent-error-message"]').should('have.text', content.error.us50PercentError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // Disqualified if user selects "No"
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).click()
            cy.get('[data-testid="us50PercentWarning-p1"]').should('have.text', content.error.us50PercentWarning)
            
        })
    })
})
