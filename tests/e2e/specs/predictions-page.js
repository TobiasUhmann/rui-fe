describe('PredictionsPage', () => {

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
