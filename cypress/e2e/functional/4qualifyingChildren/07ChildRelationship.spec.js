/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Child Relationship Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Richard').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.relationship-label"]').should('have.text', content.qualifyingChildren.childRelationship).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.relationshipHelpTip"]').click()
            cy.get('[data-testid="relationshipTT1Heading1"]').should('have.text', content.toolTip.relationshipToolTipHeader1).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph1"]').should('have.text', content.toolTip.relationshipToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="relationshipTT1Heading2"]').should('have.text', content.toolTip.relationshipToolTipHeader2).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph2"]').should('have.text', content.toolTip.relationshipToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="relationshipTT1Heading3"]').should('have.text', content.toolTip.relationshipToolTipHeader3).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph3"]').should('have.text', content.toolTip.relationshipToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="relationshipTT1Heading4"]').should('have.text', content.toolTip.relationshipToolTipHeader4).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph4"]').should('have.text', content.toolTip.relationshipToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="children.0.relationshipHelpTip"]').click()
            cy.get('[data-testid="relationshipTT1Heading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').should('have.text', content.qualifyingChildren.child).and('be.visible')
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship2"]').should('have.text', content.qualifyingChildren.sibling).and('be.visible')
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship3"]').should('have.text', content.qualifyingChildren.grandchild).and('be.visible')
            cy.get('[data-testid="children.0.relationship-other"]').should('have.text', content.qualifyingChildren.none).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question, select -Child, Sibiling, or Grandchild
            // When user selects child's realationship child, sibling or grandchild, the SSN question should display
            cy.get('[data-testid="children.0.relationship-input-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            cy.get('[data-testid="children.0.relationship-input-qualifyingRelationship2"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            cy.get('[data-testid="children.0.relationship-input-qualifyingRelationship3"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When user selects "None of the above", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.relationship-other"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Richard').and('be.visible')
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
            cy.get('[id="children.0.childName"]').type('Dave').and('be.visible')

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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Dave').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Child Relationship Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Bernie').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
    
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.relationship-label"]').should('have.text', content.qualifyingChildren.childRelationship).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.relationshipHelpTip"]').click()
            cy.get('[data-testid="relationshipTT1Heading1"]').should('have.text', content.toolTip.relationshipToolTipHeader1).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph1"]').should('have.text', content.toolTip.relationshipToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="relationshipTT1Heading2"]').should('have.text', content.toolTip.relationshipToolTipHeader2).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph2"]').should('have.text', content.toolTip.relationshipToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="relationshipTT1Heading3"]').should('have.text', content.toolTip.relationshipToolTipHeader3).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph3"]').should('have.text', content.toolTip.relationshipToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="relationshipTT1Heading4"]').should('have.text', content.toolTip.relationshipToolTipHeader4).and('be.visible')
            cy.get('[data-testid="relationshipTT1Paragraph4"]').should('have.text', content.toolTip.relationshipToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="children.0.relationshipHelpTip"]').click()
            cy.get('[data-testid="relationshipTT1Heading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').should('have.text', content.qualifyingChildren.child).and('be.visible')
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship2"]').should('have.text', content.qualifyingChildren.sibling).and('be.visible')
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship3"]').should('have.text', content.qualifyingChildren.grandchild).and('be.visible')
            cy.get('[data-testid="children.0.relationship-other"]').should('have.text', content.qualifyingChildren.none).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question, select -Child, Sibiling, or Grandchild
            // When user selects child's realationship child, sibling or grandchild, the SSN question should display
            cy.get('[data-testid="children.0.relationship-input-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            cy.get('[data-testid="children.0.relationship-input-qualifyingRelationship2"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            cy.get('[data-testid="children.0.relationship-input-qualifyingRelationship3"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When user selects "None of the above", "Child does not qualify" message should display
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="children.0.relationship-other"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Bernie').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button            
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
            cy.get('[id="children.0.childName"]').type('Katt').and('be.visible')

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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Katt').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button            
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Child Relationship Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Eddie').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.relationship-errorListItem"]').should('have.text', content.error.childRelationshipError).click()
            cy.get('[data-testid="children.0.relationship-error-message"]').should('have.text', content.error.childRelationshipError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
