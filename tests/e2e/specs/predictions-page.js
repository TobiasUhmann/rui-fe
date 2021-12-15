describe('Predictions Page', () => {

    it('Click RUI logo', () => {

        /// GIVEN   the predictions page

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        cy.get(':nth-child(1) > .node-name').click()
        cy.get('.predictions a').click()

        cy.url().should('contain', '/predictions')

        /// WHEN    clicking the RUI logo

        cy.get('.title').click()

        /// THEN    the app should navigate to the home page

        cy.url().should('contain', '/upload')
    })
})
