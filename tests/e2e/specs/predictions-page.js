describe('Predictions Page', () => {

    it('Load Page', () => {
        cy.visit('/predictions/0')

        // Header and Footer should be shown
        cy.checkHeaderAndFooter()

        // No nav link should be highlighted
        cy.get('.router-link-active').should('not.exist')
    })
})
