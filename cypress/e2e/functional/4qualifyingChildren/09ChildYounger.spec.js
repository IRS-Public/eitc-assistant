/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('Dependent younger Question Single', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageIncomeEligible()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Viola').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
               
            //Change age to Over 65
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-over65"]').click()
            cy.get('[data-testid="stepIndicatorStep4"]').click()
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click() // Select age 19 to 23
            
            // Question
            cy.get('[data-testid="children.0.younger-label"]').should('have.text', content.qualifyingChildren.dependentYounger).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerTTHeading1"]').should('have.text', content.toolTip.childYoungerToolTipHeader).and('be.visible')
            cy.get('[data-testid="youngerTTParagraph1"]').should('have.text', content.toolTip.childToolTipPargraph1).and('be.visible')
            cy.get('[data-testid="youngerTTParagraph2"]').should('have.text', content.toolTip.childToolTipPargraph2).and('be.visible')
            cy.get('[data-testid="youngerTTLink1"]').should('have.attr', 'href', content.toolTip.childToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.younger-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.younger-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.student-label"]').should('be.not.visible') // next question -yes
            // When user selects "Yes"", the fulltime student question should display
            cy.get('[data-testid="children.0.younger-yes"]').click()
            cy.get('[data-testid="children.0.student-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="children.0.younger-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Viola').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            
            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')
        })
    })
    it('Home in US more than half DQ question Single', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Regina').and('be.visible')

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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Regina').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Dependent younger Question MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageMFJ()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Kerry').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
               
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-input-age-Under18"]').click() // Select age under 18

            // Question
            cy.get('[data-testid="children.0.younger-label"]').should('have.text', content.qualifyingChildren.dependentYoungerMFJ).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerSpouseTTHeading1"]').should('have.text', content.toolTip.childYoungerToolTipHeaderMFJ).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTParagraph1"]').should('have.text', content.toolTip.childToolTipPargraphMFJ1).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTParagraph2"]').should('have.text', content.toolTip.childToolTipPargraph2).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTLink1"]').should('have.attr', 'href', content.toolTip.childToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerSpouseTTHeading1"]').should('be.not.visible')

            // Radio buttons
            cy.get('[data-testid="children.0.younger-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.younger-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.student-label"]').should('be.not.visible') // next question -yes
            // When user selects "Yes"", the valid SSN question should display
            cy.get('[data-testid="children.0.validSSN-label"]')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.0.younger-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Kerry').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')
        
        })
    })
    it('Home in US more than half DQ question MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageMFJ()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Taraji').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
                      
            //Change age to 25-64
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="stepIndicatorStep4"]').click()
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('20000')
            cy.get('[data-testid="nextButton"]').click()
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
            cy.get('[data-testid="noQcButCreditMessageParagraph1"]').should('have.text', content.qualifyingChildren.noQCFinalParagraph1).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Taraji').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Dependent younger Question Single - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Sanaa').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
                
            // go back and select 24 and under
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
            cy.get('[data-testid="children.0.age-age-Under18"]').click() // Select age under 18
            
            // Question
            cy.get('[data-testid="children.0.younger-label"]').should('have.text', content.qualifyingChildren.dependentYounger).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerTTHeading1"]').should('have.text', content.toolTip.childYoungerToolTipHeader).and('be.visible')
            cy.get('[data-testid="youngerTTParagraph1"]').should('have.text', content.toolTip.childToolTipPargraph1).and('be.visible')
            cy.get('[data-testid="youngerTTParagraph2"]').should('have.text', content.toolTip.childToolTipPargraph2).and('be.visible')
            cy.get('[data-testid="youngerTTLink1"]').should('have.attr', 'href', content.toolTip.childToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.younger-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.younger-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question -yes
            // When user selects "Yes"", SSN question should display
            cy.get('[data-testid="children.0.younger-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="children.0.younger-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Sanaa').and('be.visible')
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
             cy.get('[id="children.0.childName"]').type('Nia').and('be.visible')
 
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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Nia').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Dependent younger Question MFJ - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Gabrielle').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="stepIndicatorStep1"]').click() // Navigate to GI Page
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="filingStatus-married"]').click() //FS Page
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-input-under24"]').click()  
            cy.get('[data-testid="stepIndicatorStep4"]').click() // Navigate to QC Page
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-Under18"]').click() // Select age under 18
            
            // Question
            cy.get('[data-testid="children.0.younger-label"]').should('have.text', content.qualifyingChildren.dependentYoungerMFJ).and('be.visible')
            
            // Helptip
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerSpouseTTHeading1"]').should('have.text', content.toolTip.childYoungerToolTipHeaderMFJ).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTParagraph1"]').should('have.text', content.toolTip.childToolTipPargraphMFJ1).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTParagraph2"]').should('have.text', content.toolTip.childToolTipPargraph2).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTLink1"]').should('have.attr', 'href', content.toolTip.childToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerSpouseTTHeading1"]').should('be.not.visible')
            
            // Radio buttons
            cy.get('[data-testid="children.0.younger-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.0.younger-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.not.visible') // next question -yes
            // When user selects "Yes"", SSN question should display
            cy.get('[data-testid="children.0.younger-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="backButton"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="children.0.younger-no"]').click()
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Gabrielle').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            // Results page - No EITC Alert
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')
        })
    })
    it('Home in US more than half DQ question MFJ - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Phylicia').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')
            
            // Parent Question
            cy.get('[data-testid="stepIndicatorStep1"]').click() // Navigate to GI Page
            cy.get('[data-testid="age-2023-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()

            //cy.get('[data-testid="stepIndicatorStep2"]').click() // Navigate to FS
            cy.get('[data-testid="filingStatus-married"]').click() //FS Page
            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-input-under24"]').click() 
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear() // AGI Page
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('20000')
            cy.get('[data-testid="nextButton"]').click() 
            
            cy.get('[data-testid="children.0.live51Pct-yes"]').click() // QC Page
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-Under18"]').click() // Select age under 18
            cy.get('[data-testid="children.0.younger-no"]').click()

            // DQ Warning "Must be at least 25"
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child1 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')                 
            cy.get('[data-testid="childDisqualifiersAge-p1"]').should('have.text', content.error.noDependentsAgeWarningParagraph1).and('be.visible')

            
            cy.get('[data-testid="stepIndicatorStep1"]').click() // Navigate to GI Page
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="stepIndicatorStep4"]').click() // Navigate to QC Page
            cy.get('[data-testid="children.0.age-age-Over24"]').click()
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
            cy.get('[data-testid="noQcButCreditMessageParagraph1"]').should('have.text', content.qualifyingChildren.noQCFinalParagraph1).and('be.visible')
            cy.get('[id="accordionSubtitle0"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle
            //Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Phylicia').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button            
            // When user selects "No", "DQ Alert" message should display
            cy.get('[data-testid="us50Percent-no"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph0).and('be.visible')
        })
    })
    it('Dependent younger Question Error -Single', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageIncomeEligible()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Halle').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-input-age-Under18"]').click()
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.younger-errorListItem"]').should('have.text', content.error.dependentYoungerError).click()
            cy.get('[data-testid="children.0.younger-error-message"]').should('have.text', content.error.dependentYoungerError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')

        })
    })
    it('Dependent younger Question Error -MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageMFJ()
            //Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Angela').and('be.visible')

            //Cancel button
            cy.get('[aria-label="Cancel Child 1"]').should('have.text', 'Cancel').and('be.visible')

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-input-age-Under18"]').click() // Select age 19 to 23
            
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="children.0.younger-errorListItem"]').should('have.text', content.error.dependentYoungerError).click()
            cy.get('[data-testid="children.0.younger-error-message"]').should('have.text', content.error.dependentYoungerError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
