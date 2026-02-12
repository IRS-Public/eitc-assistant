/* eslint-disable max-len */
// 2 places

describe('Filing Status Page', () => {
    it('Deceased Spouses Age Question - Path 1 MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()

            // Verify Spouse questions do NOT display when taxpayer's age is between 25-64
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.not.visible')

            // Spouse questions should display when taxpayer's age is "24 and under"
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-input-yes"]').click()
            cy.get('[data-testid="filingStatus-input-married"]').click()
            cy.get('[data-testid="spouseValidSSN-input-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.visible')

            // Spouse questions should display when taxpayer's age is 65 and older
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-over65"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-input-yes"]').click()
            cy.get('[data-testid="filingStatus-input-married"]').click()
            cy.get('[data-testid="spouseValidSSN-input-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.visible')

            
            // Question
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('have.text', content.filingStatus.deceasedSpouseAge).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="deceasedSpouseAgeHelpTip"]').should('not.exist')
            
            // Radio buttons
            cy.get('#deceasedSpouseAge-under24-span').should('have.text', content.ageRange1).and('be.visible')
            cy.get('#deceasedSpouseAge-25-64-span').should('have.text', content.ageRange2).and('be.visible')
            cy.get('#deceasedSpouseAge-over65-span').should('have.text', content.ageRange3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not display yet
            // When user selects "24 and under", the Number of Dependents question should display
            cy.get('[data-testid="deceasedSpouseAge-input-under24"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "25-64", the Former Foster youth question should display
            cy.get('[data-testid="deceasedSpouseAge-input-age-25-64"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects "65 and older", the Former Foster youth question should display
            cy.get('[data-testid="deceasedSpouseAge-input-over65"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            
        })
    })
    it('Deceased Spouses Age Question - Path 2 Tool Determines MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()

            // Verify Spouse questions do NOT display when taxpayer's age is "25-65
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.not.visible')

            // Verify Spouse questions do NOT display when taxpayer's age is "19 -23" AND not a student
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-input-no"]').click()
            cy.get('[data-testid="maritalStatus-input-widow"]').click()
            cy.get('[data-testid="spousesPassing-input-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-input-yes"]').click()
            cy.get('[data-testid="deceasedSpouseValidSSN-input-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')

            // Verify Spouse questions do NOT display when taxpayer's age is "25-64"
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-label"]').should('be.not.visible')
            // Spouse questions should display when taxpayer's age is "19-23" AND a student
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-over65"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            // Question
            cy.get('[data-testid="deceasedSpouseAge-label"]').should('have.text', content.filingStatus.deceasedSpouseAge).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="deceasedSpouseAgeHelpTip"]').should('not.exist')
            
            // Radio buttons
            cy.get('#deceasedSpouseAge-under24-span').should('have.text', content.ageRange1).and('be.visible')
            cy.get('#deceasedSpouseAge-25-64-span').should('have.text', content.ageRange2).and('be.visible')
            cy.get('#deceasedSpouseAge-over65-span').should('have.text', content.ageRange3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not display yet
            // Every option displays the number of dependents option
            cy.get('[data-testid="deceasedSpouseAge-input-under24"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="deceasedSpouseAge-input-age-25-64"]')
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="deceasedSpouseAge-input-over65"]')
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            
        })
    })
    it('Spouse Age Deceased Question - NON-ARPA', () => {
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
        cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
        cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.visible')

        // Spouse questions should display when taxpayer's age is "64 and Over" (Not qualifying age)
        cy.get('[data-testid="stepIndicatorStep1"]').click()
        cy.get('[data-testid="age-2023-over65"]').click()
        cy.get('[data-testid="nextButton"]').click()
        cy.get('[data-testid="wasSpouseAliveEndOfYear-no"]').click()
        cy.get('[data-testid="deceasedSpouseAge-label"]').should('be.visible')

        // Question
        cy.get('[data-testid="deceasedSpouseAge-label"]').should('have.text', content.filingStatus.deceasedSpouseAge).and('be.visible')
            
        // Helptip
        cy.get('[data-testid="deceasedSpouseAgeHelpTip"]').should('not.exist')
            
        // Radio buttons
        cy.get('#deceasedSpouseAge-under24-span').should('have.text', content.ageRange1).and('be.visible')
        cy.get('#deceasedSpouseAge-25-64-span').should('have.text', content.ageRange2).and('be.visible')
        cy.get('#deceasedSpouseAge-over65-span').should('have.text', content.ageRange3).and('be.visible')
        cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
        cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question should not display yet
        // When user selects "24 and under", the Number of Dependents question should display
        cy.get('[data-testid="deceasedSpouseAge-input-under24"]').click()
        cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
        // When user selects "25-64", the Number of Dependents question should display
        cy.get('[data-testid="deceasedSpouseAge-input-age-25-64"]').click()
        cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
        // When user selects "65 and over", the Number of Dependents question should display
        cy.get('[data-testid="deceasedSpouseAge-input-over65"]').click()
        cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
        })
    })
    it('Deceased Spouses Age Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="spouseAge-errorListItem"]').should('have.text', content.error.deceasedSpouseAgeError).click()
            cy.get('[data-testid="spouseAge-error-message"]').should('have.text', content.error.deceasedSpouseAgeError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
