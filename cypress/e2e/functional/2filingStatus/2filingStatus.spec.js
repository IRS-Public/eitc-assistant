/* eslint-disable max-len */


describe('Filing Status Page', () => {
    it('Filing Status Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            // Question
            cy.get('[data-testid="filingStatus-label"]').should('have.text', content.filingStatus.filingStatus).and('be.visible')
            // Helptip
            cy.get('[data-testid="filingStatusHelpTip"]').click()
            cy.get('[data-testid="filingStatusHelpTipHeading1"]').should('have.text', content.toolTip.filingStatusToolTipHeader).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph1"]').should('have.text', content.toolTip.filingStatusToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph2"]').should('have.text', content.toolTip.filingStatusToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipLink1"]').should('have.attr', 'href', content.toolTip.filingStatusToolTipLink1).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipHeading2"]').should('have.text', content.toolTip.filingStatusToolTipHeader2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph3"]').should('have.text', content.toolTip.filingStatusToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList0"]').should('have.text', content.toolTip.filingStatusToolTipList0).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList1"]').should('have.text', content.toolTip.filingStatusToolTipList1).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList2"]').should('have.text', content.toolTip.filingStatusToolTipList2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList3"]').should('have.text', content.toolTip.filingStatusToolTipList3).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList4"]').should('have.text', content.toolTip.filingStatusToolTipList4).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph4"]').should('have.text', content.toolTip.filingStatusToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipLink2"]').should('have.attr', 'href', content.toolTip.filingStatusToolTipLink2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTip"]').click()
            cy.get('[data-testid="filingStatusHelpTipHeading1"]').should('be.not.visible')
            // Radio buttons
            cy.get('[data-testid="filingStatus-single"]').should('have.text', content.filingStatus.single).and('be.visible')
            cy.get('[data-testid="filingStatus-head-Of-Household"]').should('have.text', content.filingStatus.hoh).and('be.visible')
            cy.get('[data-testid="filingStatus-widow"]').should('have.text', content.filingStatus.widow).and('be.visible')
            cy.get('[data-testid="filingStatus-married"]').should('have.text', content.filingStatus.mfj).and('be.visible')
            cy.get('[data-testid="filingStatus-married-Separate"]').should('have.text', content.filingStatus.mfs).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next questions should not be visible yet
            cy.get('[data-testid="spouseValidSSN-label"]').should('be.not.visible') // next questions should not be visible yet
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('be.not.visible') // next questions should not be visible yet
            cy.get('[data-testid="isMarriedHoH-label"]').should('be.not.visible') // next questions should not be visible yet
            
            // When user selects "Single", Number of Dependents question should display
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
             // When user selects "Head of Household", Number of Dependents question should display
            cy.get('[data-testid="filingStatus-head-Of-Household"]').click()
            cy.get('[data-testid="isMarriedHoH-label"]').should('be.visible')
            // When user selects"Qualifying Widow(er)", Number of Dependents question should display
            cy.get('[data-testid="filingStatus-widow"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
             // When user selects "MFJ", Spouse SSN question should display
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-label"]').should('be.visible')
             // When user selects "MFS", Legal Document question should display
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('be.visible')
        })
    })   
    it('Filing Status Question - NON-ARPA', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-yes"]').click()
            // Question
            cy.get('[data-testid="filingStatus-label"]').should('have.text', content.filingStatus.filingStatus).and('be.visible')
            // Helptip
            cy.get('[data-testid="filingStatusHelpTip"]').should('be.visible')
            // Radio buttons
            cy.get('[data-testid="filingStatus-single"]').should('have.text', content.filingStatus.single).and('be.visible')
            cy.get('[data-testid="filingStatus-head-Of-Household"]').should('have.text', content.filingStatus.hoh).and('be.visible')
            cy.get('[data-testid="filingStatus-widow"]').should('have.text', content.filingStatus.widow).and('be.visible')
            cy.get('[data-testid="filingStatus-married"]').should('have.text', content.filingStatus.mfj).and('be.visible')
            cy.get('[data-testid="filingStatus-married-Separate"]').should('have.text', content.filingStatus.mfs).and('be.visible')
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="numOfDependents-label"]').should('be.not.visible') // next questions should not be visible yet
            cy.get('[data-testid="spouseValidSSN-label"]').should('be.not.visible') // next questions should not be visible yet
            
            // When user selects "Single", Number of Dependents question should display
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
             // When user selects "Head of Household", Are you married appears, click no and Number of Dependents question should display
            cy.get('[data-testid="filingStatus-head-Of-Household"]').click()
            cy.get('[data-testid="isMarriedHoH-label"]').should('be.visible')
            cy.get('[data-testid="isMarriedHoH-input-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            // When user selects"Qualifying Widow(er)", Number of Dependents question should display
            cy.get('[data-testid="filingStatus-widow"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
             // When user selects "MFJ", Spouse SSN question should display
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="spouseValidSSN-label"]').should('be.visible')
            cy.get('[data-testid="spouseValidSSN-input-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
             // When user selects "MFS", You are your spouse principal residence question should appear
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('have.text', content.filingStatus.liveWithSpouse).and('be.visible')
            cy.get('[data-testid="liveApartFromSpouse-input-yes"]').click()
            cy.get('[data-testid="mfsLegalDoc-label"]').should('have.text', content.filingStatus.mfsLegalDoc).and('be.visible')
            cy.get('[data-testid="mfsLegalDoc-input-no"]').click()
            cy.get('[data-testid="mfsWarning-p1"]').should('have.text', content.error.mfsLegalDocWarning).and('be.visible')
            cy.get('[data-testid="mfsLegalDoc-input-yes"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="liveApartFromSpouse-input-no"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')

        })
    })
    it('Filing Status Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.generalPage()
            cy.get('[data-testid="fsKnown-yes"]').click()
            // Required
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="filingStatus-errorListItem"]').should('have.text', content.error.filingStatusError).click()
            cy.get('[data-testid="filingStatus-error-message"]').should('have.text', content.error.filingStatusError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
