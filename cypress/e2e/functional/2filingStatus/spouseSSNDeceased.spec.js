/* eslint-disable max-len */

// 2 places
describe('Filing Status Page', () => {
    it('Deceased Spouse Valid SSN Question ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-yes"]').click()
            
            // Question
            cy.get('[data-testid="deceasedSpouseValidSSN-label"]').should('have.text', content.filingStatus.deceasedSpouseValidSSN).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="deceasedSpouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').first().should('have.text', content.toolTip.spouseSSNToolTipHeading).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph1"]').first().should('have.text', content.toolTip.spouseSSNToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph2"]').first().should('have.text', content.toolTip.spouseSSNToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph3"]').first().should('have.text', content.toolTip.spouseSSNToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph4"]').first().should('have.text', content.toolTip.spouseSSNToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList0"]').first().should('have.text', content.toolTip.spouseSSNToolTipList0).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList1"]').first().should('have.text', content.toolTip.spouseSSNToolTipList1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList2"]').first().should('have.text', content.toolTip.spouseSSNToolTipList2).and('be.visible')
            cy.get('[data-testid="deceasedSpouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').first().should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="deceasedSpouseValidSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="deceasedSpouseValidSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
           cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="warningHeading"]').should('not.exist') // warning
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseValidSSN-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", a Disqualifier Message should display
            cy.get('[data-testid="deceasedSpouseValidSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
        })
    })
    it('Deceased Spouse Valid SSN Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="deceasedSpouseValidSSN-errorListItem"]').should('have.text', content.error.deceasedSpouseValidSSNError).click()
            cy.get('[data-testid="deceasedSpouseValidSSN-error-message"]').should('have.text', content.error.deceasedSpouseValidSSNError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // DQ Message
            cy.get('[data-testid="deceasedSpouseValidSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).click()
            cy.get('[data-testid="deceasedSpouseValidSSNWarning-p1"]').should('have.text', content.error.deceasedSpouseValidSSNWarning)
            cy.get('[data-testid="deceasedSpouseValidSSNWarning-p2"]').should('have.text', content.error.deceasedSpouseValidSSNWarning2)
        })
    })
})
