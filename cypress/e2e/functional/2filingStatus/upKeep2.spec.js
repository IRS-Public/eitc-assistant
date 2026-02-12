/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('House Upkeep 2 Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            
            // Question
            cy.get('[data-testid="houseUpkeep2-label"]').should('have.text', content.filingStatus.houseUpkeep2).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="houseUpkeep2HelpTip"]').click()
            cy.get('#houseUpkeep2-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('have.text', content.toolTip.upkeepToolTipHeading).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > [data-testid="upkeepHelpTipParagraph1"]').should('have.text', content.toolTip.upkeepToolTipParagraph1).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > [data-testid="upkeepHelpTipParagraph2"]').should('have.text', content.toolTip.upkeepToolTipParagraph2).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList0"]').should('have.text', content.toolTip.upkeepToolTipList0).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList1"]').should('have.text', content.toolTip.upkeepToolTipList1).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList2"]').should('have.text', content.toolTip.upkeepToolTipList2).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList3"]').should('have.text', content.toolTip.upkeepToolTipList3).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > [data-testid="upkeepHelpTipParagraph3"]').should('have.text', content.toolTip.upkeepToolTipParagraph3).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList20"]').should('have.text', content.toolTip.upkeepToolTipList20).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList21"]').should('have.text', content.toolTip.upkeepToolTipList21).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList22"]').should('have.text', content.toolTip.upkeepToolTipList22).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList23"]').should('have.text', content.toolTip.upkeepToolTipList23).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList24"]').should('have.text', content.toolTip.upkeepToolTipList24).and('be.visible')
            cy.get('#houseUpkeep2-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList25"]').should('have.text', content.toolTip.upkeepToolTipList25).and('be.visible')
            cy.get('[data-testid="houseUpkeep2HelpTip"]').click()
            cy.get('#houseUpkeep2-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="houseUpkeep2-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="houseUpkeep2-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="claimDependent1-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.not.visible') // next question
            // When user selects "Yes", the dependents 1 question displays
            cy.get('[data-testid="houseUpkeep2-yes"]').click()
            cy.get('[data-testid="claimDependent1-label"]').should('be.visible') 
            // When user selects "No", the House Upkeep 3 question displays
            cy.get('[data-testid="houseUpkeep2-no"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible') 
        })
    })
    it('House Upkeep 2 Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="houseUpkeep2-errorListItem"]').should('have.text', content.error.houseUpkeep2Error).click()
            cy.get('[data-testid="houseUpkeep2-error-message"]').should('have.text', content.error.houseUpkeep2Error)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
