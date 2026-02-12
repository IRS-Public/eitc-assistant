/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */

describe('Sanity', () => {
  it('Sanity', () => {
      cy.get('@contentJSON').then((content) => {
            cy.viewport(1280, 1024)
            // App Title/Subtitle
            cy.get('[data-testid="generalInfoHeader"]').should('have.text', content.title).and('be.visible')
            cy.get('[data-testid="generalInfoHeaderIntro"]').should('have.text', content.subTitle).and('be.visible')
            
            // Page Title/Subtitle
            cy.get('[data-testid="generalInfoTitle"]').should('have.text', content.general.title).and('be.visible')
            cy.get('[data-testid="generalInfoSubtitle"]').should('have.text', content.general.subtitle).and('be.visible')
            cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
            
            // GENERAL INFO PAGE
            cy.get('[data-testid="year-label"]').should('have.text', content.general.year).and('be.visible')
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()


            // FILING STATUS PAGE
            cy.get('[data-testid="fsKnown-label"]').should('have.text', content.filingStatus.fsKnown).and('be.visible')
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click()
            cy.get('[data-testid="nextButton"]').click()


            // AGI PAGE
            cy.get('[data-testid="wagesFederalWithheldLabel"]').should('have.text', content.agi.wagesWithheld).and('be.visible')
            cy.get('[data-testid="wagesFederalWithheldLabel"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('12000').should('have.value', '$12,000')
            cy.get('[data-testid="nextButton"]').click()


            // QUALIFYING CHILDREN PAGE
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship2"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click()
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()


            // RESULTS PAGE
            cy.get('[data-testid="resultsIntro-p1"]').should('have.text', content.results.resultsIntroParagraph1Regression).and('be.visible')
          })
      })

      it('Full Sanity - Desktop', () => {
        cy.get('@contentJSON').then((content) => {
              cy.viewport(1280, 1024)
              // GLOBAL
              
              // Header
              cy.get('[data-testid="helpLinkDesktop"]').should('have.text', content.global.header.help).and('have.attr', 'href', content.global.headerLink.helpLink).and('be.visible')
              cy.get('[data-testid="aboutIrsLink"]').should('have.text', content.global.footer.aboutIRS).and('have.attr', 'href', content.global.footerLinks.aboutIRSLink).and('be.visible')
              cy.get('[data-testid="fileLink"]').should('have.text', content.global.header.file).and('have.attr', 'href', content.global.headerLink.fileLink).and('be.visible')
              
              // Progress Tracker
              cy.get('[data-testid="stepIndicatorStep1"]  > a').should('have.attr', 'href', content.progressTracker.page1Link).and('be.visible')
              cy.get('[data-testid="stepIndicatorStep1"]').should('have.text', content.progressTracker.page1).and('be.visible')
              
              // Breadcrumbs
              cy.get('[data-testid="breadcrumbHome"]').should('have.text', content.breadcrumbs.home).and('have.attr', 'href', content.breadcrumbs.homeLink).and('be.visible')
              cy.get('[data-testid="breadcrumbCreditsAndDeductions"]').should('have.text', content.breadcrumbs.creditsBreadcrumb).and('have.attr', 'href', content.breadcrumbs.creditsBreadcrumbLink).and('be.visible')
              cy.get('[data-testid="breadcrumbIndividuals"]').should('have.text', content.breadcrumbs.individualsBreadcrumb).and('have.attr', 'href', content.breadcrumbs.individualsBreadcrumbLink).and('be.visible')
              cy.get('[data-testid="breadcrumbEITC"]').should('have.text', content.breadcrumbs.eitcBreadcrumb).and('have.attr', 'href', content.breadcrumbs.eitcBreadcrumbLink).and('be.visible')
              cy.get('[data-testid="breadcrumbCurrentPage"]').should('have.text', content.breadcrumbs.page1Breadcrumb)
              
              // App Title/Subtitle
              cy.get('[data-testid="generalInfoHeader"]').should('have.text', content.title).and('be.visible')
              cy.get('[data-testid="generalInfoHeaderIntro"]').should('have.text', content.subTitle).and('be.visible')
              
              // Page Title/Subtitle
              cy.get('[data-testid="generalInfoTitle"]').should('have.text', content.general.title).and('be.visible')
              cy.get('[data-testid="generalInfoSubtitle"]').should('have.text', content.general.subtitle).and('be.visible')
              cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
              
              // Skip Ahead Warnings
              cy.get('[data-testid="stepIndicatorStep2"]').click()
              cy.get('[data-testid="filingStatusTitle"]').should('have.text', content.filingStatus.title).and('be.visible')
              cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadFilingStatus).and('be.visible')
              cy.get('[data-testid="stepIndicatorStep1"]').click()
              
  
              // GENERAL INFO PAGE
              cy.get('[data-testid="year-label"]').should('have.text', content.general.year).and('be.visible')
              cy.get('[data-testid="year-2023"]').click()
  
              // Helptip Functionality
              cy.get('[data-testid="citizenHelpTip"]').click()
              cy.get('[data-testid="citizenToolTipParagraph3"]').should('have.text', content.toolTip.citizenToolTipParagraph3).and('be.visible')
              cy.get('[data-testid="citizenToolTipLink"]').should('have.attr', 'href', content.toolTip.citizenToolTipLink1).and('be.visible')
              cy.get('[data-testid="citizenHelpTip"]').click()
              cy.get('[data-testid="citizenToolTipParagraph3"]').should('be.not.visible')
  
              // Error Messages Functionality
              cy.get('[data-testid="nextButton"]').click()
              cy.get('[data-testid="citizen-errorListItem"]').should('have.text', content.error.citizenError).and('be.visible')
              cy.get('[data-testid="citizen-error-message"]').should('have.text', content.error.citizenError).and('be.visible')
  
              cy.get('[data-testid="citizen-yes"]').click()
              cy.get('[data-testid="validSSN-yes"]').click()
              cy.get('[data-testid="foreignIncome-no"]').click()
              cy.get('[data-testid="claimedAsDependent-no"]').click()
              cy.get('[data-testid="age-2023-input-age-25-64"]').click()
              cy.get('[data-testid="nextButton"]').click()
  
  
              // FILING STATUS PAGE
              cy.get('[data-testid="fsKnown-label"]').should('have.text', content.filingStatus.fsKnown).and('be.visible')
              cy.get('[data-testid="fsKnown-yes"]').click()
  
              // Helptip Functionality
              cy.get('[data-testid="filingStatusHelpTip"]').click()
              cy.get('[data-testid="filingStatusHelpTipParagraph2"]').should('have.text', content.toolTip.filingStatusToolTipParagraph2).and('be.visible')
              cy.get('[data-testid="filingStatusHelpTipLink1"]').should('have.attr', 'href', content.toolTip.filingStatusToolTipLink1).and('be.visible')
              cy.get('[data-testid="filingStatusHelpTip"]').click()
              cy.get('[data-testid="filingStatusHelpTipParagraph2"]').should('be.not.visible')
  
              // Error Messages Functionality
              cy.get('[data-testid="nextButton"]').click()
              cy.get('[data-testid="filingStatus-errorListItem"]').should('have.text', content.error.filingStatusError).and('be.visible')
              cy.get('[data-testid="filingStatus-error-message"]').should('have.text', content.error.filingStatusError).and('be.visible')
  
              cy.get('[data-testid="filingStatus-single"]').click()
              cy.get('[data-testid="numOfDependents-10"]').click()
              cy.get('[data-testid="nextButton"]').click()
  
  
              // AGI PAGE
              cy.get('[data-testid="wagesFederalWithheldLabel"]').should('have.text', content.agi.wagesWithheld).and('be.visible')
  
              // Helptip Functionality
              cy.get('[data-testid="wagesFederalWithheld-helpTip"]').click()
              cy.get('[data-testid="wagesToolTipParagraph5"]').should('have.text', content.toolTip.wagesWithheldToolTipParagraph5).and('be.visible')
              cy.get('[data-testid="wagesToolTipLink1"]').should('have.attr', 'href', content.toolTip.wagesWithheldToolTipLink1).and('be.visible')
              cy.get('[data-testid="wagesFederalWithheld-helpTip"]').click()
              cy.get('[data-testid="wagesToolTipParagraph5"]').should('be.not.visible')
  
              // Error Messages Functionality
              cy.get('[data-testid="nextButton"]').click()
              cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')
              cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')
  
              cy.get('[data-testid="wagesFederalWithheldLabel"]').click()
              cy.get('[data-testid="wagesFederalWithheld0-input"]').type('12000').should('have.value', '$12,000')
              cy.get('[data-testid="nextButton"]').click()
  
  
              // QUALIFYING CHILDREN PAGE
              cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
              
              // Helptip Functionality
              cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
              cy.get('[data-testid="live51PctTTParagraph4"]').should('have.text', content.toolTip.live51PctToolTipParagraph4).and('be.visible')
              cy.get('[data-testid="live51PctTTLink1"]').should('have.attr', 'href', content.toolTip.live51PctToolTipLink1).and('be.visible')
              cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
              cy.get('[data-testid="live51PctTTParagraph4"]').should('be.not.visible')
  
              // Error Messages Functionality
              cy.get('[data-testid="nextButton"]').click()
              cy.get('[data-testid="children.0.live51Pct-errorListItem"]').should('have.text', content.error.live51PctError).and('be.visible')
              cy.get('[data-testid="children.0.live51Pct-error-message"]').should('have.text', content.error.live51PctError).and('be.visible')
  
              cy.get('[data-testid="children.0.live51Pct-yes"]').click()
              cy.get('[data-testid="children.0.claimOther-yes"]').click()
              cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
              cy.get('[data-testid="children.0.fileJoint-yes"]').click()
              cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
              cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
              cy.get('[data-testid="children.0.relationship-qualifyingRelationship2"]').click()
              cy.get('[data-testid="children.0.age-age-19-23"]').click()
              cy.get('[data-testid="children.0.student-yes"]').click()
              cy.get('[data-testid="children.0.validSSN-yes"]').click()
              cy.get('[data-testid="nextButton"]').click()
  
  
              // RESULTS PAGE
              cy.get('[data-testid="resultsIntro-p1"]').should('have.text', content.results.resultsIntroParagraph1Regression).and('be.visible')
  
              // Buttons and Start Over link
              cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.visible')
              cy.get('[data-testid="startOverLink"]').should('have.text', content.results.startOver).and('be.visible')
      })
    })
    it('Full Sanity - Mobile', () => {
      cy.get('@contentJSON').then((content) => {
            cy.viewport('iphone-x')
            // GLOBAL
            // Header
            cy.get('[data-testid="helpLinkMobile"]').should('have.text', content.global.header.help).and('have.attr', 'href', content.global.headerLink.helpLink).and('be.visible')
            cy.get('[data-testid="Our Agency"]').click()
            cy.get('[data-testid="aboutIrsLink"]').should('have.text', content.global.footer.aboutIRS).and('have.attr', 'href', content.global.footerLinks.aboutIRSLink).and('be.visible')
            cy.get('[data-testid="mobileMenu"]').click()
            cy.get('[data-testid="fileLink"]').should('have.text', content.global.header.file).click()
            cy.get('[data-testid="fileLink"] + div > div > div > a').should('have.text', content.global.header.mobileFileOverview).and('have.attr', 'href', content.global.headerLink.mobileFileOverviewLink).and('be.visible')
            cy.get('[data-testid="mobileMenu"]').click()
            
            // Progress Tracker
            cy.get('[data-testid="stepIndicatorStep1"]  > a').should('have.attr', 'href', content.progressTracker.page1Link).and('be.visible')
            cy.get('[data-testid="mobileStepIndicator"]').should('have.text', content.progressTracker.step1).and('be.visible')
            cy.get('[data-testid="stepIndicatorStep1"]').should('have.text', content.progressTracker.page1).and('be.visible')
            
            // Breadcrumbs
            cy.get('[data-testid="breadcrumbHome"]').should('be.not.visible')
            
            // App Title/Subtitle
            cy.get('[data-testid="generalInfoHeader"]').should('have.text', content.title).and('be.visible')
            cy.get('[data-testid="generalInfoHeaderIntro"]').should('have.text', content.subTitle).and('be.visible')
            
            // Page Title/Subtitle
            cy.get('[data-testid="generalInfoTitle"]').should('have.text', content.general.title).and('be.visible')
            cy.get('[data-testid="generalInfoSubtitle"]').should('have.text', content.general.subtitle).and('be.visible')
            cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
            
            // Skip Ahead Warnings
            cy.get('[data-testid="stepIndicatorStep2"]').click()
            cy.get('[data-testid="filingStatusTitle"]').should('have.text', content.filingStatus.title).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadFilingStatus).and('be.visible')
            cy.get('[data-testid="stepIndicatorStep1"]').click()
              
            // GENERAL INFO PAGE
            cy.get('[data-testid="year-label"]').should('have.text', content.general.year).and('be.visible')
            cy.get('[data-testid="year-2023"]').click()
  
            // Helptip Functionality
            cy.get('[data-testid="citizenHelpTip"]').click()
            cy.get('[data-testid="citizenToolTipParagraph3"]').should('have.text', content.toolTip.citizenToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="citizenToolTipLink"]').should('have.attr', 'href', content.toolTip.citizenToolTipLink1).and('be.visible')
            cy.get('[data-testid="citizenHelpTip"]').click()
            cy.get('[data-testid="citizenToolTipParagraph3"]').should('be.not.visible')
  
            // Error Messages Functionality
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="citizen-errorListItem"]').should('have.text', content.error.citizenError).and('be.visible')
            cy.get('[data-testid="citizen-error-message"]').should('have.text', content.error.citizenError).and('be.visible')
  
            cy.get('[data-testid="citizen-yes"]').click()
            cy.get('[data-testid="validSSN-yes"]').click()
            cy.get('[data-testid="foreignIncome-no"]').click()
            cy.get('[data-testid="claimedAsDependent-no"]').click()
            cy.get('[data-testid="age-2023-input-age-25-64"]').click()
            cy.get('[data-testid="nextButton"]').click()
  
            // FILING STATUS PAGE
            cy.get('[data-testid="fsKnown-label"]').should('have.text', content.filingStatus.fsKnown).and('be.visible')
            cy.get('[data-testid="fsKnown-yes"]').click()
  
            // Helptip Functionality
            cy.get('[data-testid="filingStatusHelpTip"]').click()
            cy.get('[data-testid="filingStatusHelpTipParagraph2"]').should('have.text', content.toolTip.filingStatusToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTipLink1"]').should('have.attr', 'href', content.toolTip.filingStatusToolTipLink1).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTip"]').click()
            cy.get('[data-testid="filingStatusHelpTipParagraph2"]').should('be.not.visible')
  
            // Error Messages Functionality
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="filingStatus-errorListItem"]').should('have.text', content.error.filingStatusError).and('be.visible')
            cy.get('[data-testid="filingStatus-error-message"]').should('have.text', content.error.filingStatusError).and('be.visible')
  
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click()
            cy.get('[data-testid="nextButton"]').click()
  
            // AGI PAGE
            cy.get('[data-testid="wagesFederalWithheldLabel"]').should('have.text', content.agi.wagesWithheld).and('be.visible')
  
            // Helptip Functionality
            cy.get('[data-testid="wagesFederalWithheld-helpTip"]').click()
            cy.get('[data-testid="wagesToolTipParagraph5"]').should('have.text', content.toolTip.wagesWithheldToolTipParagraph5).and('be.visible')
            cy.get('[data-testid="wagesToolTipLink1"]').should('have.attr', 'href', content.toolTip.wagesWithheldToolTipLink1).and('be.visible')
            cy.get('[data-testid="wagesFederalWithheld-helpTip"]').click()
            cy.get('[data-testid="wagesToolTipParagraph5"]').should('be.not.visible')
  
            // Error Messages Functionality
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="noIncome-errorListItem"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')
            cy.get('[data-testid="noIncome-error-message"]').should('have.text', content.error.agiNoIncomeError).and('be.visible')
  
            cy.get('[data-testid="wagesFederalWithheldLabel"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('12000').should('have.value', '$12,000')
            cy.get('[data-testid="nextButton"]').click()
  
            // QUALIFYING CHILDREN PAGE
            cy.get('[data-testid="children.0.live51Pct-label"]').should('have.text', content.qualifyingChildren.live51Pct).and('be.visible')
            
            // Helptip Functionality
            cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
            cy.get('[data-testid="live51PctTTParagraph4"]').should('have.text', content.toolTip.live51PctToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="live51PctTTLink1"]').should('have.attr', 'href', content.toolTip.live51PctToolTipLink1).and('be.visible')
            cy.get('[data-testid="children.0.live51PctHelpTip"]').click()
            cy.get('[data-testid="live51PctTTParagraph4"]').should('be.not.visible')
  
            // Error Messages Functionality
            cy.get('[data-testid="nextButton"]').click()
            cy.get('[data-testid="children.0.live51Pct-errorListItem"]').should('have.text', content.error.live51PctError).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-error-message"]').should('have.text', content.error.live51PctError).and('be.visible')
  
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-yes"]').click()
            cy.get('[data-testid="children.0.claimOtherConfirm-yes"]').click()
            cy.get('[data-testid="children.0.fileJoint-yes"]').click()
            cy.get('[data-testid="children.0.fileJointConfirm-yes"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship2"]').click()
            cy.get('[data-testid="children.0.age-age-19-23"]').click()
            cy.get('[data-testid="children.0.student-yes"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()
  
            // RESULTS PAGE
            cy.get('[data-testid="resultsIntro-p1"]').should('have.text', content.results.resultsIntroParagraph1Regression).and('be.visible')
  
            // Buttons and Start Over link
            cy.get('[data-testid="backButton"]').should('have.text', content.backButton).and('be.visible')
            cy.get('[data-testid="startOverLink"]').should('have.text', content.results.startOver).and('be.visible')
      })
    })
})
