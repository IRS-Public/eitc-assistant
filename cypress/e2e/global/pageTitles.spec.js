/* eslint-disable max-len */

describe('Global Test', () => {
    it('Page Titles', () => {
        cy.get('@contentJSON').then((content) => {
            // General Info Page
            cy.get('[data-testid="generalInfoTitle"]').should('have.text', content.general.title).and('be.visible')
            cy.get('[data-testid="generalInfoSubtitle"]').should('have.text', content.general.subtitle).and('be.visible')
            cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
            cy.generalPage()
            
            // Filing Status Page
            cy.get('[data-testid="filingStatusTitle"]').should('have.text', content.filingStatus.title).and('be.visible')
            cy.get('[data-testid="filingStatusSubtitle"]').should('have.text', content.filingStatus.subtitle).and('be.visible')
            cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
            cy.get('[data-testid="fsKnown-yes"]').click()
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="numOfDependents-10"]').click()
            cy.get('[data-testid="nextButton"]').click()

            // AGI Page
            cy.get('[data-testid="agiTitle"]').should('have.text', content.agi.title).and('be.visible')
            cy.get('[data-testid="agiParagraph1"]').should('have.text', content.agi.subTitle0).and('be.visible')
            cy.get('[data-testid="agiParagraph2"]').should('have.text', content.agi.subTitle1).and('be.visible')
            cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
            cy.get('[data-testid="earnedIncome.wagesFederalWithheld.checked"]').click()
            cy.get('[data-testid="wagesFederalWithheld0-input"]').type('30000')
            cy.get('[data-testid="noUnEarnedIncome"]').click()
            cy.get('[data-testid="noAdjustments"]').click()
            cy.get('[data-testid="nextButton"]').click()
            
            // Qualifying Children Page
            cy.get('[data-testid="qualifyingChildrenTitle"]').should('have.text', content.qualifyingChildren.title).and('be.visible')
            cy.get('[data-testid="qcIntroParagraph"]').should('have.text', content.qualifyingChildren.subtitle).and('be.visible')
            cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
            cy.get('[data-testid="children.0.live51Pct-yes"]').click()
            cy.get('[data-testid="children.0.claimOther-no"]').click()
            cy.get('[data-testid="children.0.fileJoint-no"]').click()
            cy.get('[data-testid="children.0.permanentlyDisabled-no"]').click()
            cy.get('[data-testid="children.0.relationship-qualifyingRelationship1"]').click()
            cy.get('[data-testid="children.0.age-age-Under18"]').click()
            cy.get('[data-testid="children.0.validSSN-yes"]').click()
            cy.get('[data-testid="nextButton"]').click()
  
            // Results Page
            cy.get('[data-testid=resultsTitle]').should('have.text', content.results.title).and('be.visible')
        })
    })
})
