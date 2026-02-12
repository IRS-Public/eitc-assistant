/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('When did Spouse Pass Away Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            
            // Question
            cy.get('[data-testid="spousesPassing-label"]').should('have.text', content.filingStatus.spousesPassing).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="spousesPassingHelpTip"]').should('not.exist')
            
            // Radio buttons
            cy.get('[data-testid="spousesPassing-lastYear"]').should('have.text', content.filingStatus.spousesPassingLastYear).and('be.visible')
            cy.get('[data-testid="spousesPassing-last2Years"]').should('have.text', content.filingStatus.spousesPassingLast2Years).and('be.visible')
            cy.get('[data-testid="spousesPassing-3YearsPlus"]').should('have.text', content.filingStatus.spousesPassing3YearsPlus).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="intendJointReturnDeceased-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="entitledJointReturnDeceased-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.not.visible') // next question
            // When user selects "During 2021",intend to file joint with deceased question displays
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-label"]').should('be.visible') 
            // When user selects "During 2019 or 2020", were you entitled to file joint question displays
            cy.get('[data-testid="spousesPassing-last2Years"]').click() 
            cy.get('[data-testid="entitledJointReturnDeceased-label"]').should('be.visible') 
            // When user selects "Before 2019", House Upkeep 3 question displays
            cy.get('[data-testid="spousesPassing-3YearsPlus"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible')
        })
    })
    it('When did Spouse Pass Away Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="spousesPassing-errorListItem"]').should('have.text', content.error.spousesPassingError).click()
            cy.get('[data-testid="spousesPassing-error-message"]').should('have.text', content.error.spousesPassingError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
