describe('Predictions Page', () => {

    it('Upload ZIP', () => {

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        cy.url().should('contain', '/taxonomy')
        cy.get('html').should('contain', 'C-1')

        // TODO
    })

    it('Load page', () => {

        // WHEN loading the "Predictions" page for a certain node via URL
        // THEN the page should be shown with the node's predictions

        cy.visit('/predictions/0')

        cy.contains('Porta lorem').should('exist')

        // TODO
    })

    it('Dismiss prediction', () => {

        // WHEN dismissing a prediction
        // THEN the prediction should vanish

        cy.get('button').contains('Dismiss').first().click()

        cy.contains('Erat imperdiet').should('not.exist')

        // TODO
    })
})
