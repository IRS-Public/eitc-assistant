/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Child Disabled Question', () => {
        cy.get('@contentJSON').then((content) => { 
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Wanda').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.permanentlyDisabled-label"]').should('have.text', content.qualifyingChildren.permanentlyDisabled).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.permanentlyDisabledHelpTip"]').click()
            cy.get('[data-testid="permanentlyDisabledTTHeading1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipHeader).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTParagraph1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTList0"]').should('have.text', content.toolTip.permanentlyDisabledToolTipList0).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTList1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipList1).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTParagraph2"]').should('have.text', content.toolTip.permanentlyDisabledToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTLink1"]').should('have.attr', 'href', content.toolTip.permanentlyDisabledToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabledHelpTip"]').click()
            cy.get('[data-testid="permanentlyDisabledTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.relationship-label"]').should('be.not.visible') // next question -yes or -no
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            // When user selects "Yes or NO", "Child relation" question should display
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.relationship-label"]').should('be.visible')
        })
    })
    it('Child Disabled Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('MoNique').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.permanentlyDisabled-label"]').should('have.text', content.qualifyingChildren.permanentlyDisabled).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.permanentlyDisabledHelpTip"]').click()
            cy.get('[data-testid="permanentlyDisabledTTHeading1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipHeader).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTParagraph1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTList0"]').should('have.text', content.toolTip.permanentlyDisabledToolTipList0).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTList1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipList1).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTParagraph2"]').should('have.text', content.toolTip.permanentlyDisabledToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTLink1"]').should('have.attr', 'href', content.toolTip.permanentlyDisabledToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabledHelpTip"]').click()
            cy.get('[data-testid="permanentlyDisabledTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.relationship-label"]').should('be.not.visible') // next question -yes or -no
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            // When user selects "Yes or NO", "Child relation" question should display
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.relationship-label"]').should('be.visible')
        })
    })
    it('Child Disabled Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Luenell').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.permanentlyDisabled-errorListItem"]').should('have.text', content.error.permanentlyDisabledError).click()
            cy.get('[data-testid="children.0.permanentlyDisabled-error-message"]').should('have.text', content.error.permanentlyDisabledError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
