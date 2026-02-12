/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Number of Dependents Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            // Question
            cy.get('[data-testid="numOfDependents-label"]').should('have.text', content.filingStatus.numOfDependents).and('be.visible')
            // Helptip
            cy.get('[data-testid="numOfDependentsHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('have.text', content.toolTip.depToolTipHeader).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph1"]').should('have.text', content.toolTip.depToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="depHelpTipList0"]').should('have.text', content.toolTip.depToolTipList0).and('be.visible')
            cy.get('[data-testid="depHelpTipList1"]').should('have.text', content.toolTip.depToolTipList1).and('be.visible')
            cy.get('[data-testid="depHelpTipList2"]').should('have.text', content.toolTip.depToolTipList2).and('be.visible')
            cy.get('[data-testid="depHelpTipList3"]').should('have.text', content.toolTip.depToolTipList3).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph2"]').should('have.text', content.toolTip.depToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph3"]').should('have.text', content.toolTip.depToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="numOfDependents-a1"]').should('have.attr', 'href', content.toolTip.depToolTipLink1).and('be.visible')
            cy.get('[data-testid="numOfDependentsHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('be.not.visible')
            // Radio buttons
            cy.get('[data-testid="numOfDependents-10"]').should('have.text', content.filingStatus.yes).and('be.visible')
            cy.get('[data-testid="numOfDependents-"]').should('have.text', content.filingStatus.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="us50Percent-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="numOfDependents-10"]').click()
            cy.get('[data-testid="numOfDependents-"]').click()
            cy.get('[data-testid="nextButton"]').should('be.enabled').and('be.visible')
        })
    })
    it('Number of Dependents Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="numOfDependents-errorListItem"]').should('have.text', content.error.numOfDependentsError).and('be.visible').click()
            cy.get('[data-testid="numOfDependents-error-message"]').should('have.text', content.error.numOfDependentsError).and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // Warning when taxpayer's age does not qualify them to have 0 dependents
            // Spouse questions only display when taxpayer's age is "18 and under" or "24 and over" & a student
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="numOfDependents-"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).and('be.visible').click()
            cy.get('[data-testid="noDependentsAgeWarning-p3"]').should('have.text', content.error.noDependentsAgeWarningParagraph1).and('be.visible')

            // Warning when taxpayer's age does not qualify them to have 0 dependents AND they are MFS
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="liveApartFromSpouse-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).and('be.visible').click()
            cy.get('[data-testid="noDependentsAgeWarning-p1"]').should('have.text', content.error.noDependentsMFSWarningParagraph1).and('be.visible')
        })
    })
})
