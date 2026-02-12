/* eslint-disable max-len */

const device = 'iphone-x'

describe('Global Test', () => {
    it('Mobile Progress Tracker', () => {
        cy.get('@contentJSON').then((content) => {
            cy.viewport(device)
            cy.get('[data-testid="stepIndicatorStep1"]  > a').should('have.attr', 'href', content.progressTracker.page1Link).and('be.visible').click()
            cy.get('[data-testid="stepIndicatorStep1"]  > a > span').should('be.not.visible')
            cy.get('[data-testid="mobileStepIndicator"]').should('have.text', content.progressTracker.step1)
            cy.get('[data-testid="stepIndicatorStep2"]  > a').should('have.attr', 'href', content.progressTracker.page2Link).and('be.visible').click()
            cy.get('[data-testid="stepIndicatorStep2"]  > a > span').should('be.not.visible')
            cy.get('[data-testid="mobileStepIndicator"]').should('have.text', content.progressTracker.step2)
            cy.get('[data-testid="stepIndicatorStep3"]  > a').should('have.attr', 'href', content.progressTracker.page3Link).and('be.visible').click()
            cy.get('[data-testid="stepIndicatorStep3"]  > a > span').should('be.not.visible')
            cy.get('[data-testid="mobileStepIndicator"]').should('have.text', content.progressTracker.step3)
            cy.get('[data-testid="stepIndicatorStep4"]  > a').should('have.attr', 'href', content.progressTracker.page4Link).and('be.visible').click()
            cy.get('[data-testid="stepIndicatorStep4"]  > a > span').should('be.not.visible')
            cy.get('[data-testid="mobileStepIndicator"]').should('have.text', content.progressTracker.step4)
            cy.get('[data-testid="stepIndicatorStep5"]  > a').should('have.attr', 'href', content.progressTracker.page5Link).and('be.visible').click()
            cy.get('[data-testid="stepIndicatorStep5"]  > a > span').should('be.not.visible')
            cy.get('[data-testid="mobileStepIndicator"]').should('have.text', content.progressTracker.step5)
        })
    })
})
