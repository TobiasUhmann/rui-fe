describe('Taxonomy Page', () => {

    it('Load page', () => {

        //
        // WHEN uploading a ZIP
        // THEN the taxonomy page should be shown with the respective data
        //

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        cy.url().should('contain', '/taxonomy')

        cy.get('html').should('contain', 'C-1')

        cy.get('.grid').toMatchImageSnapshot()
    })

    it('Select root node', () => {

        //
        // WHEN selecting a root node
        // THEN its details should be shown
        // AND  its matches should be shown
        //

        cy.get('.grid-left').contains('A-1').click()

        cy.get('.grid-top-right').should('contain', 'A-1')
        cy.get('.grid-bottom-right').should('contain', 'A-1')

        cy.get('.grid').toMatchImageSnapshot()
    })

    it('Select sub node', () => {

        //
        // WHEN selecting a sub node
        // THEN its details should be shown
        // AND  its matches should be shown
        //

        cy.get('.grid-left').contains('Aa-1').click()

        cy.get('.grid-top-right').should('contain', 'Aa-1')
        cy.get('.grid-bottom-right').should('contain', 'Aa-1')

        cy.get('.grid').toMatchImageSnapshot()
    })

    it('Add root node', () => {

        //
        // WHEN clicking the "Add Root Node" button
        // THEN the Node Details and Matches sections should not show node information
        // AND  the New Node sections should be shown with a disabled "Create Node" button
        //

        cy.get('.grid-left button').contains('Add Root Node').click()

        cy.get('.grid-top-right').should('not.contain', 'Details')
        cy.get('.grid-bottom-right').should('not.contain', 'Matches')

        cy.get('.grid').toMatchImageSnapshot()
    })

    it.skip('Create node', () => {

        // TODO Add entities via hitting RETURN or clicking "Add"

        // TODO Remove first, middle, and last entity

        // TODO Clicking "Create Node"

        // TODO "New Node" section should be hidden

        // TODO Created node should be shown in taxonomy and be selected

        // TODO "Node Details" and "Matches" should be shown
    })
})
