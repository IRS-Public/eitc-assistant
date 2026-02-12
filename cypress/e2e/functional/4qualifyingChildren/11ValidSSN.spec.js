/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Child Relationship Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Lauryn').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('have.text', content.toolTip.validSSNHeader1).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph1"]').should('have.text', content.toolTip.validSSNParagraph1).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph2"]').should('have.text', content.toolTip.validSSNParagraph2).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph3"]').should('have.text', content.toolTip.validSSNParagraph3).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph4"]').should('have.text', content.toolTip.validSSNParagraph4).and('be.visible')
            cy.get('[data-testid="depHelpTipList0"]').should('have.text', content.toolTip.validSSNList0).and('be.visible')
            cy.get('[data-testid="depHelpTipList1"]').should('have.text', content.toolTip.validSSNList1).and('be.visible')
            cy.get('[data-testid="depHelpTipList2"]').should('have.text', content.toolTip.validSSNList2).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.validSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.validSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('not.exist') // QC results
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            // When user selects "No", "Valid QC Note" alert should display
            cy.get('[data-testid="children.0.validSSN-no"]').click()
            cy.get('[data-testid="qcValidSSNInfoHeading"]').should('have.text', content.qualifyingChildren.validQCAlertHeader1).and('be.visible')
            cy.get('[data-testid="qcValidSSNInfoP1"]').should('have.text', content.qualifyingChildren.validQCParagraph1).and('be.visible')
            
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Lauryn').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
        })
    })
    it('Child Relationship Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Nicki').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            
            // Question
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('have.text', content.toolTip.validSSNHeader1).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph1"]').should('have.text', content.toolTip.validSSNParagraph1).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph2"]').should('have.text', content.toolTip.validSSNParagraph2).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph3"]').should('have.text', content.toolTip.validSSNParagraph3).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph4"]').should('have.text', content.toolTip.validSSNParagraph4).and('be.visible')
            cy.get('[data-testid="depHelpTipList0"]').should('have.text', content.toolTip.validSSNList0).and('be.visible')
            cy.get('[data-testid="depHelpTipList1"]').should('have.text', content.toolTip.validSSNList1).and('be.visible')
            cy.get('[data-testid="depHelpTipList2"]').should('have.text', content.toolTip.validSSNList2).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.validSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.validSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('not.exist') // QC results
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            // When user selects "No", "Valid QC Note" alert should display
            cy.get('[data-testid="children.0.validSSN-no"]').click()
            cy.get('[data-testid="qcValidSSNInfoHeading"]').should('have.text', content.qualifyingChildren.validQCAlertHeader1).and('be.visible')
            cy.get('[data-testid="qcValidSSNInfoP1"]').should('have.text', content.qualifyingChildren.validQCParagraph1).and('be.visible')

            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Nicki').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
        })
    })
    it('Child Relationship Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Kim').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship3"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.validSSN-errorListItem"]').should('have.text', content.error.dependentSSNError).click()
            cy.get('[data-testid="children.0.validSSN-error-message"]').should('have.text', content.error.dependentSSNError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })

    it('Child Relationship User under 24 & dependent 19-23 Error', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Missy').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="stepIndicatorStep4"]').click()
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            // Child does not qualify warning should appear
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
        })
    })
})
