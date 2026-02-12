/* eslint-disable max-len */

// Question only displays with ARPA flow

describe('Filing Status Page', () => {
    it('Legal Document Question - Path 1 Married Filing Seperately', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="liveApartFromSpouse-yes"]').click()
            
            // Question
            cy.get('[data-testid="mfsLegalDoc-label"]').should('have.text', content.filingStatus.mfsLegalDoc).and('be.visible')
            cy.get('[data-testid="mfsLegalDocHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="mfsLegalDoc-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="mfsLegalDoc-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "Yes", Number of Dependents question displays
            cy.get('[data-testid="mfsLegalDoc-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // Disqualified if user selects "No"
            cy.get('[data-testid="mfsLegalDoc-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).click()
            cy.get('[data-testid="mfsWarning-p1"]').should('have.text', content.error.mfsLegalDocWarning)
            cy.get('[data-testid="mfsWarning-p4"]').should('have.text', content.error.mfsLegalDocWarning2)
            cy.get('[data-testid="mfsWarning-a3"]').should('have.attr', 'href', content.error.mfsLegalDocWarningLink1)
        })
    })
    it('Legal Document Question - Path 2 Tool Determines Married Filing Seperately, Married or Legally Seperated', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            cy.get('[data-testid="liveWithSpouse-yes"]').click()
            
            // Question
            cy.get('[data-testid="mfsLegalDoc-label"]').should('have.text', content.filingStatus.mfsLegalDoc).and('be.visible')
            cy.get('[data-testid="mfsLegalDocHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="mfsLegalDoc-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="mfsLegalDoc-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "Yes", Number of Dependents question displays
            cy.get('[data-testid="mfsLegalDoc-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // Disqualified if user selects "No"
            cy.get('[data-testid="mfsLegalDoc-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).click()
            cy.get('[data-testid="mfsWarning-p1"]').should('have.text', content.error.mfsLegalDocWarning)
            cy.get('[data-testid="mfsWarning-p4"]').should('have.text', content.error.mfsLegalDocWarning2)
            cy.get('[data-testid="mfsWarning-a3"]').should('have.attr', 'href', content.error.mfsLegalDocWarningLink1)
        })
    })
    it('Legal Document Question - Path 3 Tool Determines Married Filing Seperately, Widowed', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-no"]').click()
            cy.get('[data-testid="liveWithSpouse-yes"]').click()
            
            // Question
            cy.get('[data-testid="mfsLegalDoc-label"]').should('have.text', content.filingStatus.mfsLegalDoc).and('be.visible')
            cy.get('[data-testid="mfsLegalDocHelpTip"]').should('not.exist')

            // Radio buttons
            cy.get('[data-testid="mfsLegalDoc-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="mfsLegalDoc-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not be visible yet
            // When user selects "Yes", Number of Dependents question displays
            cy.get('[data-testid="mfsLegalDoc-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // Disqualified if user selects "No"
            cy.get('[data-testid="mfsLegalDoc-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).click()
            cy.get('[data-testid="mfsWarning-p1"]').should('have.text', content.error.mfsLegalDocWarning)
            cy.get('[data-testid="mfsWarning-p4"]').should('have.text', content.error.mfsLegalDocWarning2)
            cy.get('[data-testid="mfsWarning-a3"]').should('have.attr', 'href', content.error.mfsLegalDocWarningLink1)
        })
    })
    it('Legal Document Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="liveApartFromSpouse-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="mfsLegalDoc-errorListItem"]').should('have.text', content.error.mfsLegalDocError).click()
            cy.get('[data-testid="mfsLegalDoc-error-message"]').should('have.text', content.error.mfsLegalDocError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
