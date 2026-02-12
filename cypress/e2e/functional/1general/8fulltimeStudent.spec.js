/* eslint-disable max-len */

// Question only displays with ARPA flow

describe('General Page', () => {
    it('Fulltime Student Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-19-23"]').click()
            cy.get('[data-testid="qualifiedHomelessYouth-no"]').click()
            
            // Question
            cy.get('[data-testid="student-label"]').should('have.text', content.general.student).and('be.visible')

            // Helptip
            cy.get('[data-testid="studentHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="studentHelpTipHeading1"]').should('have.text', content.toolTip.studentToolTipHeader).and('be.visible')
            cy.get('[data-testid="studentHelpTipParagraph1"]').should('have.text', content.toolTip.studentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipParagraph2"]').should('have.text', content.toolTip.studentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseStudentHelpTipLink1"]').should('have.attr', 'href', content.toolTip.studentToolTipLink1).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="student-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="student-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="student-yes"]').click()
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="student-no"]').click()
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            
            //Fulltime student question scenario
            cy.get('[data-testid="student-label"]').should('be.visible')
            cy.get('[data-testid="age-2021-17under"]').click()
            cy.get('[data-testid="student-label"]').should('not.be.visible')//Fulltime student not showing
            cy.get('[data-testid="age-2021-18"]').click()
            cy.get('[data-testid="student-label"]').should('not.be.visible')//Fulltime student not showing

        })
    })
    it('Fulltime Student Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2021-19-23"]').click()
            cy.get('[data-testid="qualifiedHomelessYouth-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="student-errorListItem"]').should('have.text', content.error.studentError).click()
            cy.get('[data-testid="student-error-message"]').should('have.text', content.error.studentError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
