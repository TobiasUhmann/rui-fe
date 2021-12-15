describe('PredictionsPage', () => {

    it('should navigate to home page when clicking the RUI logo', () => {

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

    it('should allow uploading a ZIP', () => {

        /// WHEN    uploading a ZIP

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// THEN    the user should be referred to the taxonomy page
        /// AND     the ZIP's taxonomy should be shown

        cy.url().should('contain', '/taxonomy')
        cy.get('html').should('contain', 'C-1')

        /// TODO
    })
})
