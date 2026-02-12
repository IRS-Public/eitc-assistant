/* eslint-disable max-len */

describe('Global Test', () => {
    it('Breadcrumbs', () => {
        cy.get('@contentJSON').then((content) => {
            cy.viewport(1280, 1024)
            cy.get('[data-testid="breadcrumbHome"]').should('have.text', content.breadcrumbs.home).and('have.attr', 'href', content.breadcrumbs.homeLink).and('be.visible')
            cy.get('[data-testid="breadcrumbCreditsAndDeductions"]').should('have.text', content.breadcrumbs.creditsBreadcrumb).and('have.attr', 'href', content.breadcrumbs.creditsBreadcrumbLink).and('be.visible')
            cy.get('[data-testid="breadcrumbIndividuals"]').should('have.text', content.breadcrumbs.individualsBreadcrumb).and('have.attr', 'href', content.breadcrumbs.individualsBreadcrumbLink).and('be.visible')
            cy.get('[data-testid="breadcrumbEITC"]').should('have.text', content.breadcrumbs.eitcBreadcrumb).and('have.attr', 'href', content.breadcrumbs.eitcBreadcrumbLink).and('be.visible')
            cy.get('[data-testid="breadcrumbCurrentPage"]').should('have.text', content.breadcrumbs.page1Breadcrumb).and('be.visible')
            cy.get('[data-testid="stepIndicatorStep2"]').click()
            cy.get('[data-testid="breadcrumbCurrentPage"]').should('have.text', content.breadcrumbs.page2Breadcrumb).and('be.visible')
            cy.get('[data-testid="stepIndicatorStep3"]').click()
            cy.get('[data-testid="breadcrumbCurrentPage"]').should('have.text', content.breadcrumbs.page3Breadcrumb).and('be.visible')
            cy.get('[data-testid="stepIndicatorStep4"]').click()
            cy.get('[data-testid="breadcrumbCurrentPage"]').should('have.text', content.breadcrumbs.page4Breadcrumb).and('be.visible')
            cy.get('[data-testid="stepIndicatorStep5"]').click()
            cy.get('[data-testid="breadcrumbCurrentPage"]').should('have.text', content.breadcrumbs.page5Breadcrumb).and('be.visible')
        })
    })
})
