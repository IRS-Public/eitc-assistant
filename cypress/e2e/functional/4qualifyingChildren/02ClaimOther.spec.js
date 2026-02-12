/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Claimed by Other Question', () => {
        cy.get('@contentJSON').then((content) => { 
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Tia').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()

            // Question
            cy.get('[data-testid="children.0.claimOther-label"]').should('have.text', content.qualifyingChildren.claimOther).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.claimOtherHelpTip"]').click()
            cy.get('[data-testid="claimOtherTTHeading1"]').should('have.text', content.toolTip.claimOtherToolTipHeader).and('be.visible')
            cy.get('[data-testid="claimOtherTTParagraph1"]').should('have.text', content.toolTip.claimOtherToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimOtherTTParagraph2"]').should('have.text', content.toolTip.claimOtherToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimOtherTTLink1"]').should('have.attr', 'href', content.toolTip.claimOtherToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.claimOtherHelpTip"]').click()
            cy.get('[data-testid="claimOtherTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.claimOther-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.claimOther-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('be.not.visible') // next question -yes
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.not.visible') // next quesion -no
            // When user selects "Yes", "Confirm claimed child" question should display
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('be.visible')
            // When user selects "No", "File Joint" question should display
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.visible')

            //Verify accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            
        })
    })
    it('Claimed by Other Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Tamera').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible') //cancel button

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.claimOther-label"]').should('have.text', content.qualifyingChildren.claimOther).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.claimOtherHelpTip"]').click()
            cy.get('[data-testid="claimOtherTTHeading1"]').should('have.text', content.toolTip.claimOtherToolTipHeader).and('be.visible')
            cy.get('[data-testid="claimOtherTTParagraph1"]').should('have.text', content.toolTip.claimOtherToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimOtherTTParagraph2"]').should('have.text', content.toolTip.claimOtherToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimOtherTTLink1"]').should('have.attr', 'href', content.toolTip.claimOtherToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.claimOtherHelpTip"]').click()
            cy.get('[data-testid="claimOtherTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.claimOther-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.claimOther-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('be.not.visible') // next question -yes
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.not.visible') // next quesion -no
            // When user selects "Yes", "Confirm claimed child" question should display
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('be.visible')
            // When user selects "No", "File Joint" question should display
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.visible')

            //Verify accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            
        })
    })
    it('Claimed by Other Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.claimOther-errorListItem"]').should('have.text', content.error.claimOtherError).click()
            cy.get('[data-testid="children.0.claimOther-error-message"]').should('have.text', content.error.claimOtherError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
