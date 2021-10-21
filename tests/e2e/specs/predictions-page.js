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
})
