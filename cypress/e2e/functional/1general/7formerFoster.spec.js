/* eslint-disable max-len */

// Question only displays with ARPA flow

describe('General Page', () => {
    it('Qualified Former Foster Youth Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-18"]').click()
            cy.get('[data-testid="qualifiedHomelessYouth-label"]').should('be.visible')
            
            // Question
            cy.get('[data-testid="qualifiedHomelessYouth-label"]').should('have.text', content.general.qualifiedHomelessYouth).and('be.visible')

            // Helptip
            cy.get('[data-testid="qualifiedHomelessYouthHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="qualifiedHomelessYouthHelpTipHeading1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader).and('be.visible')
            cy.get('[data-testid="qualifiedHomelessYouthHelpTipParagraph1"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="qualifiedHomelessYouthHelpTipHeading2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipHeader2).and('be.visible')
            cy.get('[data-testid="qualifiedHomelessYouthHelpTipParagraph2"]').should('have.text', content.toolTip.qualifiedHomelessYouthToolTipParagraph2).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="qualifiedHomelessYouth-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="qualifiedHomelessYouth-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="student-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="qualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="qualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            
            //Qualified Former Foster when taxpayer is 19-23 (Includes student question)
            cy.get('[data-testid="age-2021-19-23"]').click()
            cy.get('[data-testid="qualifiedHomelessYouth-label"]').should('be.visible')
            cy.get('[data-testid="qualifiedHomelessYouth-yes"]').click()
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="qualifiedHomelessYouth-no"]').click()
            cy.get('[data-testid="student-label"]').should('be.visible')
        })
    })
    it('Qualified Former Foster Youth Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-19-23"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="qualifiedHomelessYouth-errorListItem"]').should('have.text', content.error.qualifiedHomelessYouthError).click()
            cy.get('[data-testid="qualifiedHomelessYouth-error-message"]').should('have.text', content.error.qualifiedHomelessYouthError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
