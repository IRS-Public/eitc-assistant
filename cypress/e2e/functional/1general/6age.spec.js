/* eslint-disable max-len */

describe('General Page', () => {
    it('Age Question - NON ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()

            //Question
            cy.get('[data-testid="age-2023-label"]').should('have.text', content.general.age2023).and('be.visible')
            cy.get('[data-testid="age-2022-label"]').should('not.exist')//2022 Age should not be visible
            cy.get('[data-testid="ageHelpTip"]').should('not.exist')// No helptip

            //Radio buttons
            cy.get('[data-testid="age-2023-under24"]').should('have.text', content.ageRange1).and('be.visible')
            cy.get('[data-testid="age-2023-age-25-64"]').should('have.text', content.ageRange2).and('be.visible')
            cy.get('[data-testid="age-2023-over65"]').should('have.text', content.ageRange3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="student-label"]').should('not.exist') // for the next question
            cy.get('[data-testid="age-2023-under24"]').click()
            cy.get('[data-testid="age-2023-age-25-64"]').click()
            cy.get('[data-testid="age-2023-over65"]').click()
        
            // Switch year to 2021
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="confirmButton"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()

            //Question
            cy.get('[data-testid="age-2021-label"]').should('have.text', content.general.age2021).and('be.visible')
            cy.get('[data-testid="age-2022-label"]').should('not.exist')//2021 Age should not be visible
            cy.get('[data-testid="ageHelpTip"]').should('not.exist')// No helptip

            //Radio buttons
            cy.get('#age-17under-span').should('have.text', content.ageARPARange1).and('be.visible')
            cy.get('#age-18-span').should('have.text', content.ageARPARange2).and('be.visible')
            cy.get('#age-19-23-span').should('have.text', content.ageARPARange3).and('be.visible')
            cy.get('#age-24over-span').should('have.text', content.ageARPARange4).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="student-label"]').should('not.be.visible') // for the next question
            cy.get('[data-testid="age-2021-input-17under"]').click()
            cy.get('[data-testid="age-2021-input-18"]').click()
            cy.get('[data-testid="age-2021-input-19-23"]').click()
            cy.get('[data-testid="age-2021-input-24over"]').click()

        })
    })
    it('Age Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            
            // Question
            cy.get('[data-testid="age-2021-label"]').should('have.text', content.general.age2021).and('be.visible')
            cy.get('[data-testid="age-2022-label"]').should('not.exist') 
            cy.get('[data-testid="age-2023-label"]').should('not.exist') 

            // Helptip
            cy.get('[data-testid="spouseAgeHelpTip"]').should('not.exist')
            
            // Radio Buttons
            cy.get('[data-testid="age-2021-17under"]').should('have.text', content.ageARPARange1).and('be.visible')
            cy.get('[data-testid="age-2021-18"]').should('have.text', content.ageARPARange2).and('be.visible')
            cy.get('[data-testid="age-2021-19-23"]').should('have.text', content.ageARPARange3).and('be.visible')
            cy.get('[data-testid="age-2021-24over"]').should('have.text', content.ageARPARange4).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="student-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="qualifiedHomelessYouth-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="age-2021-17under"]').click()
            cy.get('[data-testid="age-2021-18"]').click()
            cy.get('[data-testid="qualifiedHomelessYouth-label"]').should('be.visible')
            cy.get('[data-testid="age-2021-19-23"]').click()
            cy.get('[data-testid="qualifiedHomelessYouth-label"]').should('be.visible')
            cy.get('[data-testid="age-2021-24over"]').click()
        })
    })
    it('Age Question Errors - NON ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
                    
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="age-errorListItem"]').should('have.text', content.error.ageError).click()
            cy.get('[data-testid="age-error-message"]').should('have.text', content.error.ageError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

            // Switch year to 2022
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="confirmButton"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
                    
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="age-errorListItem"]').should('have.text', content.error.ageError).click()
            cy.get('[data-testid="age-error-message"]').should('have.text', content.error.ageError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
    it('Age 2023 Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="age-errorListItem"]').should('have.text', content.error.ageError).click()
            cy.get('[data-testid="age-error-message"]').should('have.text', content.error.ageError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
