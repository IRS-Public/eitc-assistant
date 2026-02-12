/* eslint-disable max-len */

// Question only displays with ARPA flow

describe('Filing Status Page', () => {
    it('Spouse Former Foster  Deceased Question - Path 1 MFJ, Spouse Deceased', () => {
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
            cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
            cy.get('[data-testid="deceasedSpouseAge-19-23"]').click()
            
            // Question
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-label"]').should('have.text', content.filingStatus.deceasedSpouseQualifiedHomelessYouth).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipHeading1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipParagraph1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipHeading2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader2).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipParagraph2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTip"]').click()
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipHeading1"]').should('be.not.visible')
            
            
            // Radio buttons
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="numOfDependents-input-"]').click()
            cy.get('[data-testid="deceasedSpouseStudent-label"]').should('be.not.visible')  // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the student question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="deceasedSpouseStudent-label"]').should('be.visible') 

            // If Spouse's age is 18, user will NOT be asked student question
            cy.get('[data-testid="deceasedSpouseAge-18"]').click()
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Former Foster question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-label"]').should('be.not.visible')
        })
    })
    it('Spouse Former Foster Deceased Question - Path 2 Tool Determines MFJ, Spouse Deceased', () => {
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
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="deceasedSpouseValidSSN-yes"]').click()
            cy.get('[data-testid="deceasedSpouseAge-19-23"]').click()
            
            // Question
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-label"]').should('have.text', content.filingStatus.deceasedSpouseQualifiedHomelessYouth).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipHeading1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipParagraph1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipHeading2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader2).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipParagraph2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTip"]').click()
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouthHelpTipHeading1"]').should('be.not.visible')
           
            // Radio buttons
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') // next question
            cy.get('[data-testid="numOfDependents-input-"]').click()
            cy.get('[data-testid="deceasedSpouseStudent-label"]').should('be.not.visible')  // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the student question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="deceasedSpouseStudent-label"]').should('be.visible') 

            // If Spouse's age is 18, user will NOT be asked student question
            cy.get('[data-testid="deceasedSpouseAge-18"]').click()
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Former Foster question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-label"]').should('be.not.visible')
        })
    })
    it('Spouse Former Foster Deceased Errors', () => {
        cy.get('@contentJSON').then((content) => {
            //cy.generalPage()
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
            cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
            cy.get('[data-testid="deceasedSpouseAge-19-23"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading2)
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-errorListItem"]').should('have.text', content.error.deceasedSpouseQualifiedHomelessYouthError).click()
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-error-message"]').should('have.text', content.error.deceasedSpouseQualifiedHomelessYouthError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
