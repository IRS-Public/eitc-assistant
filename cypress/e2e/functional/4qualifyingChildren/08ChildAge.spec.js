/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Child Age Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Shawn').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            
            // Question
            cy.get('[data-testid="children.0.age-label"]').should('have.text', content.qualifyingChildren.childAge).and('be.visible')
            
            // No Helptip

            // Radio buttons
            cy.get('[data-testid="children.0.age-age-Under18"]').should('have.text', content.qualifyingChildren.childAge1).and('be.visible')
            cy.get('[data-testid="children.0.age-age-19-23"]').should('have.text', content.qualifyingChildren.childAge2).and('be.visible')
            cy.get('[data-testid="children.0.age-age-Over24"]').should('have.text', content.qualifyingChildren.childAge3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question -18 and under

                // Tax Filer Age is 24 and over
            // When Filer age 24 or over user selects child's age 18 and under, SSN question should display
            cy.get('[data-testid="children.0.age-age-Under18"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When Filer age 24 or over user selects child's age Between 19 & 23, Student question should display
            cy.get('[data-testid="children.0.age-age-19-23"]').click()
            cy.get('[data-testid="children.0.student-label"]').should('be.visible')
            // When Filer age 24 or over user selects child's age 24 or over, DQ message displays 
            cy.get('[data-testid="children.0.age-age-Over24"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Shawn').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button

            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')
            
                //Tax Filer Age is Under 24
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click() // Change age on GI page
            cy.get('[data-testid="stepIndicatorStep4"]').click() // Navigate back to QC page
            // Filer between 19 & 23 selects child's age 18 and under, SSN question should display
            cy.get('[data-testid="children.0.age-age-Under18"]').click()
            cy.get('[data-testid="children.0.younger-input-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // Filer between 19 & 23 selects child's age between 19 & 23, Younger question should display
            cy.get('[data-testid="children.0.age-age-19-23"]').click()
            cy.get('[data-testid="children.0.younger-label"]').should('not.be.visible')
            // When Filer aged 24 or over selects child's age 24 or over, DQ message displays 
            cy.get('[data-testid="children.0.age-age-Over24"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Shawn').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // Results page
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')


        })
    })
    it('Home in US more than half DQ question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageIncomeEligible()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Dwayne').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
              
            //change age of tax payer to 25-64 and MFJ
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click() // Change age on GI page
            cy.get('[data-testid="stepIndicatorStep2"]').click()
            cy.get('[data-testid="filingStatus-input-married"]').click()
            cy.get('[data-testid="spouseValidSSN-input-yes"]').click()
            cy.get('[data-testid="stepIndicatorStep4"]').click() // Navigate back to QC page
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
            cy.get('[data-testid="us50Percent-label"]').should('have.text', content.qualifyingChildren.us51MFJ).and('be.visible')

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
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Dwayne').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Child Age Question - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Kendrick').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            
            // Question
            cy.get('[data-testid="children.0.age-label"]').should('have.text', content.qualifyingChildren.childAge).and('be.visible')
            
            // No Helptip

            // Radio buttons
            cy.get('[data-testid="children.0.age-age-Under18"]').should('have.text', content.qualifyingChildren.childAge1).and('be.visible')
            cy.get('[data-testid="children.0.age-age-19-23"]').should('have.text', content.qualifyingChildren.childAge2).and('be.visible')
            cy.get('[data-testid="children.0.age-age-Over24"]').should('have.text', content.qualifyingChildren.childAge3).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question -18 and under

                // Tax Filer Age is between 25 and 64
            // When Filer age is between 25 and 64 and user selects child's age 18 and under, SSN question should display
            cy.get('[data-testid="children.0.age-age-Under18"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When Filer is between 25 and 64 and user selects child's age Between 19 & 23, Student question should display
            cy.get('[data-testid="children.0.age-age-19-23"]').click()
            cy.get('[data-testid="children.0.student-label"]').should('be.visible')
            // When Filer is between 25 and 64 and user selects child's age 24 or over, DQ message displays 
            cy.get('[data-testid="children.0.age-age-Over24"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Kendrick').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()
            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            
                //Tax Filer Age is 24 and under
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-under24"]').click() // Change age on GI page
            cy.get('[data-testid="stepIndicatorStep4"]').click() // Navigate back to QC page
            // Filer Age is 24 and under and selects child's age 18 and under, Younger question should display
            cy.get('[data-testid="children.0.age-age-Under18"]').click()
            cy.get('[data-testid="children.0.younger-label"]').should('be.visible')
            // Filer Age is 24 and under and selects child's age between 19 & 23, Younger question should display
            cy.get('[data-testid="children.0.age-age-19-23"]').click()
            cy.get('[data-testid="children.0.younger-label"]').should('not.be.visible')
            // When Filer Age is 24 and under selects child's age 24 or over, DQ message displays 
            cy.get('[data-testid="children.0.age-age-Over24"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Kendrick').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')
        
                //Tax Filer Age 65 and older
            // Filer aged 65 and older selects child's age 18 and under, SSN question should display
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-over65"]').click() // Change age on GI page
            cy.get('[data-testid="stepIndicatorStep4"]').click() // Navigate back to QC page
            cy.get('[data-testid="children.0.age-age-Under18"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // Filer aged 65 and older selects child's age between 19 & 23, Student message displays
            cy.get('[data-testid="children.0.age-age-19-23"]').click()
            cy.get('[data-testid="children.0.younger-input-yes"]').click()
            cy.get('[data-testid="children.0.student-label"]').should('be.visible')
            // When Filer aged 65 and older selects child's age 24 or over, DQ message displays and/or Home in US question should display
            cy.get('[data-testid="children.0.age-age-Over24"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Kendrick').and('be.visible')
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
            cy.get('[id="children.0.childName"]').type('Jermaine').and('be.visible')

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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Jermaine').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button            
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Child Age Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Aubrey').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.age-errorListItem"]').should('have.text', content.error.childAgeError).click()
            cy.get('[data-testid="children.0.age-error-message"]').should('have.text', content.error.childAgeError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
