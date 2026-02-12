/* eslint-disable max-len */

describe('Filing Status Page', () => {
    it('Live With Your Spouse Question - Path 1 Legally Seperated', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            
            // Question
            cy.get('[data-testid="liveWithSpouse-label"]').should('have.text', content.filingStatus.liveWithSpouse).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="liveWithSpouse-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="liveWithSpouse-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fsToolResultTitle-label"]').should('not.exist') // Filing Status Tool Results should not be visible
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.not.visible') // next question should not be visible
            cy.get('[data-testid="houseUpkeep1-label"]').should('be.not.visible') // next question should not be visible
            // When user selects "Yes", User should get Married Filing Seperately results and Legal Document question should display
            cy.get('[data-testid="liveWithSpouse-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfsResults).and('be.visible') 
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.visible') 
            // When user selects "No", the upkeep house 1 question should display
            cy.get('[data-testid="liveWithSpouse-no"]').click()
            cy.get('[data-testid="houseUpkeep1-label"]').should('be.visible')
        })
    })
    it('Live With Your Spouse Question - Path 2 Widow', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-no"]').click()
            
            // Question
            cy.get('[data-testid="liveWithSpouse-label"]').should('have.text', content.filingStatus.liveWithSpouse).and('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="liveWithSpouse-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="liveWithSpouse-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fsToolResultTitle-label"]').should('not.exist') // Filing Status Tool Results should not be visible
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.not.visible') // next question should not be visible
            cy.get('[data-testid="houseUpkeep1-label"]').should('be.not.visible') // next question should not be visible
            // When user selects "Yes", User should get Married Filing Seperately results and Legal Document question should display
            cy.get('[data-testid="liveWithSpouse-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfsResults).and('be.visible') 
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.visible') 
            // When user selects "No", the upkeep house 1 question should display
            cy.get('[data-testid="liveWithSpouse-no"]').click()
            cy.get('[data-testid="houseUpkeep1-label"]').should('be.visible')
        })
    })
    it('Live With Your Spouse Question - NON-ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            
            // Question
            cy.get('[data-testid="liveWithSpouse-label"]').should('be.visible')
            
            // Radio buttons
            cy.get('[data-testid="liveWithSpouse-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="liveWithSpouse-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="fsToolResultTitle-label"]').should('not.exist') // Filing Status Tool Results should not be visible
            cy.get('[data-testid="mfsLegalDoc-label"]').should('exist') // only in ARPA flow
            cy.get('[data-testid="houseUpkeep1-label"]').should('be.not.visible') // next question should not be visible
            // When user selects "Yes", Were you legally seperated question appears
            cy.get('[data-testid="liveWithSpouse-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfsResults).and('be.visible') 
            cy.get('[data-testid="mfsLegalDoc-label"]').should('be.visible')
            cy.get('[data-testid="mfsLegalDoc-input-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.warningHeading)
            cy.get('[data-testid="mfsWarning-p1"]').should('have.text', content.error.mfsLegalDocWarning).and('be.visible')
            cy.get('[data-testid="mfsWarning-p4"]').should('have.text',content.error.mfsLegalDocWarning2).and('be.visible')
            cy.get('[data-testid="mfsWarning-a3"]').should('have.attr', 'href', content.error.mfsLegalDocWarningLink1).and('be.visible')
            // When user selects "No", the upkeep house 1 question should display
            cy.get('[data-testid="liveWithSpouse-no"]').click()
            cy.get('[data-testid="houseUpkeep1-label"]').should('be.visible')
        })
    })
    it('Live With Your Spouse Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="liveWithSpouse-errorListItem"]').should('have.text', content.error.liveWithSpouseError).click()
            cy.get('[data-testid="liveWithSpouse-error-message"]').should('have.text', content.error.liveWithSpouseError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
