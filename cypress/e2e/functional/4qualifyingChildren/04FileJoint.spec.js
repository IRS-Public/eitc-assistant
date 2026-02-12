/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('File joint return Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.fileJoint-label"]').should('have.text', content.qualifyingChildren.fileJoint).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.fileJointHelpTip"]').click()
            cy.get('[data-testid="fileJointTTHeading1"]').should('have.text', content.toolTip.fileJointToolTipHeader).and('be.visible')
            cy.get('[data-testid="fileJointTTParagraph1"]').should('have.text', content.toolTip.fileJointToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="fileJointTTParagraph2"]').should('have.text', content.toolTip.fileJointToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="fileJointTTLink1"]').should('have.attr', 'href', content.toolTip.fileJointToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.fileJointHelpTip"]').click()
            cy.get('[data-testid="fileJointTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.fileJoint-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.fileJoint-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-label"]').should('be.not.visible') // next question -yes
            cy.get('[data-testid="children.0.permanentlyDisabled-label"]').should('be.not.visible') // next question -no
            // When user selects "Yes", the File Joint question should display
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-label"]').should('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').should('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-no"]').should('be.visible')  
            // When user selects "No", "Disabled Child" question should display
            cy.get('[data-testid="children.0.fileJoint-no"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-label"]').should('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').should('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').should('be.visible')
        })
    })
    it('File joint return Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.fileJoint-label"]').should('have.text', content.qualifyingChildren.fileJoint).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.fileJointHelpTip"]').click()
            cy.get('[data-testid="fileJointTTHeading1"]').should('have.text', content.toolTip.fileJointToolTipHeader).and('be.visible')
            cy.get('[data-testid="fileJointTTParagraph1"]').should('have.text', content.toolTip.fileJointToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="fileJointTTParagraph2"]').should('have.text', content.toolTip.fileJointToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="fileJointTTLink1"]').should('have.attr', 'href', content.toolTip.fileJointToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.fileJointHelpTip"]').click()
            cy.get('[data-testid="fileJointTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.fileJoint-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.fileJoint-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-label"]').should('be.not.visible') // next question -yes
            cy.get('[data-testid="children.0.permanentlyDisabled-label"]').should('be.not.visible') // next question -no
            // When user selects "Yes", the File Joint question should display
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-label"]').should('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').should('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-no"]').should('be.visible')  
            // When user selects "No", "Disabled Child" question should display
            cy.get('[data-testid="children.0.fileJoint-no"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-label"]').should('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').should('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').should('be.visible')
        })
    })
    it('File Joint Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.fileJoint-errorListItem"]').should('have.text', content.error.fileJointError).click()
            cy.get('[data-testid="children.0.fileJoint-error-message"]').should('have.text', content.error.fileJointError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
