/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('House Upkeep 1 Question - Path 1, married', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            cy.get('[data-testid="liveWithSpouse-no"]').click()
            
            // Question
            cy.get('[data-testid="houseUpkeep1-label"]').should('have.text', content.filingStatus.houseUpkeep1).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="houseUpkeep1HelpTip"]').click()
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('have.text', content.toolTip.upkeepToolTipHeading).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipParagraph1"]').should('have.text', content.toolTip.upkeepToolTipParagraph1).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipParagraph2"]').should('have.text', content.toolTip.upkeepToolTipParagraph2).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList0"]').should('have.text', content.toolTip.upkeepToolTipList0).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList1"]').should('have.text', content.toolTip.upkeepToolTipList1).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList2"]').should('have.text', content.toolTip.upkeepToolTipList2).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList3"]').should('have.text', content.toolTip.upkeepToolTipList3).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipParagraph3"]').should('have.text', content.toolTip.upkeepToolTipParagraph3).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList20"]').should('have.text', content.toolTip.upkeepToolTipList20).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList21"]').should('have.text', content.toolTip.upkeepToolTipList21).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList22"]').should('have.text', content.toolTip.upkeepToolTipList22).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList23"]').should('have.text', content.toolTip.upkeepToolTipList23).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList24"]').should('have.text', content.toolTip.upkeepToolTipList24).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList25"]').should('have.text', content.toolTip.upkeepToolTipList25).and('be.visible')
            cy.get('[data-testid="houseUpkeep1HelpTip"]').click()
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="houseUpkeep1-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="houseUpkeep1-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            // When user selects "Yes", FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep1-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", FS Tool determines status is MFS, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep1-no"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfsResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
        })
    })
    it('House Upkeep 1 Question - Path 2, widower', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            cy.get('[data-testid="liveWithSpouse-no"]').click()
            
            // Question
            cy.get('[data-testid="houseUpkeep1-label"]').should('have.text', content.filingStatus.houseUpkeep1).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="houseUpkeep1HelpTip"]').click()
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('have.text', content.toolTip.upkeepToolTipHeading).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipParagraph1"]').should('have.text', content.toolTip.upkeepToolTipParagraph1).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipParagraph2"]').should('have.text', content.toolTip.upkeepToolTipParagraph2).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList0"]').should('have.text', content.toolTip.upkeepToolTipList0).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList1"]').should('have.text', content.toolTip.upkeepToolTipList1).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList2"]').should('have.text', content.toolTip.upkeepToolTipList2).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList3"]').should('have.text', content.toolTip.upkeepToolTipList3).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipParagraph3"]').should('have.text', content.toolTip.upkeepToolTipParagraph3).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList20"]').should('have.text', content.toolTip.upkeepToolTipList20).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList21"]').should('have.text', content.toolTip.upkeepToolTipList21).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList22"]').should('have.text', content.toolTip.upkeepToolTipList22).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList23"]').should('have.text', content.toolTip.upkeepToolTipList23).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList24"]').should('have.text', content.toolTip.upkeepToolTipList24).and('be.visible')
            cy.get('#houseUpkeep1-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList25"]').should('have.text', content.toolTip.upkeepToolTipList25).and('be.visible')
            cy.get('[data-testid="houseUpkeep1HelpTip"]').click()
            cy.get('#houseUpkeep1-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="houseUpkeep1-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="houseUpkeep1-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            // When user selects "Yes", FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep1-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", FS Tool determines status is MFS, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep1-no"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfsResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
        })
    })
    it('House Upkeep 1 Question - NON ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            cy.get('[data-testid="liveWithSpouse-no"]').click()
            
            // Question
            cy.get('[data-testid="houseUpkeep1-label"]').should('be.visible')
            
            // Helptip
            cy.get('[data-testid="houseUpkeep1HelpTip"]').should('be.visible')

            // Radio buttons
            cy.get('[data-testid="houseUpkeep1-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="houseUpkeep1-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            // When user selects "Yes", FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep1-yes"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "No", FS Tool determines status is MFS, and a warning box displays
            cy.get('[data-testid="houseUpkeep1-no"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.mfsResults).and('be.visible')
        })
    })
    it('House Upkeep 1 Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-no"]').click()
            cy.get('[data-testid="liveWithSpouse-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="houseUpkeep1-errorListItem"]').should('have.text', content.error.houseUpkeep1Error).click()
            cy.get('[data-testid="houseUpkeep1-error-message"]').should('have.text', content.error.houseUpkeep1Error)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
