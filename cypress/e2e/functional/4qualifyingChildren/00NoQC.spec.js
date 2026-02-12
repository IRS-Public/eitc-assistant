/* eslint-disable max-len */

describe('Qualifying Children Page', () => {
    it('No Qualified Childern', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiNoDependents()
            // Header
            cy.get('[data-testid="qualifyingChildrenTitle"]').should('have.text', content.qualifyingChildren.title).and('be.visible')
            cy.get('[data-testid="noQCIntro"]').should('have.text', content.qualifyingChildren.noQCDependentsHeader).and('be.visible')
            cy.get('[data-testid="noQCParagraph"]').should('have.text', content.qualifyingChildren.noQCParagraph0).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-label"]').should('not.exist') // Lived with more than half question

            // Buttons
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            
        })
    })
    it('No Qualified Children - Non ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            // General Info Page
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
            // Filing Status
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-label"]').click()
            cy.get('[data-testid="numOfDependents-input-"]').click()
            cy.get('[data-testid="us50Percent-label"]').click()
            cy.get('[data-testid="us50Percent-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()
            // AGI
            cy.get('[data-testid="wagesFederalWithheldLabel"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('10000')
            cy.get('[data-testid="nextButton"]').click()

            // QC Page
            cy.get('[data-testid="qualifyingChildrenTitle"]').should('have.text', content.qualifyingChildren.title).and('be.visible')
            cy.get('[data-testid="noQCIntro"]').should('have.text', content.qualifyingChildren.noQCDependentsHeader).and('be.visible')
            cy.get('[data-testid="noQCParagraph"]').should('have.text', content.qualifyingChildren.noQCParagraph0).and('be.visible')
        })
    })

    it('You Dont Have Any Qualifying Children', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPageNonArpa()
                // CHILD 1
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Cyrus').and('be.visible')
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
            // Question visible
            cy.get('[data-testid="us50Percent-label"]').should('have.text', content.qualifyingChildren.us51).and('be.visible') //home in the US 50%

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading0"]').should('have.text', 'Cyrus').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[data-testid="warningHeading"]').should('not.exist') // NO QC message

                // CHILD 2
            // Accordion header
            cy.get('[id="child2-trigger"]').click()
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.1.childName"]').type('Twitch').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 2"]').should('have.text', 'Cancel').and('be.visible')
            
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
            cy.get('[id="accordionHeading1"]').should('have.text', 'Twitch').and('be.visible')
            cy.get('[aria-label="Remove Child 2"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[data-testid="warningHeading"]').should('not.exist') // NO QC message

            // Question visible
            cy.get('[data-testid="us50Percent-label"]').should('have.text', content.qualifyingChildren.us51).and('be.visible') //home in the US 50%
            cy.get('[data-testid="us50Percent-input-yes"]').click()

            // 'You don't have any qualifying children' message
            cy.get('[data-testid="finalNoQcTitleHeading1"]').should('have.text', content.qualifyingChildren.noQCFinalHeader1).and('be.visible')
            cy.get('[data-testid="noQcButCreditMessageParagraph1"]').should('have.text', content.qualifyingChildren.noQCFinalParagraph1).and('be.visible')
            cy.get('[data-testid="noQcButCreditMessageParagraph2"]').should('have.text', content.qualifyingChildren.noQCFinalParagraph2).and('be.visible')
            cy.get('[data-testid="nextButton"]').should('be.enabled')
        })
    })

    it('10 Max Non-Qualifying Children Limit', () => {
        cy.get('@contentJSON').then((content) => {
            cy.agiPage()
                // CHILD 1
            // Accordion header
            cy.get('[id="accordionHeading0"]').should('have.text', content.qualifyingChildren.accordionHeader).and('be.visible')
            cy.get('[id="children.0.childName"]').type('Dominique').and('be.visible')
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
            cy.get('[id="accordionHeading0"]').should('have.text', 'Dominique').and('be.visible')
            cy.get('[aria-label="Remove Child 1"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child1-trigger"]').click() //close accordion

                // CHILD 2
            // Accordion header
            cy.get('[id="child2-trigger"]').click()
            cy.get('[id="accordionHeading1"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.1.childName"]').type('Winnie').and('be.visible')
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
            cy.get('[id="accordionHeading1"]').should('have.text', 'Winnie').and('be.visible')
            cy.get('[aria-label="Remove Child 2"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child2-trigger"]').click() //close accordion

                // CHILD 3
            // Accordion header
            cy.get('[id="child3-trigger"]').click()
            cy.get('[id="accordionHeading2"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.2.childName"]').type('Yaya').and('be.visible')
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
            cy.get('[id="accordionHeading2"]').should('have.text', 'Yaya').and('be.visible')
            cy.get('[aria-label="Remove Child 3"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child3-trigger"]').click() //close accordion

                // CHILD 4
            // Accordion header
            cy.get('[id="child4-trigger"]').click()
            cy.get('[id="accordionHeading3"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.3.childName"]').type('Toccara').and('be.visible')
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
            cy.get('[id="accordionHeading3"]').should('have.text', 'Toccara').and('be.visible')
            cy.get('[aria-label="Remove Child 4"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child4-trigger"]').click() //close accordion

                // CHILD 5
            // Accordion header
            cy.get('[id="child5-trigger"]').click()
            cy.get('[id="accordionHeading4"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.4.childName"]').type('Camille').and('be.visible')
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
            cy.get('[id="accordionHeading4"]').should('have.text', 'Camille').and('be.visible')
            cy.get('[aria-label="Remove Child 5"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child5-trigger"]').click() //close accordion

                // CHILD 6
            // Accordion header
            cy.get('[id="child6-trigger"]').click()
            cy.get('[id="accordionHeading5"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.5.childName"]').type('Candace').and('be.visible')
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
            cy.get('[id="accordionHeading5"]').should('have.text', 'Candace').and('be.visible')
            cy.get('[aria-label="Remove Child 6"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child6-trigger"]').click() //close accordion

                // CHILD 7
            // Accordion header
            cy.get('[id="child7-trigger"]').click()
            cy.get('[id="accordionHeading6"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.6.childName"]').type('Isis').and('be.visible')
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
            cy.get('[id="accordionHeading6"]').should('have.text', 'Isis').and('be.visible')
            cy.get('[aria-label="Remove Child 7"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child7-trigger"]').click() //close accordion

                // CHILD 8
            // Accordion header
            cy.get('[id="child8-trigger"]').click()
            cy.get('[id="accordionHeading7"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.7.childName"]').type('Fatima').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 8"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.7.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.7.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.7.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.7.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.7.live51Pct-no"]').click()
            cy.get('#child8 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child8 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle7"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading7"]').should('have.text', 'Fatima').and('be.visible')
            cy.get('[aria-label="Remove Child 8"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child8-trigger"]').click() //close accordion

                // CHILD 9
            // Accordion header
            cy.get('[id="child9-trigger"]').click()
            cy.get('[id="accordionHeading8"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.8.childName"]').type('Jade').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 9"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.8.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.8.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.8.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.8.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.8.live51Pct-no"]').click()
            cy.get('#child9 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child9 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle8"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading8"]').should('have.text', 'Jade').and('be.visible')
            cy.get('[aria-label="Remove Child 8"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child9-trigger"]').click() //close accordion

                // CHILD 10
            // Accordion header
            cy.get('[id="child10-trigger"]').click()
            cy.get('[id="accordionHeading9"]').should('have.text', content.qualifyingChildren.addAnotherChildHeader).and('be.visible')
            cy.get('[id="children.9.childName"]').type('Eugena').and('be.visible')
            // Cancel button
            cy.get('[aria-label="Cancel Child 10"]').should('have.text', 'Cancel').and('be.visible')
            
            // Question
            cy.get('[data-testid="children.9.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            // Radio buttons
            cy.get('[data-testid="children.9.live51Pct-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="children.9.live51Pct-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="children.9.claimOther-label"]').should('be.not.visible') // next question
            cy.get('[data-testid="childDoesNotQualifyParagraph"]').should('not.exist') // dq message
            // When user selects "No", "Child does not qualify" message should display
            cy.get('[data-testid="children.9.live51Pct-no"]').click()
            cy.get('#child10 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertHeading"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualifyAlertHeader).and('be.visible')
            cy.get('#child10 > [data-testid="childDisqualifiedAlert"] > .flex > :nth-child(2) > [data-testid="childDisqualifiedAlertBody"] > [data-testid="childQualifiesParagraph"]').first().should('have.text', content.qualifyingChildren.childDoesNotQualify).and('be.visible')
            cy.get('[id="accordionSubtitle9"]').should('have.text', content.qualifyingChildren.childDoesNotQualifySubtitle).and('be.visible') // (does not qualify) subtitle

            // Verify accordion header (child's name)
            cy.get('[id="accordionHeading9"]').should('have.text', 'Eugena').and('be.visible')
            cy.get('[aria-label="Remove Child 9"]').should('have.text', 'Remove child').and('be.visible') //remove child button
            cy.get('[id="child10-trigger"]').click() //close accordion

            // 'You don't qualify for the EITC' Alert
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.qcDQHeader).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.qualifyingChildren.qcDQParagraph1).and('be.visible')
            cy.get('[data-testid="nextButton"]').should('be.not.enabled')
        })
    })
})
