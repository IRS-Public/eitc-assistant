
describe('Global Test', () => {
    it('Skip Ahead', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="stepIndicatorStep2"]').click()
            cy.get('[data-testid="filingStatusTitle"]').should('have.text', content.filingStatus.title).and('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.skipAheadHeading).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadFilingStatus).and('be.visible')

            // When a year is selected, Filing States skip ahead message includes selected year
            cy.get('[data-testid="stepIndicatorStep1"]').click()
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="stepIndicatorStep2"]').click()
            cy.get('[data-testid="filingStatusTitle"]').should('have.text', content.filingStatus.title).and('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.skipAheadHeading).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadFilingStatusWith2023).and('be.visible')
            
            cy.get('[data-testid="stepIndicatorStep3"]').click()
            cy.get('[data-testid="agiTitle"]').should('have.text', content.agi.title).and('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.skipAheadHeading).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadAGI).and('be.visible')

            cy.get('[data-testid="stepIndicatorStep4"]').click()
            cy.get('[data-testid="qualifyingChildrenTitle"]').should('have.text', content.qualifyingChildren.title).and('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.skipAheadHeading).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadQualifyingChildren).and('be.visible')

            cy.get('[data-testid="stepIndicatorStep5"]').click()
            cy.get('[data-testid="resultsTitle"]').should('have.text', content.results.title).and('be.visible')
            cy.get('[data-testid="warningHeading"]').should('have.text', content.error.skipAheadHeading).and('be.visible')
            cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadResults).and('be.visible')
        })
    })
})
