describe('Upload Page', () => {

    it('Load page', () => {
        cy.visit('/upload')

        cy.get('body').toMatchSnapshot()
    })

    it('Load page via root URL', () => {
        cy.visit('/')

        // should lead to Upload Page
        cy.url().should('contain', '/upload')

        cy.get('body').toMatchSnapshot()
    })

    it('Upload valid ZIP', () => {
        cy.visit('/upload')

        cy.fixture('symptax_upload_v7_random.zip').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent,
                fileName: 'symptax_upload_v7_random.zip'
            })

            // click "Upload"
            cy.get('[type="submit"]').click()
            cy.get('.continue').click()

            // should lead to Taxonomy Page
            cy.url().should('contain', '/taxonomy')

            cy.get('.node-name').should('contain', 'C-1')
            cy.get('body').toMatchSnapshot()
        })
    })
})
