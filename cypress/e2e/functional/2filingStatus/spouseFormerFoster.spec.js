/* eslint-disable max-len */

 // Question only displays with ARPA flow

describe('Filing Status Page', () => {
    it('Spouse Former Foster Question - Path 1 MFJ, Spouse Alive', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-input-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-input-18"]').click()
            
            // Question
            cy.get('[data-testid="spouseQualifiedHomelessYouth-label"]').should('have.text', content.filingStatus.spouseQualifiedHomelessYouth).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipHeading1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipParagraph1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipHeading2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader2).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipParagraph2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTip"]').click()
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="spouseQualifiedHomelessYouth-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') // next question
            cy.get('[data-testid="spouseStudent-label"]').should('be.not.visible')  // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the student question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').click()

            // If Spouse's age is 18, user will NOT be asked student question
            cy.get('[data-testid="spouseAge-18"]').click()
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Former Foster question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="spouseQualifiedHomelessYouth-label"]').should('be.not.visible')
        })
    })
    it('Spouse Former Foster Question - Path 2 Tool Determines MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            // Change taxpayers age to 17 and under
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-input-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="spouseAge-19-23"]').click()
            
            // Question
            cy.get('[data-testid="spouseQualifiedHomelessYouth-label"]').should('have.text', content.filingStatus.spouseQualifiedHomelessYouth).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipHeading1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipParagraph1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipHeading2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader2).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipParagraph2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTip"]').click()
            cy.get('[data-testid="spouseQualifiedHomelessYouthHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="spouseQualifiedHomelessYouth-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') // next question
            cy.get('[data-testid="spouseStudent-label"]').should('be.not.visible')  // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the student question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="spouseStudent-label"]').should('be.visible') 

            // If Spouse's age is 18, user will NOT be asked student question
            cy.get('[data-testid="spouseAge-18"]').click()
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Former Foster question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="spouseQualifiedHomelessYouth-label"]').should('be.not.visible')
        })
    })
    it('Spouse Former Foster Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-input-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="spouseAge-19-23"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading2)
            cy.get('[data-testid="spouseQualifiedHomelessYouth-errorListItem"]').should('have.text', content.error.spouseQualifiedHomelessYouthError).click()
            cy.get('[data-testid="spouseQualifiedHomelessYouth-error-message"]').should('have.text', content.error.spouseQualifiedHomelessYouthError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
