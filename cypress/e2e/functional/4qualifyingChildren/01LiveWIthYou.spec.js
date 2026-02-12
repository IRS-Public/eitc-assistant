/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Has Child Lived With You Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Anita').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
            cy.get('[data-testid="live51PctTTHeading1"]').should('have.text', content.toolTip.live51PctToolTipHeader).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph1"]').should('have.text', content.toolTip.live51PctToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="live51PctTTHeading2"]').should('have.text', content.toolTip.live51PctToolTipHeader2).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph2"]').should('have.text', content.toolTip.live51PctToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="live51PctTTHeading3"]').should('have.text', content.toolTip.live51PctToolTipHeader3).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph3"]').should('have.text', content.toolTip.live51PctToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="live51PctTTList0"]').should('have.text', content.toolTip.live51PctToolTipList0).and('be.visible')
            cy.get('[data-testid="live51PctTTList1"]').should('have.text', content.toolTip.live51PctToolTipList1).and('be.visible')
            cy.get('[data-testid="live51PctTTList2"]').should('have.text', content.toolTip.live51PctToolTipList2).and('be.visible')
            cy.get('[data-testid="live51PctTTList3"]').should('have.text', content.toolTip.live51PctToolTipList3).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph4"]').should('have.text', content.toolTip.live51PctToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="live51PctTTLink1"]').should('have.attr', 'href', content.toolTip.live51PctToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
            cy.get('[data-testid="live51PctTTHeading1"]').should('be.not.visible')

            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "Yes", "this child being claimed" by another question should display
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.live51Pct-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Anita').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')

        })
    })
    it('Home in US more than half DQ question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Whitney').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Parent Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').click()

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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Whitney').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Has Child Lived With You Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Kelly').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
            cy.get('[data-testid="live51PctTTHeading1"]').should('have.text', content.toolTip.live51PctToolTipHeader).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph1"]').should('have.text', content.toolTip.live51PctToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="live51PctTTHeading2"]').should('have.text', content.toolTip.live51PctToolTipHeader2).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph2"]').should('have.text', content.toolTip.live51PctToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="live51PctTTHeading3"]').should('have.text', content.toolTip.live51PctToolTipHeader3).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph3"]').should('have.text', content.toolTip.live51PctToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="live51PctTTList0"]').should('have.text', content.toolTip.live51PctToolTipList0).and('be.visible')
            cy.get('[data-testid="live51PctTTList1"]').should('have.text', content.toolTip.live51PctToolTipList1).and('be.visible')
            cy.get('[data-testid="live51PctTTList2"]').should('have.text', content.toolTip.live51PctToolTipList2).and('be.visible')
            cy.get('[data-testid="live51PctTTList3"]').should('have.text', content.toolTip.live51PctToolTipList3).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph4"]').should('have.text', content.toolTip.live51PctToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="live51PctTTLink1"]').should('have.attr', 'href', content.toolTip.live51PctToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
            cy.get('[data-testid="live51PctTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "Yes", "this child being claimed" by another question should display
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.live51Pct-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Kelly').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // AGI page
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()

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
            cy.get('[id="children.0.childName"]').type('Michelle').and('be.visible')
            
            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Parent Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').click()

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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Michelle').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Has Child Lived With You Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.live51Pct-errorListItem"]').should('have.text', content.error.live51PctError).click()
            cy.get('[data-testid="children.0.live51Pct-error-message"]').should('have.text', content.error.live51PctError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
