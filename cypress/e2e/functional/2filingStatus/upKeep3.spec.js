/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('House Upkeep 3 Question - Path 1 Widow', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-no"]').click()
            
            // Question
            cy.get('[data-testid="houseUpkeep3-label"]').should('have.text', content.filingStatus.houseUpkeep3).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="houseUpkeep3HelpTip"]').click()
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('have.text', content.toolTip.upkeepToolTipHeading).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph1"]').should('have.text', content.toolTip.upkeepToolTipParagraph1).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph2"]').should('have.text', content.toolTip.upkeepToolTipParagraph2).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList0"]').should('have.text', content.toolTip.upkeepToolTipList0).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList1"]').should('have.text', content.toolTip.upkeepToolTipList1).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList2"]').should('have.text', content.toolTip.upkeepToolTipList2).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList3"]').should('have.text', content.toolTip.upkeepToolTipList3).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph3"]').should('have.text', content.toolTip.upkeepToolTipParagraph3).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList20"]').should('have.text', content.toolTip.upkeepToolTipList20).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList21"]').should('have.text', content.toolTip.upkeepToolTipList21).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList22"]').should('have.text', content.toolTip.upkeepToolTipList22).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList23"]').should('have.text', content.toolTip.upkeepToolTipList23).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList24"]').should('have.text', content.toolTip.upkeepToolTipList24).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList25"]').should('have.text', content.toolTip.upkeepToolTipList25).and('be.visible')
            cy.get('[data-testid="houseUpkeep3HelpTip"]').click()
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="houseUpkeep3-dependent"]').should('have.text', content.filingStatus.houseUpkeep3Dependent).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-spousesChild"]').should('have.text', content.filingStatus.houseUpkeep3SpousesChild).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-parent"]').should('have.text', content.filingStatus.houseUpkeep3Parent).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-none"]').should('have.text', content.filingStatus.houseUpkeep3None).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            // When user selects Dependent, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-dependent"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects Spouse's Child, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-spousesChild"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects Parent, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-parent"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "None", FS Tool determines status is Single, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-none"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.singleResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
        })
    })
    it('House Upkeep 3 Question - Path 2 Divorced', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-divorced"]').click()
            
            // Question
            cy.get('[data-testid="houseUpkeep3-label"]').should('have.text', content.filingStatus.houseUpkeep3).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="houseUpkeep3HelpTip"]').click()
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('have.text', content.toolTip.upkeepToolTipHeading).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph1"]').should('have.text', content.toolTip.upkeepToolTipParagraph1).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph2"]').should('have.text', content.toolTip.upkeepToolTipParagraph2).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList0"]').should('have.text', content.toolTip.upkeepToolTipList0).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList1"]').should('have.text', content.toolTip.upkeepToolTipList1).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList2"]').should('have.text', content.toolTip.upkeepToolTipList2).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList3"]').should('have.text', content.toolTip.upkeepToolTipList3).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph3"]').should('have.text', content.toolTip.upkeepToolTipParagraph3).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList20"]').should('have.text', content.toolTip.upkeepToolTipList20).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList21"]').should('have.text', content.toolTip.upkeepToolTipList21).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList22"]').should('have.text', content.toolTip.upkeepToolTipList22).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList23"]').should('have.text', content.toolTip.upkeepToolTipList23).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList24"]').should('have.text', content.toolTip.upkeepToolTipList24).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList25"]').should('have.text', content.toolTip.upkeepToolTipList25).and('be.visible')
            cy.get('[data-testid="houseUpkeep3HelpTip"]').click()
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="houseUpkeep3-dependent"]').should('have.text', content.filingStatus.houseUpkeep3Dependent).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-spousesChild"]').should('have.text', content.filingStatus.houseUpkeep3SpousesChild).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-parent"]').should('have.text', content.filingStatus.houseUpkeep3Parent).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-none"]').should('have.text', content.filingStatus.houseUpkeep3None).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            // When user selects Dependent, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-dependent"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects Spouse's Child, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-spousesChild"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects Parent, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-parent"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "None", FS Tool determines status is Single, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-none"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.singleResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
        })
    })
    it('House Upkeep 3 Question - Path 3 Never Married', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-neverMarried"]').click()
            
            // Question
            cy.get('[data-testid="houseUpkeep3-label"]').should('have.text', content.filingStatus.houseUpkeep3).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="houseUpkeep3HelpTip"]').click()
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('have.text', content.toolTip.upkeepToolTipHeading).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph1"]').should('have.text', content.toolTip.upkeepToolTipParagraph1).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph2"]').should('have.text', content.toolTip.upkeepToolTipParagraph2).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList0"]').should('have.text', content.toolTip.upkeepToolTipList0).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList1"]').should('have.text', content.toolTip.upkeepToolTipList1).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList2"]').should('have.text', content.toolTip.upkeepToolTipList2).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(4) > [data-testid="upkeepHelpTipList3"]').should('have.text', content.toolTip.upkeepToolTipList3).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipParagraph3"]').should('have.text', content.toolTip.upkeepToolTipParagraph3).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList20"]').should('have.text', content.toolTip.upkeepToolTipList20).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList21"]').should('have.text', content.toolTip.upkeepToolTipList21).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList22"]').should('have.text', content.toolTip.upkeepToolTipList22).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList23"]').should('have.text', content.toolTip.upkeepToolTipList23).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList24"]').should('have.text', content.toolTip.upkeepToolTipList24).and('be.visible')
            cy.get('#houseUpkeep3-helpTip > :nth-child(6) > [data-testid="upkeepHelpTipList25"]').should('have.text', content.toolTip.upkeepToolTipList25).and('be.visible')
            cy.get('[data-testid="houseUpkeep3HelpTip"]').click()
            cy.get('#houseUpkeep3-helpTip > [data-testid="upkeepHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="houseUpkeep3-dependent"]').should('have.text', content.filingStatus.houseUpkeep3Dependent).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-spousesChild"]').should('have.text', content.filingStatus.houseUpkeep3SpousesChild).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-parent"]').should('have.text', content.filingStatus.houseUpkeep3Parent).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-none"]').should('have.text', content.filingStatus.houseUpkeep3None).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next question
            // When user selects Dependent, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-dependent"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects Spouse's Child, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-spousesChild"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects Parent, FS Tool determines status is HOH, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-parent"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.hohResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
            // When user selects "None", FS Tool determines status is Single, and the num of dependents question displays
            cy.get('[data-testid="houseUpkeep3-none"]').click()
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text', content.filingStatus.singleResults).and('be.visible') 
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible') 
        })
    })
    it('House Upkeep 3 Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-no"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="houseUpkeep3-errorListItem"]').should('have.text', content.error.houseUpkeep3Error).click()
            cy.get('[data-testid="houseUpkeep3-error-message"]').should('have.text', content.error.houseUpkeep3Error)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
