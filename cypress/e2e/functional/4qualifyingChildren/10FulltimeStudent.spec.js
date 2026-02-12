/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Child Relationship Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Naomi').and('be.visible')

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
            
            // Question
            cy.get('[data-testid="children.0.student-label"]').should('have.text', content.qualifyingChildren.fulltimeStudent).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.studentHelpTip"]').click()
            cy.get('[data-testid="studentTTHeading1"]').should('have.text', content.toolTip.ftStudentToolTipHeader1).and('be.visible')
            cy.get('[data-testid="studentTTParagraph1"]').should('have.text', content.toolTip.ftStudentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="studentTTParagraph2"]').should('have.text', content.toolTip.ftStudentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="studentTTHeading2"]').should('have.text', content.toolTip.ftStudentToolTipHeader2).and('be.visible')
            cy.get('[data-testid="studentTTParagraph3"]').should('have.text', content.toolTip.ftStudentToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="studentTTList0"]').should('have.text', content.toolTip.ftStudentToolTipList0).and('be.visible')
            cy.get('[data-testid="studentTTList1"]').should('have.text', content.toolTip.ftStudentToolTipList1).and('be.visible')
            cy.get('[data-testid="studentTTList2"]').should('have.text', content.toolTip.ftStudentToolTipList2).and('be.visible')
            cy.get('[data-testid="studentTTList3"]').should('have.text', content.toolTip.ftStudentToolTipList3).and('be.visible')
            cy.get('[data-testid="studentTTParagraph4"]').should('have.text', content.toolTip.ftStudentToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="studentTTList20"]').should('have.text', content.toolTip.ftStudentToolTipList00).and('be.visible')
            cy.get('[data-testid="studentTTList21"]').should('have.text', content.toolTip.ftStudentToolTipList01).and('be.visible')
            cy.get('[data-testid="studentTTList22"]').should('have.text', content.toolTip.ftStudentToolTipList02).and('be.visible')
            cy.get('[data-testid="studentTTParagraph5"]').should('have.text', content.toolTip.ftStudentToolTipParagraph5).and('be.visible')
            cy.get('[data-testid="studentTTLink1"]').should('have.attr', 'href', content.toolTip.ftStudentToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.studentHelpTip"]').click()
            cy.get('[data-testid="studentTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.student-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.student-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question -yes
            // When user selects "Yes", the SSN question should display
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.student-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Naomi').and('be.visible')
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
            cy.get('[id="children.0.childName"]').type('Tyra').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            // Parent Question
            cy.get('[data-testid="children.0.live51Pct-label"]').should('be.visible')
            cy.get('[data-testid="children.0.live51Pct-no"]').click()

            // Question - Home in the US more than half
            cy.get('[data-testid="us50Percent-label"]').should('have.text', content.qualifyingChildren.us51).and('be.visible')

            //Helptip
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            cy.get('[data-testid="us50PercentTTHeading1"]').should('have.text', content.toolTip.us51ToolTipHeader1).and('be.visible')
            cy.get('[data-testid="us50PercentTTParagraph1"]').should('have.text', content.toolTip.us51ToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="us50PercentTTHeading2"]').should('have.text', content.toolTip.us51ToolTipHeader2).and('be.visible')
            cy.get('[data-testid="us50PercentTTParagraph2"]').should('have.text', content.toolTip.us51ToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="us50PercentHelpTip"]').click()
            cy.get('[data-testid="us50PercentTTHeading1"]').should('be.not.visible')

            //Radio buttons
            cy.get('[data-testid="us50Percent-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="us50Percent-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="finalNoQcTitleHeading1"]').should('not.exist') // DQ Result for -yes
            cy.get('[data-testid="warningHeading"]').should('not.exist') // DQ alert for -no
            //When user selects "Yes", "Child is not qualifying" Result is dispalyed
            cy.get('[data-testid="us50Percent-yes"]').click()
            cy.get('[data-testid="finalNoQcTitleHeading1"]').should('have.text', content.qualifyingChildren.noQCFinalHeader1).and('be.visible')
            cy.get('[data-testid="noQcButCreditMessageParagraph1"]').should('have.text', content.qualifyingChildren.noQCFinalParagraph1).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Tyra').and('be.visible')
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
            cy.get('[id="children.0.childName"]').type('Chanel').and('be.visible')

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
            
            // Question
            cy.get('[data-testid="children.0.student-label"]').should('have.text', content.qualifyingChildren.fulltimeStudent).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.studentHelpTip"]').click()
            cy.get('[data-testid="studentTTHeading1"]').should('have.text', content.toolTip.ftStudentToolTipHeader1).and('be.visible')
            cy.get('[data-testid="studentTTParagraph1"]').should('have.text', content.toolTip.ftStudentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="studentTTParagraph2"]').should('have.text', content.toolTip.ftStudentToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="studentTTHeading2"]').should('have.text', content.toolTip.ftStudentToolTipHeader2).and('be.visible')
            cy.get('[data-testid="studentTTParagraph3"]').should('have.text', content.toolTip.ftStudentToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="studentTTList0"]').should('have.text', content.toolTip.ftStudentToolTipList0).and('be.visible')
            cy.get('[data-testid="studentTTList1"]').should('have.text', content.toolTip.ftStudentToolTipList1).and('be.visible')
            cy.get('[data-testid="studentTTList2"]').should('have.text', content.toolTip.ftStudentToolTipList2).and('be.visible')
            cy.get('[data-testid="studentTTList3"]').should('have.text', content.toolTip.ftStudentToolTipList3).and('be.visible')
            cy.get('[data-testid="studentTTParagraph4"]').should('have.text', content.toolTip.ftStudentToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="studentTTList20"]').should('have.text', content.toolTip.ftStudentToolTipList00).and('be.visible')
            cy.get('[data-testid="studentTTList21"]').should('have.text', content.toolTip.ftStudentToolTipList01).and('be.visible')
            cy.get('[data-testid="studentTTList22"]').should('have.text', content.toolTip.ftStudentToolTipList02).and('be.visible')
            cy.get('[data-testid="studentTTParagraph5"]').should('have.text', content.toolTip.ftStudentToolTipParagraph5).and('be.visible')
            cy.get('[data-testid="studentTTLink1"]').should('have.attr', 'href', content.toolTip.ftStudentToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.studentHelpTip"]').click()
            cy.get('[data-testid="studentTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.student-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.student-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question -yes
            // When user selects "Yes", the SSN question should display
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="children.0.student-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Chanel').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')
                         
        })
    })
    it('Home in US more than half DQ question Single - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Eva').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            // Parent Question
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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Eva').and('be.visible')
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
            cy.get('[id="children.0.childName"]').type('Toccara').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-input-age-19-23"]').click() // Select age under 18)
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.student-errorListItem"]').should('have.text', content.error.fulltimeStudentError).click()
            cy.get('[data-testid="children.0.student-error-message"]').should('have.text', content.error.fulltimeStudentError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
