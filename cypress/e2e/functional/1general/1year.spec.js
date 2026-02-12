/* eslint-disable max-len */


describe('General Page', () => {
    it('Year Question', () => {
        cy.get('@contentJSON').then((content) => {
            // Year question content
            cy.get('[data-testid="year-label"]').should('have.text', content.general.year).and('be.visible')
            cy.get('[data-testid="yearHelpTip"]').should('be.visible')

            // Helptip icon changes when opened
            cy.get('[data-testid="yearHelpTip"] > svg').should('have.attr', 'data-icon', 'circle-question')
            cy.get('[data-testid="yearHelpTip"]').click()
            cy.get('[data-testid="yearHelpTip"] > svg').should('have.attr', 'data-icon', 'circle-xmark')

            // Helptip content
            cy.get('[data-testid="yearToolTipHeader"]').should('have.text', content.toolTip.yearToolTipHeader).and('be.visible')
            cy.get('[data-testid="yearToolTipParagraph1"]').should('have.text', content.toolTip.yearToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="yearToolTipList0"]').should('have.text', content.toolTip.yearToolTipList0).and('be.visible')
            cy.get('[data-testid="yearToolTipList1"]').should('have.text', content.toolTip.yearToolTipList1).and('be.visible')
            cy.get('[data-testid="yearToolTipList2"]').should('have.text', content.toolTip.yearToolTipList2).and('be.visible')
            
            // Helptip icon changes back when closed
            cy.get('[data-testid="yearHelpTip"]').click()
            cy.get('[data-testid="yearHelpTip"] > svg').should('have.attr', 'data-icon', 'circle-question')
            cy.get('[data-testid="yearToolTipHeader"]').should('be.not.visible')

            // Year question radio buttons
            cy.get('[data-testid="year-2023"]').should('have.text', content.general.year2023).and('be.visible')
            cy.get('[data-testid="year-2022"]').should('have.text', content.general.year2022).and('be.visible')
            cy.get('[data-testid="year-2021"]').should('have.text', content.general.year2021).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="citizen-label"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="year-2021"]').click()
            cy.get('[data-testid="citizen-label"]').should('be.visible')

            // Changing Year Modal
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="modalHeader"]').should('have.text', content.general.yearModalHeader).and('be.visible')
            cy.get('[data-testid="modalText"]').should('have.text', content.general.yearModalParagraph).and('be.visible')
            cy.get('[data-testid="cancelButton"]').should('have.text', content.general.yearModalCancelButton).click()
            // By clicking 'Cancel', the year will remain 2021
            cy.get('[data-testid="citizen-label"]').should('have.text', content.general.citizen).and('be.visible')
            cy.get('[data-testid="year-2023"]').click()
            cy.get('[data-testid="confirmButton"]').should('have.text', content.general.yearModalConfirmButton).click()
            // By clicking 'Confirm', the year will change 
            cy.get('[data-testid="citizen-label"]').should('have.text', content.general.citizen2023).and('be.visible')
        })
    })
    it('Year Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="year-errorListItem"]').should('have.text', content.error.yearError).click()
            cy.get('[data-testid="year-error-message"]').should('have.text', content.error.yearError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
})
