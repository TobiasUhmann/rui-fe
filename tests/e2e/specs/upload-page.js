describe('UploadPage', () => {

    it('should refresh when clicking the RUI logo', () => {

        /// GIVEN   the upload page

        cy.visit('/upload')

        /// WHEN    clicking the RUI logo

        cy.get('.title').click()

        /// THEN    the app should refresh the page

        cy.url().should('contain', '/upload')
    })

    it('should be shown when visiting it via /upload', () => {

        /// WHEN    visiting the "Upload" page

        cy.visit('/upload')

        /// THEN    the page should be shown

        /// TODO
    })

    it('should be shown when visiting it via /', () => {

        /// WHEN    visiting the "Upload" page via the root URL

        cy.visit('/')

        /// THEN    the page should be shown

        cy.url().should('contain', '/upload')

        /// TODO
    })

    it('should allow canceling an upload', () => {

        /// WHEN    clicking the "Choose File" button
        /// AND     selecting a valid "Symptax Upload ZIP"
        /// AND     clicking the "Upload" button
        /// AND     clicking the "Cancel" button in the opening confirmation dialog

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')

        cy.get('[type="submit"]').click()
        cy.get('.cancel').click()

        /// THEN    the user should stay on the page
        /// AND     the file selection should still contain the file

        /// TODO
    })

    it('Upload ZIP', () => {

        /// WHEN    clicking the "Upload" button again
        /// AND     clicking the "Overwrite" button

        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// THEN    the "Taxonomy" page should be shown
        /// AND     the uploaded ZIP's contents should be shown

        cy.url().should('contain', '/taxonomy')
        cy.get('.node-name').should('contain', 'C-1')

        /// TODO
    })
})
