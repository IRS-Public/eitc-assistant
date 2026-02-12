/* eslint-disable max-len */

// Question only displays with ARPA flow

describe('Filing Status Page', () => {
    it('Spouse Student Question - Path 1 MFJ, Spouse Alive', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-19-23"]').click()
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').click()
            
            // Question
            cy.get('[data-testid="spouseStudent-label"]').should('have.text', content.filingStatus.spouseStudent).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseStudentHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').first().should('have.text', content.toolTip.studentToolTipHeader).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph1"]').first().should('have.text', content.toolTip.studentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph2"]').first().should('have.text', content.toolTip.studentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipLink1"]').first().should('have.attr', 'href', content.toolTip.studentToolTipLink1).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTip"]').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').first().should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="spouseStudent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="spouseStudent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseStudent-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="spouseStudent-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Student question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="spouseStudent-label"]').should('be.not.visible')
        })
    })
    it('Spouse Student Question - Path 2 MFJ, Spouse Deceased', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
            cy.get('[data-testid="deceasedSpouseAge-19-23"]').click()
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').click()
            
            // Question
            cy.get('[data-testid="deceasedSpouseStudent-label"]').last().should('have.text', content.filingStatus.spouseStudent).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="deceasedSpouseStudentHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').last().should('have.text', content.toolTip.studentToolTipHeader).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph1"]').last().should('have.text', content.toolTip.studentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph2"]').last().should('have.text', content.toolTip.studentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipLink1"]').last().should('have.attr', 'href', content.toolTip.studentToolTipLink1).and('be.visible')
            cy.get('[data-testid="deceasedSpouseStudentHelpTip"]').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').last().should('be.not.visible')
            
            
            // Radio buttons
            cy.get('[data-testid="deceasedSpouseStudent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="deceasedSpouseStudent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseStudent-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseStudent-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Student question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="deceasedSpouseStudent-label"]').should('be.not.visible')
        })
    })
    it('Spouse Student Question - Path 3 Tool Determines MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="spouseAge-19-23"]').click()
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').click()
            
            // Question
            cy.get('[data-testid="spouseStudent-label"]').should('have.text', content.filingStatus.spouseStudent).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseStudentHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').first().should('have.text', content.toolTip.studentToolTipHeader).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph1"]').first().should('have.text', content.toolTip.studentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph2"]').first().should('have.text', content.toolTip.studentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipLink1"]').first().should('have.attr', 'href', content.toolTip.studentToolTipLink1).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTip"]').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').first().should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="spouseStudent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="spouseStudent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="spouseStudent-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="spouseStudent-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Student question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="spouseStudent-label"]').should('be.not.visible')
        })
    })
    it('Spouse Student Question - Path 4 Tool Determines MFJ, Spouse Deceased', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="deceasedSpouseValidSSN-yes"]').click()
            cy.get('[data-testid="deceasedSpouseAge-19-23"]').click()
            cy.get('[data-testid="deceasedSpouseQualifiedHomelessYouth-no"]').click()
            
            
            // Question
            cy.get('[data-testid="deceasedSpouseStudent-label"]').last().should('have.text', content.filingStatus.spouseStudent).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="deceasedSpouseStudentHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').last().should('have.text', content.toolTip.studentToolTipHeader).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph1"]').last().should('have.text', content.toolTip.studentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph2"]').last().should('have.text', content.toolTip.studentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipLink1"]').last().should('have.attr', 'href', content.toolTip.studentToolTipLink1).and('be.visible')
            cy.get('[data-testid="deceasedSpouseStudentHelpTip"]').click()
            cy.get('[data-testid="spouseStudentHelpTipHeading1"]').last().should('be.not.visible')
           
            // Radio buttons
            cy.get('[data-testid="deceasedSpouseStudent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="deceasedSpouseStudent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Taxpayer's age does NOT qualify them (spouse age questions display)
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') // next question
            // When user selects "Yes", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseStudent-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", the number of dependents question should display
            cy.get('[data-testid="deceasedSpouseStudent-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 

            // Taxpayer's age does qualify them (spouse Student question does NOT display)
            // Change taxpayers age to 18 and former foster 
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2021-24over"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="deceasedSpouseStudent-label"]').should('be.not.visible')
        })
    })
    it('Spouse Student Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-17under"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="spouseAge-19-23"]').click()
            cy.get('[data-testid="spouseQualifiedHomelessYouth-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading2)
            cy.get('[data-testid="spouseStudent-errorListItem"]').should('have.text', content.error.spouseStudentError).click()
            cy.get('[data-testid="spouseStudent-error-message"]').should('have.text', content.error.spouseStudentError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
