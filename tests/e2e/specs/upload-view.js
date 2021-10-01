describe('Upload Page', () => {

    it('Load page', () => {

        // WHEN visiting the "Upload" page
        // THEN the page should be shown

        cy.visit('/upload')

        // TODO
    })

    it('Load page via root URL', () => {

        // WHEN visiting the "Upload" page via the root URL
        // THEN the page should be shown

        cy.visit('/')

        cy.url().should('contain', '/upload')

        // TODO
    })

    it('Cancel upload', () => {

        // WHEN clicking the "Choose File" button
        // AND  selecting a valid "Symptax Upload ZIP"
        // AND  clicking the "Upload" button
        // AND  clicking the "Cancel" button in the opening confirmation dialog
        // THEN the user should stay on the page
        // AND  the file selection should still contain the file

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')

        cy.get('[type="submit"]').click()
        cy.get('.cancel').click()

        // TODO
    })

    it('Upload ZIP', () => {

        // WHEN clicking the "Upload" button again
        // AND  clicking the "Overwrite" button
        // THEN the "Taxonomy" page should be shown
        // AND  the uploaded ZIP's contents should be shown

        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        cy.url().should('contain', '/taxonomy')
        cy.get('.node-name').should('contain', 'C-1')

        // TODO
    })
})
