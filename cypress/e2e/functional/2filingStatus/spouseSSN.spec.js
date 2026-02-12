/* eslint-disable max-len */

// 2 places
describe('Filing Status Page', () => {
    it('Spouse Valid SSN Question - Path 1 MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            
            // Question
            cy.get('[data-testid="spouseValidSSN-label"]').should('have.text', content.filingStatus.spouseValidSSN).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').last().should('have.text', content.toolTip.spouseSSNToolTipHeading).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph1"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph2"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph3"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph4"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList0"]').last().should('have.text', content.toolTip.spouseSSNToolTipList0).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList1"]').last().should('have.text', content.toolTip.spouseSSNToolTipList1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList2"]').last().should('have.text', content.toolTip.spouseSSNToolTipList2).and('be.visible')
            cy.get('[data-testid="spouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').last().should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="spouseValidSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="spouseValidSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age qualifies them (no spouse age questions)
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="warningHeading"]').should('not.exist') // warning
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", a Disqualifier Message should display
            cy.get('[data-testid="spouseValidSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')

            // Taxpayer's age does not qualify them (should have spouse age questions)
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.visible') 
            // When user selects "No", a Disqualifier Message should display
            cy.get('[data-testid="spouseValidSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
        })
    })
    it('Spouse Valid SSN Question - Path 2 Tool Determines MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            
            // Question
            cy.get('[data-testid="spouseValidSSN-label"]').should('have.text', content.filingStatus.spouseValidSSN).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').last().should('have.text', content.toolTip.spouseSSNToolTipHeading).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph1"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph2"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph3"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph4"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList0"]').last().should('have.text', content.toolTip.spouseSSNToolTipList0).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList1"]').last().should('have.text', content.toolTip.spouseSSNToolTipList1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList2"]').last().should('have.text', content.toolTip.spouseSSNToolTipList2).and('be.visible')
            cy.get('[data-testid="spouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').last().should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="spouseValidSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="spouseValidSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age qualifies them (no spouse age questions)
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="warningHeading"]').should('not.exist') // warning
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", a Disqualifier Message should display
            cy.get('[data-testid="spouseValidSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')

            // Taxpayer's age does not qualify them (should have spouse age questions)
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="spouseAge-label"]').should('be.visible') 
            // When user selects "No", a Disqualifier Message should display
            cy.get('[data-testid="spouseValidSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
        })
    })
    it('Spouse Valid SSN Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
             cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="spouseValidSSN-errorListItem"]').should('have.text', content.error.spouseValidSSNError).click()
            cy.get('[data-testid="spouseValidSSN-error-message"]').should('have.text', content.error.spouseValidSSNError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // DQ Message
            cy.get('[data-testid="spouseValidSSN-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading).click()
            cy.get('[data-testid="warningBody"]').should('have.text', content.error.spouseValidSSNWarning)
        })
    })
})
