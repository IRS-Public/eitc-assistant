describe('Scenarios2022 Script', () => {

    it('Scenario 1 2022- Suzie MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            //Verifies General Page and FS Helptips, errors for skipped questions, dont qualify warnings
            //No Tax Year Error
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="year-errorListItem"]').should('have.text',content.error.yearError).and('be.visible')

            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="yearHelpTip"]').should('be.visible').click()

            //Year Helptip
            cy.get('[data-testid="yearToolTipHeader"]').should('have.text', content.toolTip.yearToolTipHeader).and('be.visible')
            cy.get('[data-testid="yearToolTipParagraph1"]').should('have.text', content.toolTip.yearToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="yearToolTipList0"]').should('have.text', content.toolTip.yearToolTipList0).and('be.visible')
            cy.get('[data-testid="yearToolTipList1"]').should('have.text', content.toolTip.yearToolTipList1).and('be.visible')
            cy.get('[data-testid="yearToolTipList2"]').should('have.text', content.toolTip.yearToolTipList2).and('be.visible')

            //Citizen not selected error
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="citizen-errorListItem"]').should('have.text', content.error.citizenError).and('be.visible')

            cy.get('[data-testid="citizen-no"]').click()//Citizen no error
            cy.get('[data-testid="warningHeading"]').should('have.text',content.error.warningHeading).and('be.visible')
            cy.get('[data-testid="citizen-yes"]').click()

            // Citizen Helptip
            cy.get('[data-testid="citizenHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="citizenToolTipHeader"]').should('have.text', content.toolTip.citizenToolTipHeader).and('be.visible')
            cy.get('[data-testid="citizenToolTipParagraph1"]').should('have.text', content.toolTip.citizenToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="citizenToolTipParagraph2"]').should('have.text', content.toolTip.citizenToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="citizenToolTipParagraph3"]').should('have.text', content.toolTip.citizenToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="citizenToolTipLink"]').should('have.attr', 'href', content.toolTip.citizenToolTipLink1).and('be.visible')

            // No Valid Social Error
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="validSSN-errorListItem"]').should('have.text',content.error.validSSNError).and('be.visible')

            cy.get('[data-testid="validSSN-yes"]').click()

            // ValidSSN Helptip
            cy.get('[data-testid="validSSNHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="validSSNToolTipHeader"]').should('have.text', content.toolTip.validSSNToolTipHeader).and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph1"]').should('contain', "2022").and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph2"]').should('have.text', content.toolTip.validSSNToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph3"]').should('have.text', content.toolTip.validSSNToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="validSSNToolTipParagraph4"]').should('have.text', content.toolTip.validSSNToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="validSSNToolTipList0"]').should('have.text', content.toolTip.validSSNToolTipList0).and('be.visible')
            cy.get('[data-testid="validSSNToolTipList1"]').should('have.text', content.toolTip.validSSNToolTipList1).and('be.visible')
            cy.get('[data-testid="validSSNToolTipList2"]').should('have.text', content.toolTip.validSSNToolTipList2).and('be.visible')
            
            //Foreign Income Error
            cy.get('[data-testid="foreignIncome-yes"]').click()
            cy.get('[data-testid="foreignIncomeWarning-p1"]').should('have.text', content.error.foreignIncomeDQParagraph1).and('be.visible')

            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="foreignIncomeHelpTip"]').should('be.visible').click()

            // Foreign Income Helptip
            cy.get('[data-testid="foreignIncomeToolTipHeader"]').should('have.text', content.toolTip.foreignIncomeToolTipHeader).and('be.visible')
            cy.get('[data-testid="foreignIncomeToolTipParagraph1"]').should('have.text', content.toolTip.foreignIncomeToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="foreignIncomeToolTipLink1"]').should('have.attr', 'href', content.toolTip.foreignIncomeToolTipLink1).and('be.visible')
            
            //Claim as dependent Error
            cy.get('[data-testid="claimedAsDependent-yes"]').click()
            cy.get('[data-testid="claimedAsDependentWarning-p1"]').should('have.text', content.error.claimedAsDependentDQParagraph1).and('be.visible')

            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="claimedAsDependentHelpTip"]').should('be.visible').click()

            // Claim as dependents Helptip
            cy.get('[data-testid="claimToolTipHeader"]').should('have.text', content.toolTip.claimToolTipHeader).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph1"]').should('have.text', content.toolTip.claimToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimToolTipList0"]').should('have.text', content.toolTip.claimToolTipList0).and('be.visible')
            cy.get('[data-testid="claimToolTipList1"]').should('have.text', content.toolTip.claimToolTipList1).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph2"]').should('have.text', content.toolTip.claimToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph3"]').should('have.text', content.toolTip.claimToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="claimToolTipParagraph4"]').should('have.text', content.toolTip.claimToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="claimToolTipLink1"]').should('have.attr', 'href', content.toolTip.claimToolTipLink1).and('be.visible')
            cy.get('[data-testid="claimToolTipLink2"]').should('have.attr', 'href', content.toolTip.claimToolTipLink2).and('be.visible')

            cy.get('[data-testid="age-2022-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()

            //FS Known Error
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="fsKnown-error-message"]').should('have.text',content.error.fsKnownError).and('be.visible')

            cy.get('[data-testid="fsKnown-yes"]').click()
        
            // No Filing Status Selected Error
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="filingStatus-error-message"]').should('have.text',content.error.filingStatusError).and('be.visible')

            //Checks each Filing Status 
            cy.get('[data-testid="filingStatus-input-single"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="filingStatus-input-head-Of-Household"]').click()
            cy.get('[data-testid="isMarriedHoH-label"]').should('have.text',content.filingStatus.isMarriedHoH).and('be.visible')
            cy.get('[data-testid="filingStatus-input-widow"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="filingStatus-input-married-Separate"]').click()
            cy.get('[data-testid="liveApartFromSpouse-label"]').should('contain','2022').and('be.visible')

            cy.get('[data-testid="filingStatus-married"]').click()

            // Filing Status Helptip
            cy.get('[data-testid="filingStatusHelpTip"]').click()
            cy.get('[data-testid="filingStatusHelpTipHeading1"]').should('have.text', content.toolTip.filingStatusToolTipHeader).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph1"]').should('have.text', content.toolTip.filingStatusToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph2"]').should('have.text', content.toolTip.filingStatusToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipLink1"]').should('have.attr', 'href', content.toolTip.filingStatusToolTipLink1).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipHeading2"]').should('have.text', content.toolTip.filingStatusToolTipHeader2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph3"]').should('contain', '2022').and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList0"]').should('have.text', content.toolTip.filingStatusToolTipList0).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList1"]').should('contain', '2022').and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList2"]').should('have.text', content.toolTip.filingStatusToolTipList2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList3"]').should('have.text', content.toolTip.filingStatusToolTipList3).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipList4"]').should('have.text', content.toolTip.filingStatusToolTipList4).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipParagraph4"]').should('have.text', content.toolTip.filingStatusToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipLink2"]').should('have.attr', 'href', content.toolTip.filingStatusToolTipLink2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTip"]').click()
            cy.get('[data-testid="filingStatusHelpTipHeading1"]').should('be.not.visible')

            //Spouse Social Error
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="spouseValidSSN-error-message"]').should('have.text',content.error.spouseValidSSNError).and('be.visible')

            cy.get('[data-testid="spouseValidSSN-yes"]').click()
            cy.get('[data-testid="spouseValidSSNHelpTip"]').click()

            //Spouse Valid SSN ToolTip
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').last().should('have.text', content.toolTip.spouseSSNToolTipHeading).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph1"]').last().should('contain', '2022').and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph2"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph3"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph4"]').last().should('have.text', content.toolTip.spouseSSNToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList0"]').last().should('have.text', content.toolTip.spouseSSNToolTipList0).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList1"]').last().should('have.text', content.toolTip.spouseSSNToolTipList1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList2"]').last().should('have.text', content.toolTip.spouseSSNToolTipList2).and('be.visible')
            cy.get('[data-testid="spouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').last().should('be.not.visible')

            //Spouse Alive Error
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="wasSpouseAliveEndOfYear-error-message"]').should('have.text', content.error.wasSpouseAliveEndOfYearError).and('be.visible')

            cy.get('[data-testid="wasSpouseAliveEndOfYear-yes"]').click()
            cy.get('[data-testid="spouseAge-input-under24"]').click()

            // NumOfDependents Helptip
            cy.get('[data-testid="numOfDependentsHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('have.text', content.toolTip.depToolTipHeader).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph1"]').should('have.text', content.toolTip.depToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="depHelpTipList0"]').should('have.text', content.toolTip.depToolTipList0).and('be.visible')
            cy.get('[data-testid="depHelpTipList1"]').should('have.text', content.toolTip.depToolTipList1).and('be.visible')
            cy.get('[data-testid="depHelpTipList2"]').should('have.text', content.toolTip.depToolTipList2).and('be.visible')
            cy.get('[data-testid="depHelpTipList3"]').should('have.text', content.toolTip.depToolTipList3).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph2"]').should('have.text', content.toolTip.depToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="depHelpTipParagraph3"]').should('have.text', content.toolTip.depToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="numOfDependents-a1"]').should('have.attr', 'href', content.toolTip.depToolTipLink1).and('be.visible')
            cy.get('[data-testid="numOfDependentsHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('be.not.visible')
            
            //Error - No dependents
            cy.get('[data-testid="numOfDependents-"]').click()
            cy.get('[data-testid="warningHeading"]').should('have.text',content.error.warningHeading).and('be.visible')
            cy.get('[data-testid="noDependentsAgeWarning-p3"]').should('have.text',content.error.noDependentsAgeWarningParagraph1)
        
            cy.get('[data-testid="numOfDependents-input-10"]').click() //1
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="agiTitle"]').should('be.visible')
            cy.get('[data-testid="nextButton"]').click()
            
            //Income required Error on AGI page
            cy.get('[data-testid="noIncome-error-message"]').should('have.text',content.error.agiNoIncomeError).and('be.visible')
            
            //Max Income Limit Error $49,622 max limit MFJ w/ 1 dependent
            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type(49622)
            //cy.get('[data-testid="earnedIncomeLimitWarningHeading"]').should('be.visible')        //update script to check for alert on the results page.
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type(49621)
            cy.get('[data-testid="earnedIncomeLimitWarningHeading"]').should('not.exist')

        })
    })
    it('Scenario 2 2022 - Cindy MFJ', () => {
        //AGI and QC Help Tips, errors
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-label"]').should('contain','2022').and('be.visible')
            
            // Marital Status Helptip
            cy.get('[data-testid="maritalStatusHelpTip"]').click()
            cy.get('[data-testid="maritalStatusHelpTipHeading1"]').should('have.text', content.toolTip.maritalStatusToolTipHeading).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTipParagraph1"]').should('have.text', content.toolTip.maritalStatusToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTipHeading2"]').should('have.text', content.toolTip.maritalStatusToolTipHeading2).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTipParagraph2"]').should('have.text', content.toolTip.maritalStatusToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="maritalStatusHelpTip"]').click()
            cy.get('[data-testid="maritalStatusHelpTipHeading1"]').should('be.not.visible')

            //Check All fsKnow-no Filing Status Options
            cy.get('[data-testid="maritalStatus-input-married"]').click()
            cy.get('[data-testid="fileJointReturn-label"]').should('be.visible')
            cy.get('[data-testid="maritalStatus-input-divorced"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible')
            cy.get('[data-testid="maritalStatus-input-neverMarried"]').click()
            cy.get('[data-testid="houseUpkeep3-label"]').should('be.visible')

            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()

            //Intend Joint Return Deceased HelpTip
            cy.get('[data-testid="intendJointReturnDeceasedHelpTip"]').click()
            cy.get('[data-testid="jointReturnDeceasedHelpTipHeading1"]').should('have.text', content.toolTip.jointReturnDeceasedHelpTipHeading1).and('be.visible')
            cy.get('[data-testid="jointReturnDeceasedHelpTipParagraph1"]').should('contain', '2022').and('be.visible')
            cy.get('[data-testid="intendJointReturnDeceasedHelpTip"]').click()
            cy.get('[data-testid="jointReturnDeceasedHelpTipHeading1"]').should('be.not.visible')

            cy.get('[data-testid="intendJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="deceasedSpouseValidSSN-yes"]').click()

            // Deceased Spouse Valid SSN Helptip
            cy.get('[data-testid="deceasedSpouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').first().should('have.text', content.toolTip.spouseSSNToolTipHeading).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph1"]').first().should('contain', '2022').and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph2"]').first().should('have.text', content.toolTip.spouseSSNToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph3"]').first().should('have.text', content.toolTip.spouseSSNToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipParagraph4"]').first().should('have.text', content.toolTip.spouseSSNToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList0"]').first().should('have.text', content.toolTip.spouseSSNToolTipList0).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList1"]').first().should('have.text', content.toolTip.spouseSSNToolTipList1).and('be.visible')
            cy.get('[data-testid="spouseSSNHelpTipList2"]').first().should('have.text', content.toolTip.spouseSSNToolTipList2).and('be.visible')
            cy.get('[data-testid="deceasedSpouseValidSSNHelpTip"]').click()
            cy.get('[data-testid="spouseSSNHelpTipHeading1"]').first().should('be.not.visible')

            //Deceased Spouse Age without dependent Errors
            cy.get('[data-testid="deceasedSpouseAge-input-over65"]').click()
            cy.get('[data-testid="numOfDependents-input-"]').click()
            cy.get('[data-testid="noDependentsAgeWarning-p3"]').should('have.text',content.error.noDependentsAgeWarningParagraph1).and('be.visible')
            cy.get('[data-testid="deceasedSpouseAge-input-age-25-64"]').click()
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="deceasedSpouseAge-input-under24"]').click()
            cy.get('[data-testid="numOfDependents-input-"]').click()
            cy.get('[data-testid="noDependentsAgeWarning-p3"]').should('have.text',content.error.noDependentsAgeWarningParagraph1).and('be.visible')

            cy.get('[data-testid="numOfDependents-10"]').click() //2
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="agiTitle"]').should('be.visible')

            //2022 visible on AGI page
            cy.get('[data-testid="agiParagraph2"]').should('contain', '2022').and('be.visible')
            cy.get('[for="earnedIncome"] > .font-bold').should('contain', '2022').and('be.visible')
            cy.get('[for="unearnedIncome"] > .font-bold').should('contain', '2022').and('be.visible')
            cy.get('[for="adjustments"] > .font-bold').should('contain', '2022').and('be.visible')

            //AGI Help Tip Header Verification
            cy.get('[data-testid="wagesFederalWithheld-helpTip"]').click()//Wage withheld
            cy.get('[data-testid="wagesToolTipHeader1"]').should('have.text',content.toolTip.wagesWithheldToolTipHeader1).and('be.visible')
            cy.get('[data-testid="wagesFederalWithheld-helpTip"]').click()
            cy.get('[data-testid="federalIncomeNotWithheld-helpTip"]').click()//Income not withheld
            cy.get('[data-testid="FINWToolTipHeader1"]').should('have.text',content.toolTip.incomeTaxesNotWithheldToolTipHeader).and('be.visible')
            cy.get('[data-testid="federalIncomeNotWithheld-helpTip"]').click()
            cy.get('[data-testid="selfEmploymentGross-helpTip"]').click()//Self employment
            cy.get('[data-testid="selfEmploymentGrossToolTipHeader1"]').should('have.text',content.toolTip.selfEmploymentGrossToolTipHeader).and('be.visible')
            cy.get('[data-testid="selfEmploymentGross-helpTip"]').click()
            cy.get('[data-testid="disabilityRetirement-helpTip"]').click()//Disability
            cy.get('[data-testid="disabilityRetirementToolTipHeader1"]').should('have.text',content.toolTip.retirementDisabilityToolTipHeader).and('be.visible')
            cy.get('[data-testid="disabilityRetirement-helpTip"]').click()
            cy.get('[data-testid="foreignEarnedIncome-helpTip"]').click()//Foreign Income
            cy.get('[data-testid="foreignEarnedIncomeToolTipHeader1"]').should('have.text',content.toolTip.foreignToolTipHeader1).and('be.visible')
            cy.get('[data-testid="foreignEarnedIncome-helpTip"]').click()
            cy.get('[data-testid="prisonIncome-helpTip"]').click()//Prison Income
            cy.get('[data-testid="prisonIncomeToolTipHeader1"]').should('have.text',content.toolTip.prisonToolTipHeader1).and('be.visible')
            cy.get('[data-testid="prisonIncome-helpTip"]').click()
            cy.get('[data-testid="pension-helpTip"]').click()//Taxable Pension
            cy.get('[data-testid="pensionToolTipHeader1"]').should('have.text',content.toolTip.pensionToolTipHeader).and('be.visible')
            cy.get('[data-testid="pension-helpTip"]').click()
            cy.get('[data-testid="unemploymentInsurance-helpTip"]').click()//Unemployment
            cy.get('[data-testid="unemploymentInsuranceToolTipHeader1"]').should('have.text',content.toolTip.unemploymentInsuranceToolTipHeader).and('be.visible')
            cy.get('[data-testid="unemploymentInsurance-helpTip"]').click()
            cy.get('[data-testid="socialSecurityRailroad-helpTip"]').click()//SS&RR
            cy.get('[data-testid="SSToolTipHeader1"]').should('have.text',content.toolTip.railroadToolTipHeader).and('be.visible')
            cy.get('[data-testid="socialSecurityRailroad-helpTip"]').click()
            cy.get('[data-testid="scholarship-helpTip"]').click()//Scholarship
            cy.get('[data-testid="scholarshipToolTipHeader1"]').should('have.text',content.toolTip.grantToolTipHeader).and('be.visible')
            cy.get('[data-testid="scholarship-helpTip"]').click()
            cy.get('[data-testid="investments-helpTip"]').click()//Investment
            cy.get('[data-testid="investmentsToolTipHeader1"]').should('have.text',content.toolTip.investmentIncomeToolTipHeader).and('be.visible')
            cy.get('[data-testid="investments-helpTip"]').click()
            cy.get('[data-testid="unearnedOther-helpTip"]').click()//Other Income
            cy.get('[data-testid="unearnedOtherToolTipHeader1"]').should('have.text',content.toolTip.otherUnearnedToolTipHeader).and('be.visible')
            cy.get('[data-testid="unearnedOther-helpTip"]').click()
            cy.get('[data-testid="studentLoan-helpTip"]').click()//Student Loan
            cy.get('[data-testid="studentLoanToolTipHeader1"]').should('have.text',content.toolTip.studentLoanToolTipHeader).and('be.visible')
            cy.get('[data-testid="studentLoan-helpTip"]').click()
            cy.get('[data-testid="educator-helpTip"]').click()//Educator
            cy.get('[data-testid="educatorToolTipHeader1"]').should('have.text',content.toolTip.educatorToolTipHeader).and('be.visible')
            cy.get('[data-testid="educator-helpTip"]').click()
            cy.get('[data-testid="ira-helpTip"]').click()//IRA
            cy.get('[data-testid="iraToolTipHeader1"]').should('have.text',content.toolTip.iraToolTipHeader).and('be.visible')
            cy.get('[data-testid="ira-helpTip"]').click()
            cy.get('[data-testid="hsa-helpTip"]').click()//HSA
            cy.get('[data-testid="hsaToolTipHeader1"]').should('have.text',content.toolTip.hsaToolTipHeader).and('be.visible')
            cy.get('[data-testid="hsa-helpTip"]').click()
            cy.get('[data-testid="moving-helpTip"]').click()//Moving
            cy.get('[data-testid="movingToolTipHeader1"]').should('have.text',content.toolTip.movingToolTipHeader).and('be.visible')
            cy.get('[data-testid="moving-helpTip"]').click()
            cy.get('[data-testid="alimony-helpTip"]').click()//Alimony
            cy.get('[data-testid="alimonyToolTipHeader1"]').should('have.text',content.toolTip.alimonyToolTipHeader).and('be.visible')
            cy.get('[data-testid="alimony-helpTip"]').click()
            cy.get('[data-testid="earlyWithdrawalPenalty-helpTip"]').click()//Early Withdrawal
            cy.get('[data-testid="earlyToolTipHeader1"]').should('have.text',content.toolTip.earlyWithdrawlPenaltyToolTipHeader).and('be.visible')
            cy.get('[data-testid="earlyWithdrawalPenalty-helpTip"]').click()
            cy.get('[data-testid="business-helpTip"]').click()//Business
            cy.get('[data-testid="businessToolTipHeader1"]').should('have.text',content.toolTip.businessToolTipHeader).and('be.visible')
            cy.get('[data-testid="business-helpTip"]').click()

            //Max AGI checked MFJ 2 dependents
            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('55529')
            //cy.get('[data-testid="earnedIncomeLimitWarningHeading"]').should('be.visible')        //update script to check for alert on the results page.
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()

            //Education Expense MFJ verified
            cy.get('[data-testid="adjustments.educator.checked"]').click()
            cy.get('[data-testid="educator-callout"]').should('contain','$500')//Verify 2022 Limit Filing Single
            cy.get('[data-testid="adjustments.educator.checked"]').click()

            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('41025').should('have.value', '$41,025')
            cy.get('[data-testid="unemploymentInsuranceLabel"]').click()
            cy.get('[data-testid="unemploymentInsurance0-input"]').type('1000').should('have.value', '$1,000')
            cy.get('[data-testid="businessLabel"]').click()
            cy.get('[data-testid="business0-input"]').type('3000').should('have.value', '$3,000')
            cy.get('[data-testid="otherAdjustmentsLabel"]').click()
            cy.get('[data-testid="otherAdjustments0-input"]').type('31').should('have.value', '$31')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-no"]').click()//51% No - Does not qualify
            cy.get('[data-testid="childDisqualifiedAlertBody"]').should('be.visible')
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()

            // Live51Pct Helptip
            cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
            cy.get('[data-testid="live51PctTTHeading1"]').should('have.text', content.toolTip.live51PctToolTipHeader).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph1"]').should('contain', '2022').and('be.visible')
            cy.get('[data-testid="live51PctTTHeading2"]').should('have.text', content.toolTip.live51PctToolTipHeader2).and('be.visible')
            cy.get('[data-testid="live51PctTTParagraph2"]').should('contain', '2022').and('be.visible')
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

            // Claim Other Helptip
            cy.get('[data-testid="children.0.claimOtherHelpTip"]').click()
            cy.get('[data-testid="claimOtherTTHeading1"]').should('have.text', content.toolTip.claimOtherToolTipHeader).and('be.visible')
            cy.get('[data-testid="claimOtherTTParagraph1"]').should('have.text', content.toolTip.claimOtherToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimOtherTTParagraph2"]').should('have.text', content.toolTip.claimOtherToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="claimOtherTTLink1"]').should('have.attr', 'href', content.toolTip.claimOtherToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.claimOtherHelpTip"]').click()
            cy.get('[data-testid="claimOtherTTHeading1"]').should('be.not.visible')

            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-no"]').click()//Claim other confirm No - Does not qualify
            cy.get('[data-testid="childDisqualifiedAlertBody"]').should('be.visible')
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()

            // File Joint Helptip
            cy.get('[data-testid="children.0.fileJointHelpTip"]').click()
            cy.get('[data-testid="fileJointTTHeading1"]').should('have.text', content.toolTip.fileJointToolTipHeader).and('be.visible')
            cy.get('[data-testid="fileJointTTParagraph1"]').should('have.text', content.toolTip.fileJointToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="fileJointTTParagraph2"]').should('have.text', content.toolTip.fileJointToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="fileJointTTLink1"]').should('have.attr', 'href', content.toolTip.fileJointToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.fileJointHelpTip"]').click()
            cy.get('[data-testid="fileJointTTHeading1"]').should('be.not.visible')

            cy.get('[data-testid="children.0.fileJoint-yes"]').click()

            // File Joint Confirm Helptip
            cy.get('[data-testid="children.0.fileJointConfirmHelpTip"]').click()
            cy.get('[data-testid="fileJointConfirmTTHeading1"]').should('have.text', content.toolTip.fileJointConfirmToolTipHeader).and('be.visible')
            cy.get('[data-testid="fileJointConfirmTTParagraph1"]').should('have.text', content.toolTip.fileJointConfirmToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="fileJointConfirmTTParagraph2"]').should('have.text', content.toolTip.fileJointConfirmToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="fileJointConfirmTTLink1"]').should('have.attr', 'href', content.toolTip.fileJointConfirmToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirmHelpTip"]').click()
            cy.get('[data-testid="fileJointConfirmTTHeading1"]').should('be.not.visible')

            cy.get('[data-testid="children.0.fileJointConfirm-input-no"]').click()//Joint Confirm No - Does not qualify
            cy.get('[data-testid="childDisqualifiedAlertBody"]').should('be.visible')
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()

            // Permanently Disabled Helptip
            cy.get('[data-testid="children.0.permanentlyDisabledHelpTip"]').click()
            cy.get('[data-testid="permanentlyDisabledTTHeading1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipHeader).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTParagraph1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTList0"]').should('have.text', content.toolTip.permanentlyDisabledToolTipList0).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTList1"]').should('have.text', content.toolTip.permanentlyDisabledToolTipList1).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTParagraph2"]').should('have.text', content.toolTip.permanentlyDisabledToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="permanentlyDisabledTTLink1"]').should('have.attr', 'href', content.toolTip.permanentlyDisabledToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.permanentlyDisabledHelpTip"]').click()
            cy.get('[data-testid="permanentlyDisabledTTHeading1"]').should('be.not.visible')
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()

            // Claim Dependent Helptip
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
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()

            //Child 24 and over error
            cy.get('[data-testid="children.0.age-input-age-Over24"]').click()
            cy.get('[data-testid="childDisqualifiedAlertHeading"]').should('be.visible')
            cy.get('[data-testid="childQualifiesParagraph"]').should('be.visible')

            cy.get('[data-testid="children.0.age-age-Under18"]').click()

            //Child younger than you HelpTip
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerSpouseTTHeading1"]').should('have.text', content.toolTip.childYoungerToolTipHeaderMFJ).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTParagraph1"]').should('contain', '2022').and('be.visible')
            cy.get('[data-testid="youngerSpouseTTParagraph2"]').should('have.text', content.toolTip.childToolTipPargraph2).and('be.visible')
            cy.get('[data-testid="youngerSpouseTTLink1"]').should('have.attr', 'href', content.toolTip.childToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.youngerHelpTip"]').click()
            cy.get('[data-testid="youngerSpouseTTHeading1"]').should('be.not.visible')
            cy.get('[data-testid="children.0.younger-input-yes"]').click()

            //Valid Social for Qualifying Children Helptip
            cy.get('[data-testid="children.0.validSSNHelpTip"]').click()
            cy.get('[data-testid="depHelpTipHeading1"]').should('have.text',content.toolTip.validSSNQCToolTipHeader).and('be.visible')

            //No valid social error
            cy.get('[data-testid="children.0.validSSN-no"]').click()
            cy.get('[data-testid="qcValidSSNInfoP1"]').should('be.visible')

            cy.get('[data-testid="children.0.validSSN-yes"]').click()

            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-input-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-input-no"]').click()
            cy.get('[data-testid="children.1.fileJoint-input-no"]').click()
            cy.get('[data-testid="children.1.permanentlyDisabled-input-yes"]').click()
            cy.get('[data-testid="children.1.relationship-input-other"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="resultsIntro-p1"]').contains('$1,380')


        })
    })
    it('Scenario 3 2022 - Tom MFS', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="liveApartFromSpouse-no"]').click()//Live Apart No - dependents question
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="liveApartFromSpouse-yes"]').click()
            cy.get('[data-testid="mfsLegalDoc-input-no"]').click()//mfs legalDoc No - Dont Qualify
            cy.get('[data-testid="warningHeading"]').should('be.visible')
            cy.get('[data-testid="mfsLegalDoc-input-yes"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click() //5
            cy.get('[data-testid="nextButton"]').click()

            //Select All AGI boxes to verify error
            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="earnedIncome.federalIncomeNotWithheld.checked"]').click()
            cy.get('[data-testid="earnedIncome.selfEmploymentGross.checked"]').click()
            cy.get('[data-testid="earnedIncome.disabilityRetirement.checked"]').click()
            cy.get('[data-testid="earnedIncome.foreignEarnedIncome.checked"]').click()
            cy.get('[data-testid="earnedIncome.prisonIncome.checked"]').click()
            cy.get('[data-testid="unearnedIncome.pension.checked"]').click()
            cy.get('[data-testid="unearnedIncome.unemploymentInsurance.checked"]').click()
            cy.get('[data-testid="unearnedIncome.socialSecurityRailroad.checked"]').click()
            cy.get('[data-testid="unearnedIncome.scholarship.checked"]').click()
            cy.get('[data-testid="unearnedIncome.investments.checked"]').click()
            cy.get('[data-testid="investments0-input"]').type('10301')//Verify 2022 Investment Limit
            cy.get('[data-testid="investmentIncomeOver-p1"]').should('contain','$10,300')
            cy.get('[data-testid="investments0-input"]').clear()
            cy.get('[data-testid="unearnedIncome.unearnedOther.checked"]').click()
            cy.get('[data-testid="adjustments.studentLoan.checked"]').click()
            cy.get('[data-testid="adjustments.educator.checked"]').click()
            cy.get('[data-testid="educator-callout"]').should('contain','$250')//Verify 2022 Educator Limit Filing Single
            cy.get('[data-testid="adjustments.ira.checked"]').click()
            cy.get('[data-testid="adjustments.hsa.checked"]').click()
            cy.get('[data-testid="adjustments.moving.checked"]').click()
            cy.get('[data-testid="adjustments.alimony.checked"]').click()
            cy.get('[data-testid="adjustments.earlyWithdrawalPenalty.checked"]').click()
            cy.get('[data-testid="adjustments.business.checked"]').click()
            cy.get('[data-testid="adjustments.otherAdjustments.checked"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="errorHeading"]').should('have.text',content.error.errorHeading).and('be.visible')

            //Uncheck all boxes and click next to verify error for no input
            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="earnedIncome.federalIncomeNotWithheld.checked"]').click()
            cy.get('[data-testid="earnedIncome.selfEmploymentGross.checked"]').click()
            cy.get('[data-testid="earnedIncome.disabilityRetirement.checked"]').click()
            cy.get('[data-testid="earnedIncome.foreignEarnedIncome.checked"]').click()
            cy.get('[data-testid="earnedIncome.prisonIncome.checked"]').click()
            cy.get('[data-testid="unearnedIncome.pension.checked"]').click()
            cy.get('[data-testid="unearnedIncome.unemploymentInsurance.checked"]').click()
            cy.get('[data-testid="unearnedIncome.socialSecurityRailroad.checked"]').click()
            cy.get('[data-testid="unearnedIncome.scholarship.checked"]').click()
            cy.get('[data-testid="unearnedIncome.investments.checked"]').click()
            cy.get('[data-testid="unearnedIncome.unearnedOther.checked"]').click()
            cy.get('[data-testid="adjustments.studentLoan.checked"]').click()
            cy.get('[data-testid="adjustments.educator.checked"]').click()
            cy.get('[data-testid="adjustments.ira.checked"]').click()
            cy.get('[data-testid="adjustments.hsa.checked"]').click()
            cy.get('[data-testid="adjustments.moving.checked"]').click()
            cy.get('[data-testid="adjustments.alimony.checked"]').click()
            cy.get('[data-testid="adjustments.earlyWithdrawalPenalty.checked"]').click()
            cy.get('[data-testid="adjustments.business.checked"]').click()
            cy.get('[data-testid="adjustments.otherAdjustments.checked"]').click()
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="errorHeading"]').should('have.text',content.error.errorHeading).and('be.visible')
            
            //AGI Max Limit check - MFS with 5 deps
            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('53057')
            cy.get('[data-testid="earnedIncomeLimitWarningHeading"]').should('be.visible')
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()

            cy.get('[data-testid="disabilityRetirementLabel"]').click()
            cy.get('[data-testid="disabilityRetirement0-input"]').type('35000').should('have.value', '$35,000')
            cy.get('[data-testid="pensionLabel"]').click()
            cy.get('[data-testid="pension0-input"]').type('1000').should('have.value', '$1,000')
            cy.get('[data-testid="investmentsLabel"]').click()
            cy.get('[data-testid="investments0-input"]').type('1000').should('have.value', '$1,000')
            cy.get('[data-testid="unearnedOtherLabel"]').click()
            cy.get('[data-testid="unearnedOther0-input"]').type('4000').should('have.value', '$4,000')
            cy.get('[data-testid="educatorLabel"]').click()
            cy.get('[data-testid="educator0-input"]').type('300').should('have.value', '$300')
            cy.get('[data-testid="iraLabel"]').click()
            cy.get('[data-testid="ira0-input"]').type('5000').should('have.value', '$5,000')
            cy.get('[data-testid="earlyWithdrawalPenaltyLabel"]').click()
            cy.get('[data-testid="earlyWithdrawalPenalty0-input"]').type('1000').should('have.value', '$1,000')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-no"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship3"]').click()

            //Verify all age options
            cy.get('[data-testid="children.0.age-input-age-Under18"]').click()//Under 18 -Valid SSN question appears
            cy.get('[data-testid="children.0.validSSN-label"]').should('be.visible')
            cy.get('[data-testid="children.0.age-input-age-Over24"]').click()//Over24 - does not qualify
            cy.get('[data-testid="childDisqualifiedAlertBody"]').should('be.visible')
            cy.get('[data-testid="children.0.age-age-19-23"]').click()//19-23 - student question appears
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-no"]').click()//No SSN - Note Appears 
            cy.get('[data-testid="qcValidSSNInfoP1"]').should('be.visible')

            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-no"]').click()
            cy.get('[data-testid="children.1.fileJoint-no"]').click()
            cy.get('[data-testid="children.1.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.1.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.1.age-age-19-23"]').click()
            cy.get('[data-testid="children.1.student-no"]').click()//Student No - does not qualify
            cy.get('[data-testid="childDisqualifiedAlertBody"]').should('be.visible')

            cy.get('[id="child3-trigger"]').click()
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-no"]').click()
            cy.get('[data-testid="children.2.fileJoint-no"]').click()
            cy.get('[data-testid="children.2.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.2.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.2.age-age-19-23"]').click()
            cy.get('[data-testid="children.2.student-yes"]').click()
            cy.get('[data-testid="children.2.validSSN-yes"]').click()//Student with valid SSN - qualifies
            cy.get('[data-testid="childQualifiesAlertBody"]').should('be.visible')

            cy.get('[id="child4-trigger"]').click()
            cy.get('[data-testid="children.3.live51Pct-yes"]').click()
            cy.get('[data-testid="children.3.claimOther-no"]').click()
            cy.get('[data-testid="children.3.fileJoint-no"]').click()
            cy.get('[data-testid="children.3.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.3.relationship-qualifyingRelationship2"]').click()
            cy.get('[data-testid="children.3.validSSN-yes"]').click()//permanentDisabled w/ valid SSN - qualifies
            cy.get('[data-testid="childQualifiesAlertBody"]').should('be.visible')
            
            cy.get('[id="child5-trigger"]').click()
            cy.get('[data-testid="children.4.live51Pct-yes"]').click()
            cy.get('[data-testid="children.4.claimOther-no"]').click()
            cy.get('[data-testid="children.4.fileJoint-no"]').click()
            cy.get('[data-testid="children.4.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.4.relationship-qualifyingRelationship2"]').click()
            cy.get('[data-testid="children.4.age-age-Under18"]').click()
            cy.get('[data-testid="children.4.validSSN-yes"]').click()//Under18 w/ valid SSN - qualifies
            cy.get('[data-testid="childQualifiesAlertBody"]').should('be.visible')

            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="resultsIntro-p1"]').contains('$3,803')
        })
    })
    it('Scenario 4 2022 - Bonnie Single', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-"]').click() //None
            cy.get('[data-testid="warningHeading"]').should('have.text',content.error.warningHeading).and('be.visible')
            cy.get('[data-testid="noDependentsAgeWarning-p3"]').should('have.text',content.error.noDependentsAgeWarningParagraph1)
        })
    })
    it('Scenario 5 2022- Steve Single', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-divorced"]').click()
            cy.get('[data-testid="houseUpkeep3-none"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click() //3
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="selfEmploymentGrossLabel"]').click()
            cy.get('[data-testid="selfEmploymentGross0-input"]').type('40000').should('have.value', '$40,000')
            cy.get('[data-testid="selfEmploymentPaidSEGLabel"]').click()
            cy.get('[data-testid="selfEmploymentPaidSEG0-input"]').type('15000').should('have.value', '$15,000')
            cy.get('[data-testid="sepSimpleSEGLabel"]').click()
            cy.get('[data-testid="sepSimpleSEG0-input"]').type('15000').should('have.value', '$15,000')
            cy.get('[data-testid="selfEmploymentInsuranceSEGLabel"]').click()
            cy.get('[data-testid="selfEmploymentInsuranceSEG0-input"]').type('15000').should('have.value', '$15,000')
            cy.get('[data-testid="selfEmploymentExpensesSEGLabel"]').click()
            cy.get('[data-testid="selfEmploymentExpensesSEG0-input"]').type('5000').should('have.value', '$5,000')
            cy.get('[data-testid="pensionLabel"]').click()
            cy.get('[data-testid="pension0-input"]').type('20000').should('have.value', '$20,000')
            cy.get('[data-testid="unemploymentInsuranceLabel"]').click()
            cy.get('[data-testid="unemploymentInsurance0-input"]').type('20000').should('have.value', '$20,000')
            cy.get('[data-testid="socialSecurityRailroadLabel"]').click()
            cy.get('[data-testid="socialSecurityRailroad0-input"]').type('20000').should('have.value', '$20,000')
            cy.get('[data-testid="unearnedOtherLabel"]').click()
            cy.get('[data-testid="unearnedOther0-input"]').type('10725').should('have.value', '$10,725')
            cy.get('[data-testid="movingLabel"]').click()
            cy.get('[data-testid="moving0-input"]').type('10000').should('have.value', '$10,000')
            cy.get('[data-testid="alimonyLabel"]').click()
            cy.get('[data-testid="alimony0-input"]').type('5000').should('have.value', '$5,000')
            cy.get('[data-testid="businessLabel"]').click()
            cy.get('[data-testid="business0-input"]').type('1000').should('have.value', '$1,000')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-other"]').click()
            
            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-no"]').click()
            cy.get('[data-testid="children.1.fileJoint-no"]').click()
            cy.get('[data-testid="children.1.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.1.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.1.age-age-Under18"]').click()
            cy.get('[data-testid="children.1.validSSN-yes"]').click()
            
            cy.get('[id="child3-trigger"]').click()
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-no"]').click()
            cy.get('[data-testid="children.2.fileJoint-no"]').click()
            cy.get('[data-testid="children.2.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.2.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.2.age-age-Under18"]').click()
            cy.get('[data-testid="children.2.validSSN-yes"]').click()
            
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="resultsIntro-p1"]').contains('$989')
        })
    })
    it('Scenario 6 2022- Jen HOH', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-neverMarried"]').click()

            //Verify Filing Status for each Upkeep3 Option
            cy.get('[data-testid="houseUpkeep3-input-dependent"]').click()//Dependent = HOH
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.hohResults).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-input-spousesChild"]').click()//SpousesChild = HOH
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.hohResults).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-input-none"]').click()//None = Single
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.singleResults).and('be.visible')
            cy.get('[data-testid="houseUpkeep3-parent"]').click()//Parent = HOH
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.hohResults).and('be.visible')
            cy.get('[data-testid="numOfDependents-10"]').click() //3
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('14925').should('have.value', '$14,925')
            cy.get('[data-testid="foreignEarnedIncomeLabel"]').click()
            cy.get('[data-testid="foreignEarnedIncome0-input"]').type('5000').should('have.value', '$5,000')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').click()//Disabled with SSN = qualifies
            cy.get('[data-testid="childQualifiesAlertBody"]').should('be.visible')

            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-yes"]').click()
            cy.get('[data-testid="children.1.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.1.fileJoint-yes"]').click()
            cy.get('[data-testid="children.1.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.1.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.1.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.1.age-age-Under18"]').click()
            cy.get('[data-testid="children.1.younger-input-yes"]').click()
            cy.get('[data-testid="children.1.validSSN-yes"]').click()//Under 18, Relationship1 with SSN = qualifies
            cy.get('[data-testid="childQualifiesAlertBody"]').should('be.visible')

            cy.get('[id="child3-trigger"]').click()
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-no"]').click()
            cy.get('[data-testid="children.2.fileJoint-no"]').click()
            cy.get('[data-testid="children.2.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.2.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.2.validSSN-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="resultsIntro-p1"]').contains('$6,935')
        })
    })
    it('Scenario 7 2022 - Mike HOH', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-married"]').click()
            cy.get('[data-testid="fileJointReturn-yes"]').click()//Joint Return Yes = MFJ
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.mfjResults).and('be.visible')
            cy.get('[data-testid="spouseValidSSN-input-no"]').click()// No SSN = does not qualify
            cy.get('[data-testid="warningHeading"]').should('have.text',content.error.warningHeading).and('be.visible')
            cy.get('[data-testid="fileJointReturn-no"]').click()// Joint Return No
            cy.get('[data-testid="liveWithSpouse-input-yes"]').click()//Live with Spouse Yes = MFS
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.mfsResults).and('be.visible')
            cy.get('[data-testid="mfsLegalDoc-input-no"]').click()//Legally Separated No = does not qualify
            cy.get('[data-testid="warningHeading"]').should('have.text',content.error.warningHeading).and('be.visible')
            cy.get('[data-testid="mfsLegalDoc-input-yes"]').click()//Legally Separated Yes = num of dependent question
            cy.get('[data-testid="numOfDependents-label"]').should('be.visible')
            cy.get('[data-testid="liveWithSpouse-no"]').click()//Live with Spouse No
            cy.get('[data-testid="houseUpkeep1-no"]').click()//UpKeep1 No = MFS
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.mfsResults).and('be.visible')
            cy.get('[data-testid="houseUpkeep1-yes"]').click()//UpKeep1 Yes = HOH
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.hohResults).and('be.visible')
            cy.get('[data-testid="numOfDependents-10"]').click() //4
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="federalIncomeNotWithheldLabel"]').click()
            cy.get('[data-testid="federalIncomeNotWithheld0-input"]').type('10000').should('have.value', '$10,000')
            cy.get('[data-testid="selfEmploymentGrossLabel"]').click()
            cy.get('[data-testid="selfEmploymentGross0-input"]').type('20000').should('have.value', '$20,000')
            cy.get('[data-testid="prisonIncomeLabel"]').click()
            cy.get('[data-testid="prisonIncome0-input"]').type('5000').should('have.value', '$5,000')
            cy.get('[data-testid="scholarshipLabel"]').click()
            cy.get('[data-testid="scholarship0-input"]').type('2025').should('have.value', '$2,025')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.relationship-other"]').click()
            
            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-no"]').click()
            cy.get('[data-testid="children.1.fileJoint-no"]').click()
            cy.get('[data-testid="children.1.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.1.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.1.age-age-Under18"]').click()
            cy.get('[data-testid="children.1.younger-no"]').click()

            cy.get('[id="child3-trigger"]').click()
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-no"]').click()
            cy.get('[data-testid="children.2.fileJoint-no"]').click()
            cy.get('[data-testid="children.2.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.2.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.2.age-age-Under18"]').click()
            cy.get('[data-testid="children.2.younger-yes"]').click()
            cy.get('[data-testid="children.2.validSSN-yes"]').click()

            cy.get('[id="child4-trigger"]').click()
            cy.get('[data-testid="children.3.live51Pct-yes"]').click()
            cy.get('[data-testid="children.3.claimOther-no"]').click()
            cy.get('[data-testid="children.3.fileJoint-no"]').click()
            cy.get('[data-testid="children.3.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.3.relationship-qualifyingRelationship2"]').click()
            cy.get('[data-testid="children.3.age-age-Over24"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="resultsIntro-p1"]').contains('$1,037')
        })
    })
    it('Scenario 8 2022 - Fred MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-under24"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-no"]').click()//Joint Return Deceased No
            cy.get('[data-testid="liveWithSpouse-input-no"]').click()//Live with Spouse No 
            cy.get('[data-testid="houseUpkeep1-input-yes"]').click()//Upkeep1 Yes = HOH
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.hohResults).and('be.visible')
            cy.get('[data-testid="houseUpkeep1-input-no"]').click()//Upkeep1 No = MFS
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.mfsResults).and('be.visible')
            cy.get('[data-testid="liveWithSpouse-input-yes"]').click()//Live with Spouse Yes = MFS
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.mfsResults).and('be.visible')
            cy.get('[data-testid="intendJointReturnDeceased-yes"]').click()//Joint Return Yes = MFJ
            cy.get('[data-testid="fsToolResultTitle"]').should('have.text',content.filingStatus.mfjResults).and('be.visible')
            cy.get('[data-testid="deceasedSpouseValidSSN-no"]').click()//Valid SSN Deceased No = does not qualify
            cy.get('[data-testid="deceasedSpouseValidSSNWarning-p1"]').should('have.text',content.error.deceasedSpouseValidSSNWarning).and('be.visible')
            cy.get('[data-testid="deceasedSpouseValidSSN-yes"]').click()
            cy.get('[data-testid="deceasedSpouseAge-input-under24"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click() //2
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('22379').should('have.value', '$22,379')
            cy.get('[data-testid="socialSecurityRailroadLabel"]').click()
            cy.get('[data-testid="socialSecurityRailroad0-input"]').type('6000').should('have.value', '$6,000')
            cy.get('[data-testid="otherAdjustmentsLabel"]').click()
            cy.get('[data-testid="otherAdjustments0-input"]').type('1000').should('have.value', '$1,000')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-no"]').click()//Live51 no = Does not qualify
            cy.get('[data-testid="childDisqualifiedAlertHeading"]').should('be.visible')

            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-no"]').click()
            cy.get('[data-testid="children.1.fileJoint-yes"]').click()
            cy.get('[data-testid="children.1.fileJointConfirm-no"]').click()
            cy.get('[data-testid="nextButton"]').click()
            // Results page - No EITC alert
            cy.get('[data-testid="warningHeading"]').should('have.text', content.qualifyingChildren.noEITCHeader).and('be.visible')
            cy.get('[data-testid="warningBody"] > :nth-child(1)').should('have.text', content.qualifyingChildren.noEITCDQBody).and('be.visible')
        })
    })
    it('Scenario 9 2022- Joe QW', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-last2Years"]').click()
            cy.get('[data-testid="entitledJointReturnDeceased-yes"]').click()
            cy.get('[data-testid="houseUpkeep2-yes"]').click()
            cy.get('[data-testid="claimDependent1-no"]').click()
            cy.get('[data-testid="claimDependent2-yes"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click() //5
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('50500').should('have.value', '$50,500')
            cy.get('[data-testid="scholarshipLabel"]').click()
            cy.get('[data-testid="scholarship0-input"]').type('10000').should('have.value', '$10,000')
            cy.get('[data-testid="iraLabel"]').click()
            cy.get('[data-testid="ira0-input"]').type('5075').should('have.value', '$5,075')
            cy.get('[data-testid="hsaLabel"]').click()
            cy.get('[data-testid="hsa0-input"]').type('5000').should('have.value', '$5,000')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.relationship-other"]').click()

            cy.get('[id="child2-trigger"]').click()
            cy.get('[data-testid="children.1.live51Pct-yes"]').click()
            cy.get('[data-testid="children.1.claimOther-yes"]').click()
            cy.get('[data-testid="children.1.claimOtherConfirm-no"]').click()

            cy.get('[id="child3-trigger"]').click()
            cy.get('[data-testid="children.2.live51Pct-yes"]').click()
            cy.get('[data-testid="children.2.claimOther-no"]').click()
            cy.get('[data-testid="children.2.fileJoint-no"]').click()
            cy.get('[data-testid="children.2.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.2.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.2.age-age-Under18"]').click()
            cy.get('[data-testid="children.2.validSSN-yes"]').click()
            
            cy.get('[id="child4-trigger"]').click()
            cy.get('[data-testid="children.3.live51Pct-yes"]').click()
            cy.get('[data-testid="children.3.claimOther-no"]').click()
            cy.get('[data-testid="children.3.fileJoint-no"]').click()
            cy.get('[data-testid="children.3.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.3.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.3.validSSN-yes"]').click()
            
            cy.get('[id="child5-trigger"]').click()
            cy.get('[data-testid="children.4.live51Pct-yes"]').click()
            cy.get('[data-testid="children.4.claimOther-no"]').click()
            cy.get('[data-testid="children.4.fileJoint-no"]').click()
            cy.get('[data-testid="children.4.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.4.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.4.age-age-19-23"]').click()
            cy.get('[data-testid="children.4.student-yes"]').click()
            cy.get('[data-testid="children.4.validSSN-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="resultsIntro-p1"]').contains('$539')
        })
    })
    it('Scenario 10 2022- 65 and older', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="year-2022"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2022-input-over65"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="fsKnown-no"]').click()
            cy.get('[data-testid="maritalStatus-widow"]').click()
            cy.get('[data-testid="spousesPassing-input-lastYear"]').click()
            cy.get('[data-testid="intendJointReturnDeceased-input-no"]').click()
            cy.get('[data-testid="liveWithSpouse-input-no"]').click()
            cy.get('[data-testid="houseUpkeep1-input-no"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click() //1
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('53,058')
            cy.get('[data-testid="earnedIncomeLimitWarningHeading"]').should('be.visible')
            cy.get('[data-testid="wagesFederalWithheld0-input"]').clear()

            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('38000')
            cy.get('[data-testid="scholarshipLabel"]').click()
            cy.get('[data-testid="scholarship0-input"]').type('10000')
            cy.get('[data-testid="iraLabel"]').click()
            cy.get('[data-testid="ira0-input"]').type('5075')
            cy.get('[data-testid="hsaLabel"]').click()
            cy.get('[data-testid="hsa0-input"]').type('5000')
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-yes"]').click()
            cy.get('[data-testid="children.0.relationship-input-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.validSSN-input-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()

            cy.get('[data-testid="resultsIntro-p1"]').contains('$877')
        })
    })
})