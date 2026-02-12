/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Accordion', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageIncomeEligible()
            cy.get('[data-testid="stepIndicatorStep2"]').click() //FS Page
            cy.get('[data-testid="numOfDependents-10"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="stepIndicatorStep4"]').click() //QC Page

                // Accordion Child 1
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Michael').and('be.visible')

            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-label"]').should('be.visible')
            cy.get('[id="child1-trigger"]').click() // Child 1
            cy.get('[data-testid="children.0.live51Pct-label"]').should('not.be.visible')
            cy.get('[id="child1-trigger"]').click()
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            // Child Qualifies
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Michael').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

               // Accordion Child 2
            cy.get('[id="child2-trigger"]').click() // Child 2
            //Accordion header
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.1.childName"]').type('Janet').and('be.visible')

            // Cancel button
            cy.get('[aria-label="Cancel Child 2"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[id="child2-trigger"]').click() // Child 2
            cy.get('[data-testid="children.1.live51Pct-label"]').should('not.be.visible')
            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-yes"]').click()
            cy.get('[data-testid="children.1.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.1.fileJoint-yes"]').click()
            cy.get('[data-testid="children.1.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.1.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.1.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.1.validSSN-yes"]').click()
            // Child Qualifies
            cy.get('#child2 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child2 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')            
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader2).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading1"]').should('have.text', 'Janet').and('be.visible')
            cy.get('[aria-label="Remove Child 2"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // Accordion Child 3
            //Accordion header
            cy.get('[id="child3-trigger"]').click() // Child 3
            cy.get('[id="accordionHeading2"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.2.childName"]').type('Tito').and('be.visible')

            // Cancel button
            cy.get('[aria-label="Cancel Child 3"]').should('have.text', 'Cancel').and('be.visible')
          
            cy.get('[id="child3-trigger"]').click() // Child 3
            cy.get('[data-testid="children.2.live51Pct-label"]').should('not.be.visible')
            cy.get('[id="child3-trigger"]').click()
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-yes"]').click()
            cy.get('[data-testid="children.2.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.2.fileJoint-yes"]').click()
            cy.get('[data-testid="children.2.fileJointConfirm-no"]').click()
            //Child does not qualify
            cy.get('#child3 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child3 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader2).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            cy.get('[id="accordionSubtitle2"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading2"]').should('have.text', 'Tito').and('be.visible')
            cy.get('[aria-label="Remove Child 3"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // Accordion Child 4
            //Accordion header
            cy.get('[id="child4-trigger"]').click() // Child 3
            cy.get('[id="accordionHeading3"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.3.childName"]').type('Joe').and('be.visible')

            // Cancel button
            cy.get('[aria-label="Cancel Child 4"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[id="child4-trigger"]').click() // Child 3
            cy.get('[data-testid="children.3.live51Pct-label"]').should('not.be.visible')
            cy.get('[id="child4-trigger"]').click()
            cy.get('[data-testid="children.3.live51Pct-yes"]').click()
            cy.get('[data-testid="children.3.claimOther-yes"]').click()
            cy.get('[data-testid="children.3.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.3.fileJoint-yes"]').click()
            cy.get('[data-testid="children.3.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.3.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.3.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.3.validSSN-yes"]').click()
            // Child Qualifies
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')            
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader3).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.maxFinalParagraph1).and('be.visible')
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading3"]').should('have.text', 'Joe').and('be.visible')
            cy.get('[aria-label="Remove Child 4"]').should('have.text', 'Remove child').and('be.visible') //remove child button

        })
    })

    it('Header, Cancel Button, Remove Button (Child Qualifies)', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Trinity').and('be.visible')
            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
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
            
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Trinity').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
        })
    })

    it('Header, Cancel Button, Remove Button (No Valid SSN)', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Summer').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.validSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('not.exist') // QC results
            // When user selects 'No', "Valid QC Note" alert displays
            cy.get('[data-testid="children.0.validSSN-no"]').click()
            cy.get('[data-testid="qcValidSSNInfoHeading"]').should('have.text', content.qualifyingChildren.validQCAlertHeader1).and('be.visible')
            cy.get('[data-testid="qcValidSSNInfoP1"]').should('have.text', content.qualifyingChildren.validQCParagraph1).and('be.visible')
            
            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Summer').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
        })
    })

    it('Header, Cancel Button, Remove Button (Child Does Not Qualify)', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Gabriella').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.validSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('not.exist') // QC results
            // When user selects 'No', "Valid QC Note" alert displays
            cy.get('[data-testid="children.0.validSSN-no"]').click()
            cy.get('[data-testid="qcValidSSNInfoHeading"]').should('have.text', content.qualifyingChildren.validQCAlertHeader1).and('be.visible')
            cy.get('[data-testid="qcValidSSNInfoP1"]').should('have.text', content.qualifyingChildren.validQCParagraph1).and('be.visible')
            
            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Gabriella').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
        })
    })

    it('Child Qualifies Alert', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Solana').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.validSSN-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('not.exist') // QC results
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Solana').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
        })
    })

    it('Child Does Not Qualify Alert/Sentence', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Victoria').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.live51Pct-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Victoria').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
        })
    })

    it('Cancel Adding a Child', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Naija').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()

            // Cancel child
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', content.qualifyingChildren.cancelButton).and('be.visible').click()

            // Accordion input clears
            cy.get('[id="children.0.childName"]').should('be.empty')
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('be.not.checked')
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.not.visible') // next question

        })
    })

    it('Editing Not Allowed Modal', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
                // CHILD 1 (Qualifies)
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Tionne').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Tionne').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child1-trigger"]').click() //close accordion

                // CHILD 2 (DNQ)
            // Accordion header
            cy.get('[id="child2-trigger"]').click()
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.1.childName"]').type('Crystal').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 2"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.1.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            cy.get('[data-testid="children.1.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.1.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.1.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.1.live51Pct-no"]').click()
            cy.get('#child2 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child2 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle1"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading1"]').should('have.text', 'Crystal').and('be.visible')
            cy.get('[aria-label="Remove Child 2"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child2-trigger"]').click() //close accordion

                // CHILD 3 (Qualifies)
            // Accordion header
            cy.get('[id="child3-trigger"]').click()
            cy.get('[id="accordionHeading2"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.2.childName"]').type('Rozonda').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 3"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.2.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-yes"]').click()
            cy.get('[data-testid="children.2.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.2.fileJoint-yes"]').click()
            cy.get('[data-testid="children.2.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.2.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.2.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.2.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.2.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.2.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.2.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.2.validSSN-yes"]').click()
            cy.get('#child3 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child3 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader2).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading2"]').should('have.text', 'Rozonda').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child3-trigger"]').click() //close accordion

                // CHILD 4 (Qualifies)
            // Accordion header
            cy.get('[id="child4-trigger"]').click()
            cy.get('[id="accordionHeading3"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.3.childName"]').type('Lisa').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 4"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.3.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.3.live51Pct-yes"]').click()
            cy.get('[data-testid="children.3.claimOther-yes"]').click()
            cy.get('[data-testid="children.3.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.3.fileJoint-yes"]').click()
            cy.get('[data-testid="children.3.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.3.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.3.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.3.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.3.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.3.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.3.validSSN-yes"]').click()
            cy.get('#child4 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child4 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader3).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.maxFinalParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading3"]').should('have.text', 'Lisa').and('be.visible')
            cy.get('[aria-label="Remove Child 4"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child4-trigger"]').click() //close accordion

            // Child 5 accordion should not exist
            cy.get('[id="accordionHeading4"]').should('not.exist')

            // CNQ edit attempt
            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-input-yes"]').click()

            // Editing not allowed modal displays
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="modal"] > div > .text-2xl').should('have.text', content.qualifyingChildren.editingNotAllowedModalTitle).and('be.visible')
            cy.get('[data-testid="modal"] > div > :nth-child(2)').should('have.text', content.qualifyingChildren.editingNotAllowedModalParagraph1).and('be.visible')
            cy.get('[data-testid="modal"] > div > :nth-child(3)').should('have.text', content.qualifyingChildren.editingNotAllowedModalParagraph2).and('be.visible')
            cy.get('[data-testid="closeButton"]').should('have.text', content.qualifyingChildren.editingNotAllowedModalClose).and('be.visible')
            //Close modal (x button)
            cy.get('[aria-label="Close Modal Button"]').should('be.visible').click()
            cy.get('[data-testid="modal"]').should('not.exist')
            //Close modal (close button)
            cy.get('[data-testid="children.1.live51Pct-input-yes"]').click()
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="closeButton"]').should('have.text', content.qualifyingChildren.editingNotAllowedModalClose).and('be.visible').click()
            cy.get('[data-testid="modal"]').should('not.exist')
        })
    })

    it('Remove a Child Modal', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Teyana').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            //cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            //cy.get('[data-testid="children.0.claimOther-label"]').should('be.not.visible') // next question
            //cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.live51Pct-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Teyana').and('be.visible')

            // Remove child modal
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible').click() //remove child button
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="modal"] > div > .text-2xl').should('have.text', 'Remove Teyana?').and('be.visible')
            cy.get('[data-testid="modal"] > div > .fade-in').should('have.text', content.qualifyingChildren.removeChildModalPararaph).and('be.visible')
            cy.get('[data-testid="cancelButton"]').should('have.text', content.qualifyingChildren.cancelButton).and('be.visible')  
            cy.get('[data-testid="removeChildButton"]').should('have.text', content.qualifyingChildren.removeChildModalButton).and('be.visible')  
            cy.get('[aria-label="Close Modal Button"]').should('be.visible')
            // Close button functionality
            cy.get('[aria-label="Close Modal Button"]').should('be.visible').click()
            cy.get('[data-testid="modal"]').should('not.exist')
            // Cancel button functionality
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible').click() //remove child button
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="cancelButton"]').click()
            cy.get('[data-testid="modal"]').should('not.exist')
            // Remove child modal button functionality
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible').click() //remove child button
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="removeChildButton"]').click()
            cy.get('[data-testid="modal"]').should('not.exist')
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible') //child 1 visible
        })
    })

    it('Remove a Child Modal (No Input for Childs Name)', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            
            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()

            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible') //cancel button

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
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            
            // Verify accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')

            // Remove child modal
            cy.get('[aria-label="Remove Child 1"]').should('have.text', content.qualifyingChildren.removeChildButton).and('be.visible').click() //remove child button
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="modal"] > div > .text-2xl').should('have.text', content.qualifyingChildren.removeChild).and('be.visible')
            cy.get('[data-testid="modal"] > div > .fade-in').should('have.text', content.qualifyingChildren.removeChildModalPararaph).and('be.visible')
            cy.get('[data-testid="cancelButton"]').should('have.text', content.qualifyingChildren.cancelButton).and('be.visible')  
            cy.get('[id="removeChildButton"]').should('have.text', content.qualifyingChildren.removeChildModalButton).and('be.visible')  
            cy.get('[aria-label="Close Modal Button"]').should('be.visible')
            // Close button functionality
            cy.get('[aria-label="Close Modal Button"]').should('be.visible').click()
            cy.get('[data-testid="modal"]').should('not.exist')
            // Cancel button functionality
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible').click() //remove child button
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="cancelButton"]').click()
            cy.get('[data-testid="modal"]').should('not.exist')
            // Remove child modal button functionality
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible').click() //remove child button
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="removeChildButton"]').click()
            cy.get('[data-testid="modal"]').should('not.exist')
        })
    })

    it('Child Successfully Removed', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Layton').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()

            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible') //cancel button

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
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')
            
            // Verify accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', 'Layton').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button 

            // Remove child modal
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible').click() //remove child button
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="modal"] > div > .text-2xl').should('have.text', 'Remove Layton?').and('be.visible')
            cy.get('[data-testid="modal"] > div > .fade-in').should('have.text', content.qualifyingChildren.removeChildModalPararaph).and('be.visible')
            cy.get('[data-testid="cancelButton"]').should('have.text', content.qualifyingChildren.cancelButton).and('be.visible')  
            cy.get('[id="removeChildButton"]').should('have.text', content.qualifyingChildren.removeChildModalButton).and('be.visible') 
            cy.get('[aria-label="Close Modal Button"]').should('be.visible')
            // Remove child from QC page
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="removeChildButton"]').click() //remove child modal button
            cy.get('[data-testid="modal"]').should('not.exist')

            // Child successfully removed message
            cy.get('[data-testid="childSuccessfullyRemoved"').should('be.visible')
            cy.get('[data-testid="childSuccessfullyRemovedHeading"]').should('have.text', content.qualifyingChildren.childSuccessfullyRemovedHeading).and('be.visible')  
            cy.get('[data-testid="childSuccessfullyRemovedBody"]').should('have.text', content.qualifyingChildren.childSuccessfullyRemovedBody).and('be.visible')
            // Alert should clear after interaction with accordion trigger, textbox or radio buttons
            cy.get('[id="children.0.childName"').click()
            cy.get('[data-testid="childSuccessfullyRemoved"').should('not.exist')
        })
    })

    it('Validation Error', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
                // CHILD 1
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Fenty').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-input-yes"]').click()
            // When user selects 'NEXT', validation errors display
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading).and('be.visible')
            cy.get('[data-testid="children.0.claimOther-errorListItem"]').should('have.text', content.error.claimOtherError).and('be.visible')
            cy.get('[data-testid="children.0.claimOther-error-message"]').should('have.text', content.error.claimOtherError).and('be.visible')
        })
    })

    it('Have Not Completed Adding a Child Modal', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
                // CHILD 1 (Qualifies)
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Giveon').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Giveon').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child1-trigger"]').click() //close accordion

                // CHILD 2 (DNQ)
            // Accordion header
            cy.get('[id="child2-trigger"]').click()
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.1.childName"]').type('Faiyaz').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 2"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.1.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.1.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.1.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.1.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            cy.get('[data-testid="children.1.live51Pct-input-yes"]').click()

            // Verify accordion header
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[aria-label="Cancel Child 2"]').should('have.text', 'Cancel').and('be.visible')

            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            //Child not completed modal
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="modal"]').should('be.visible')
            cy.get('[data-testid="modal"] > div > .text-2xl').should('have.text', content.qualifyingChildren.childNotCompleteHeader).and('be.visible')
            cy.get('[data-testid="modal"] > div > :nth-child(2)').should('have.text', content.qualifyingChildren.childNotCompleteParagraph).and('be.visible')
            cy.get('[data-testid="modal"] > div > :nth-child(3)').should('have.text', content.qualifyingChildren.childNotCompleteParagraph1).and('be.visible')
            cy.get('[data-testid="cancelButton"]').should('have.text', content.qualifyingChildren.childNotCompleteCancel).and('be.visible')
            cy.get('[data-testid="incompleteChildButton"]').should('have.text', content.qualifyingChildren.childNotCompleteNextStep).and('be.visible')
            // Close button functionality
            cy.get('[aria-label="Close Modal Button"]').should('be.visible').click()
            cy.get('[data-testid="modal"]').should('not.exist')
            // Cancel button functionality
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="cancelButton"]').click()
            cy.get('[data-testid="modal"]').should('not.exist')
                // Validation errors display
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading).and('be.visible')
            cy.get('[data-testid="children.1.claimOther-error-message"]').should('have.text', content.error.claimOtherError).and('be.visible')
            // Go to next step button functionality
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="incompleteChildButton"]').click()

            // Proceed to results page
            cy.get('[data-testid="resultsTitle"]').should('be.visible')
        })
    })

    it('3 Max Qualifying Children Limit', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
                // CHILD 1 (Qualifies)
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Blue').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.0.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child1 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Blue').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child1-trigger"]').click() //close accordion

                // CHILD 2 (DNQ)
            // Accordion header
            cy.get('[id="child2-trigger"]').click()
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.1.childName"]').type('Solange').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 2"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.1.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.1.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.1.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.1.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.1.live51Pct-no"]').click()
            cy.get('#child2 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child2 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle1"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading1"]').should('have.text', 'Solange').and('be.visible')
            cy.get('[aria-label="Remove Child 2"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child2-trigger"]').click() //close accordion

                // CHILD 3 (Qualifies)
            // Accordion header
            cy.get('[id="child3-trigger"]').click()
            cy.get('[id="accordionHeading2"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.2.childName"]').type('Giselle').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 3"]').should('have.text', 'Cancel').and('be.visible')
            
             // Question
             cy.get('[data-testid="children.2.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-yes"]').click()
            cy.get('[data-testid="children.2.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.2.fileJoint-yes"]').click()
            cy.get('[data-testid="children.2.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.2.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.2.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.2.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.2.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.2.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.2.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.2.validSSN-yes"]').click()
            cy.get('#child3 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child3 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader2).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading2"]').should('have.text', 'Giselle').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child3-trigger"]').click() //close accordion

                // CHILD 4 (Qualifies)
            // Accordion header
            cy.get('[id="child4-trigger"]').click()
            cy.get('[id="accordionHeading3"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.3.childName"]').type('Tina').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 4"]').should('have.text', 'Cancel').and('be.visible')

            // Question
            cy.get('[data-testid="children.3.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.3.live51Pct-yes"]').click()
            cy.get('[data-testid="children.3.claimOther-yes"]').click()
            cy.get('[data-testid="children.3.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.3.fileJoint-yes"]').click()
            cy.get('[data-testid="children.3.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.3.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.3.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.3.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.3.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.3.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.3.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.3.validSSN-yes"]').click()
            cy.get('#child4 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child4 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader3).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.maxFinalParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading3"]').should('have.text', 'Tina').and('be.visible')
            cy.get('[aria-label="Remove Child 4"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child4-trigger"]').click() //close accordion

            // Child 5 accordion doesn't exist
            cy.get('[id="accordionHeading4"]').should('not.exist')
        })
    })

    it('10 Max Accordion Display Limit (7 NQC & 3 QC)', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
                // CHILD 1
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Jennifer').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.0.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.live51Pct-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Jennifer').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child1-trigger"]').click() //close accordion

                // CHILD 2
            // Accordion header
            cy.get('[id="child2-trigger"]').click()
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.1.childName"]').type('Fantasia').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 2"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.1.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.1.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.1.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.1.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.1.live51Pct-no"]').click()
            cy.get('#child2 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child2 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle1"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading1"]').should('have.text', 'Fantasia').and('be.visible')
            cy.get('[aria-label="Remove Child 2"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child2-trigger"]').click() //close accordion

                // CHILD 3
            // Accordion header
            cy.get('[id="child3-trigger"]').click()
            cy.get('[id="accordionHeading2"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.2.childName"]').type('Jordin').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 3"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.2.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.2.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.2.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.2.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.2.live51Pct-no"]').click()
            cy.get('#child3 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child3 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle2"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading2"]').should('have.text', 'Jordin').and('be.visible')
            cy.get('[aria-label="Remove Child 3"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child3-trigger"]').click() //close accordion

                // CHILD 4
            // Accordion header
            cy.get('[id="child4-trigger"]').click()
            cy.get('[id="accordionHeading3"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.3.childName"]').type('Ruben').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 4"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.3.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.3.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.3.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.3.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.3.live51Pct-no"]').click()
            cy.get('#child4 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child4 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle3"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading3"]').should('have.text', 'Ruben').and('be.visible')
            cy.get('[aria-label="Remove Child 4"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child4-trigger"]').click() //close accordion

                // CHILD 5
            // Accordion header
            cy.get('[id="child5-trigger"]').click()
            cy.get('[id="accordionHeading4"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.4.childName"]').type('Malaya').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 5"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.4.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.4.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.4.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.4.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.4.live51Pct-no"]').click()
            cy.get('#child5 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child5 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle4"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading4"]').should('have.text', 'Malaya').and('be.visible')
            cy.get('[aria-label="Remove Child 5"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child5-trigger"]').click() //close accordion

                // CHILD 6
            // Accordion header
            cy.get('[id="child6-trigger"]').click()
            cy.get('[id="accordionHeading5"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.5.childName"]').type('Frenchie').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 6"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.5.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.5.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.5.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.5.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.5.live51Pct-no"]').click()
            cy.get('#child6 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child6 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle5"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading5"]').should('have.text', 'Frenchie').and('be.visible')
            cy.get('[aria-label="Remove Child 6"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child6-trigger"]').click() //close accordion

                // CHILD 7
            // Accordion header
            cy.get('[id="child7-trigger"]').click()
            cy.get('[id="accordionHeading6"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.6.childName"]').type('Melinda').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 7"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.6.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.6.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.6.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.6.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.6.live51Pct-no"]').click()
            cy.get('#child7 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child7 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle6"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading6"]').should('have.text', 'Melinda').and('be.visible')
            cy.get('[aria-label="Remove Child 7"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child7-trigger"]').click() //close accordion

                // CHILD 8 (Qualifies)
            // Accordion header
            cy.get('[id="child8-trigger"]').click()
            cy.get('[id="accordionHeading7"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.7.childName"]').type('Kimberley').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 8"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.7.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.7.live51Pct-yes"]').click()
            cy.get('[data-testid="children.7.claimOther-yes"]').click()
            cy.get('[data-testid="children.7.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.7.fileJoint-yes"]').click()
            cy.get('[data-testid="children.7.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.7.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.7.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.7.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.7.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.7.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.7.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.7.validSSN-yes"]').click()
            cy.get('#child8 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child8 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader1).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading7"]').should('have.text', 'Kimberley').and('be.visible')
            cy.get('[aria-label="Remove Child 8"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child8-trigger"]').click() //close accordion

                // CHILD 9 (Qualifies)
            // Accordion header
            cy.get('[id="child9-trigger"]').click()
            cy.get('[id="accordionHeading8"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.8.childName"]').type('Amber').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 9"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.8.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.8.live51Pct-yes"]').click()
            cy.get('[data-testid="children.8.claimOther-yes"]').click()
            cy.get('[data-testid="children.8.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.8.fileJoint-yes"]').click()
            cy.get('[data-testid="children.8.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.8.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.8.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.8.age-input-age-Under18"]').click() // Select 18 & under
            cy.get('[data-testid="children.8.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
            cy.get('[data-testid="children.8.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.8.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // When user selects "Yes", "Child qualifies" message and QC results should display
            cy.get('[data-testid="children.8.validSSN-yes"]').click()
            cy.get('#child9 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
            cy.get('#child9 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
            // QC based on your input
            cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader2).and('be.visible')
            cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.qcResultsParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading8"]').should('have.text', 'Amber').and('be.visible')
            cy.get('[aria-label="Remove Child 8"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child9-trigger"]').click() //close accordion

                // CHILD 10 (Qualifies)
            // Accordion header
            cy.get('[id="child10-trigger"]').click()
            cy.get('[id="accordionHeading9"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.9.childName"]').type('Candice').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 10"]').should('have.text', 'Cancel').and('be.visible')
            
           // Question
           cy.get('[data-testid="children.9.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
           // Radio buttons
           cy.get('[data-testid="children.9.live51Pct-yes"]').click()
           cy.get('[data-testid="children.9.claimOther-yes"]').click()
           cy.get('[data-testid="children.9.claimOtherConfirm-yes"]').click()
           cy.get('[data-testid="children.9.fileJoint-yes"]').click()
           cy.get('[data-testid="children.9.fileJointConfirm-yes"]').click()
           cy.get('[data-testid="children.9.permanentlyDisabled-no"]').click()
           cy.get('[data-testid="children.9.relationship-qualifyingRelationship1"]').click()
           cy.get('[data-testid="children.9.age-input-age-Under18"]').click() // Select 18 & under
           cy.get('[data-testid="children.9.validSSN-label"]').should('have.text', content.qualifyingChildren.dependentSSN).and('be.visible')
           cy.get('[data-testid="children.9.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
           cy.get('[data-testid="children.9.live51Pct-no"]').should('have.text', content.no).and('be.visible')
           cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
           cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
           // When user selects "Yes", "Child qualifies" message and QC results should display
           cy.get('[data-testid="children.9.validSSN-yes"]').click()
           cy.get('#child10 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertHeading"]').first().should('have.text', content.qualifyingChildren.childQualifies).and('be.visible')            
           cy.get('#child10 > [data-testid="childQualifiesAlert"] > .flex > :nth-child(2) > [data-testid="childQualifiesAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childQualifiesSubtitle).and('be.visible')
           // QC based on your input
           cy.get('[data-testid="finalBlockTitleHeading1"]').should('have.text', content.qualifyingChildren.qcResultsHeader3).and('be.visible')
           cy.get('[data-testid="finalBlockTitleParagraph1"]').should('have.text', content.qualifyingChildren.maxFinalParagraph1).and('be.visible')

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading9"]').should('have.text', 'Candice').and('be.visible')
            cy.get('[aria-label="Remove Child 9"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child10-trigger"]').click() //close accordion
        })
    })
})
