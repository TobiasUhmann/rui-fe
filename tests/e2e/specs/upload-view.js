describe('Upload Page', () => {

    it('Load page', () => {
        cy.visit('/upload')

        // header and footer should be shown
        cy.checkHeaderAndFooter()

        // "Upload" nav link should be highlighted
        cy.get('.router-link-active').should('contain.text', 'Upload')

        // TODO upload button should be disabled
    })

    it('Load page via root URL', () => {
        cy.visit('/')

        // should lead to Upload Page
        cy.url().should('contain', '/upload')
    })

    it('Upload valid ZIP', () => {
        cy.visit('/upload')

        cy.fixture('symptax_upload_v6_2_random.zip').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent,
                fileName: 'symptax_upload_v6_2_random.zip'
            })

            // click "Upload"
            cy.get('[type="submit"]').click()
            cy.get('.continue').click()

            // should lead to Taxonomy Page
            cy.url().should('contain', '/taxonomy')

            // Taxonomy Page should show uploaded data
            cy.get(':nth-child(1) > .node-name').should('contain', 'A-1')
            cy.get(':nth-child(2) > .node-name').should('contain', 'B-1')
            cy.get(':nth-child(3) > .node-name').should('contain', 'C-1')
        })
    })

    it.skip('Upload invalid file', () => {
        // TODO
    })

    it.skip('Cancel upload, then do upload', () => {
        // TODO
    })
})
