/* eslint-disable max-len */
// 2 places

describe('Filing Status Page', () => {
    it('Spouse Age Question - Path 1 MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()

            // Verify Spouse questions do NOT display when taxpayer's age is "24 and over" (default with generalPage() script)
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible')

            // Verify Spouse questions do NOT display when taxpayer's age is 24 and under
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]')
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible')

            // Verify Spouse questions do NOT display when taxpayer's age is 65 and older
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-over65"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible')

            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            
            // Question
            cy.get('[data-testid="spouseAge-label"]').should('have.text', content.filingStatus.spouseAge).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseAgeHelpTip"]').should('not.exist')
            
            // Radio buttons
            cy.get('#spouseAge-under24-span').should('have.text', content.ageRange1).and('be.visible')
            cy.get('#spouseAge-25-64-span').should('have.text', content.ageRange2).and('be.visible')
            cy.get('#spouseAge-over65-span').should('have.text', content.ageRange3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not display yet
            })
    })
    it('Spouse Age Question - Path 2 Tool Determines MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()

            // Verify Spouse questions do NOT display when taxpayer's age is "24 and over" (default with generalPage() script)
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible')

            // Verify Spouse questions do NOT display when taxpayer's age is under 24
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible')

            // Verify Spouse questions do NOT display when taxpayer's age is 25-64
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible')

            // Spouse questions should display when taxpayer's age is over 65
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-over65"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="spouseAge-label"]').should('be.visible')

           
            // Question
            cy.get('[data-testid="spouseAge-label"]').should('have.text', content.filingStatus.spouseAge).and('be.visible')
            
            // Radio buttons
            cy.get('#spouseAge-under24-span').should('have.text', content.ageRange1).and('be.visible')
            cy.get('#spouseAge-25-64-span').should('have.text', content.ageRange2).and('be.visible')
            cy.get('#spouseAge-over65-span').should('have.text', content.ageRange3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not display yet
            // When user selects "24 and under", the Number of Dependents question should display
            cy.get('[data-testid="spouseAge-input-under24"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "24-64", the Number of Dependents question should display
            cy.get('[data-testid="spouseAge-input-age-25-64"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "65 and older", the Number of Dependents question should display
            cy.get('[data-testid="spouseAge-input-over65"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
        })
    })
    it('Spouse Age Question - NON-ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()

            // Verify Spouse questions do NOT display when taxpayer's age is "25-64" (Qualifying age)
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="spouseAge-label"]').should('be.not.visible')

            // Spouse questions should display when taxpayer's age is "24 and under" (Not qualifying age)
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-label"]').should('be.visible')

            // Spouse questions should display when taxpayer's age is "64 and Over" (Not qualifying age)
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-over65"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-label"]').should('be.visible')

            // Question
            cy.get('[data-testid="spouseAge-label"]').should('have.text', content.filingStatus.spouseAgeNonARPA).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spouseAgeHelpTip"]').should('not.exist')
            
            // Radio buttons
            cy.get('#spouseAge-under24-span').should('have.text', content.ageRange1).and('be.visible')
            cy.get('#spouseAge-25-64-span').should('have.text', content.ageRange2).and('be.visible')
            cy.get('#spouseAge-over65-span').should('have.text', content.ageRange3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not display yet
            // When user selects "24 and under", the Number of Dependents question should display
            cy.get('#spouseAge-under24-span').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "25-64", the Number of Dependents question should display
            cy.get('#spouseAge-25-64-span').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "65 and over", the Number of Dependents question should display
            cy.get('[data-testid="spouseAge-input-over65"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
        })
    })
    it('Spouse Age Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="spouseAge-errorListItem"]').should('have.text', content.error.spouseAgeError).click()
            cy.get('[data-testid="spouseAge-error-message"]').should('have.text', content.error.spouseAgeError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
