describe('Upload Page', () => {

    it('Visit /upload', () => {

        /// WHEN    visiting /upload

        cy.visit('/upload')

        /// THEN    the page should be shown

        cy.get('input').contains('Upload')
    })

    it('Visit /', () => {

        /// WHEN    visiting /

        cy.visit('/')

        /// THEN    the upload page should be shown

        cy.url().should('contain', '/upload')
    })

    it('Click RUI logo', () => {

        /// GIVEN   the upload page

        cy.visit('/upload')

        /// WHEN    clicking the RUI logo

        cy.get('.title').click()

        /// THEN    the page should refresh

        cy.url().should('contain', '/upload')
    })

    it('Upload ZIP', () => {

        /// GIVEN   the upload page

        cy.visit('/upload')

        /// WHEN    clicking the "Choose File" button
        /// AND     selecting a valid Symptax upload ZIP
        /// AND     clicking the "Upload" button
        /// AND     clicking the "Overwrite" button

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')

        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// THEN    the taxonomy page should be shown
        /// AND     the uploaded ZIP's contents should be shown

        cy.url().should('contain', '/taxonomy')
        cy.get('.node-name').should('contain', 'C-1')
    })

    it('Cancel upload', () => {

        /// GIVEN   the upload page

        cy.visit('/upload')

        /// WHEN    clicking the "Choose File" button
        /// AND     selecting a valid Symptax upload ZIP
        /// AND     clicking the "Upload" button
        /// AND     clicking the "Cancel" button in the opening confirmation dialog

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')

        cy.get('[type="submit"]').click()
        cy.get('.cancel').click()

        /// THEN    the user should stay on the page
        /// AND     the file selection should still contain the file

        cy.wait(1000)
        cy.url().should('contain', '/upload')

        // TODO
    })
})
