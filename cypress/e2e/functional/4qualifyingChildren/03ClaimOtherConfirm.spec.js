/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Claimed by Other Confirm Question', () => {
        cy.get('@contentJSON').then((content) => { 
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Kyla').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('have.text', content.qualifyingChildren.claimOtherConfirm).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.claimOtherConfirmHelpTip"]').click()
            cy.get('[data-testid="claimOtherConfirmTTHeading1"]').should('have.text', content.toolTip.claimOtherToolTipHeader).and('be.visible')
            cy.get('[data-testid="claimOtherConfirmTTParagraph1"]').should('have.text', content.toolTip.claimOtherToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimOtherConfirmTTParagraph2"]').should('have.text', content.toolTip.claimOtherToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimOtherConfirmTTLink1"]').should('have.attr', 'href', content.toolTip.claimOtherToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirmHelpTip"]').click()
            cy.get('[data-testid="claimOtherConfirmTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirm-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.claimOtherConfirm-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Kyla').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // When user selects "Yes", the File Joint question should display
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.visible')
        })
    })
    it('Home in US more than half DQ question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Brandy').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Parent Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('be.visible')
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.visible')
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.visible')
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-label"]').should('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-no"]').click()

            // Question - Home in the US more than half
            cy.get('[data-testid="us50Percent-label"]').should('have.text', content.qualifyingChildren.us51).and('be.visible')

            // Helptip
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            cy.get('[data-testid="us50PercentTTHeading1"]').should('have.text', content.toolTip.us51ToolTipHeader1).and('be.visible')
            cy.get('[data-testid="us50PercentTTParagraph1"]').should('have.text', content.toolTip.us51ToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="us50PercentTTHeading2"]').should('have.text', content.toolTip.us51ToolTipHeader2).and('be.visible')
            cy.get('[data-testid="us50PercentTTParagraph2"]').should('have.text', content.toolTip.us51ToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            cy.get('[data-testid="us50PercentTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="us50Percent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="us50Percent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalNoQcTitleHeading1"]').should('not.exist') // DQ Result for -yes
            cy.get('[data-testid="warningHeading"]').should('not.exist') // DQ alert for -no
            // When user selects "Yes", "Child is not qualifying" Result is dispalyed
            cy.get('[data-testid="us50Percent-yes"]').click()
            cy.get('[data-testid="finalNoQcTitleHeading1"]').should('have.text', content.qualifyingChildren.noQCFinalHeader1).and('be.visible')
            cy.get('[data-testid="noQcButCreditMessageParagraph1"]').should('have.text', content.qualifyingChildren.noQCFinalParagraph1).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Brandy').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Claimed by Other Confirm Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Marsai').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')            

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-no"]').click()
            
            // Question
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('have.text', content.qualifyingChildren.claimOtherConfirm).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.claimOtherConfirmHelpTip"]').click()
            cy.get('[data-testid="claimOtherConfirmTTHeading1"]').should('have.text', content.toolTip.claimOtherToolTipHeader1).and('be.visible')
            cy.pause(50)
            cy.get('[data-testid="claimOtherConfirmTTParagraph1"]').should('have.text', content.toolTip.claimOtherToolTipParagraph).and('be.visible')
            cy.get('[data-testid="claimOtherConfirmTTParagraph2"]').should('have.text', content.toolTip.claimOtherToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="claimOtherConfirmTTLink1"]').should('have.attr', 'href', content.toolTip.claimOtherToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirmHelpTip"]').click()
            cy.get('[data-testid="claimOtherConfirmTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirm-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "Yes", the File Joint question should display
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-no"]').click()
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Marsai').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // When user selects "No", "Child does not qualify" message should display
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')

        })
    })
    it('Home in US more than half DQ question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Zendaya').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Parent Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('be.visible')
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.visible')
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-label"]').should('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirm-no"]').click()

            // Question - Home in the US more than half
            cy.get('[data-testid="us50Percent-label"]').should('have.text', content.qualifyingChildren.us51).and('be.visible')

            // Helptip
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            cy.get('[data-testid="us50PercentTTHeading1"]').should('have.text', content.toolTip.us51ToolTipHeader1).and('be.visible')
            cy.get('[data-testid="us50PercentTTParagraph1"]').should('have.text', content.toolTip.us51ToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="us50PercentTTHeading2"]').should('have.text', content.toolTip.us51ToolTipHeader2).and('be.visible')
            cy.get('[data-testid="us50PercentTTParagraph2"]').should('have.text', content.toolTip.us51ToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            cy.get('[data-testid="us50PercentTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="us50Percent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="us50Percent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalNoQcTitleHeading1"]').should('not.exist') // DQ Result for -yes
            cy.get('[data-testid="warningHeading"]').should('not.exist') // DQ alert for -no
            // When user selects "Yes", "Child is not qualifying" Result is dispalyed
            cy.get('[data-testid="us50Percent-yes"]').click()
            cy.get('[data-testid="finalNoQcTitleHeading1"]').should('have.text', content.qualifyingChildren.noQCFinalHeader1).and('be.visible')
            cy.get('[data-testid="noQcButCreditMessageParagraph1"]').should('have.text', content.qualifyingChildren.noQCFinalParagraph1).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Zendaya').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Claimed by Other Confirm Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Willow').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.claimOtherConfirm-errorListItem"]').should('have.text', content.error.claimOtherConfirmError).click()
            cy.get('[data-testid="children.0.claimOtherConfirm-error-message"]').should('have.text', content.error.claimOtherConfirmError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
