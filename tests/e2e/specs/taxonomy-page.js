describe('Taxonomy Page', () => {

    it('Load page', () => {

        // WHEN uploading a ZIP
        // THEN the "Taxonomy" page should be shown with the respective data

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        cy.url().should('contain', '/taxonomy')

        cy.get('html').should('contain', 'C-1')

        // TODO
    })

    it('Select root node', () => {

        // WHEN selecting a root node
        // THEN its details should be shown
        // AND  its matches should be shown

        cy.get('.grid-left').contains('A-1').click()

        cy.get('.grid-top-right').should('contain', 'A-1')
        cy.get('.grid-bottom-right').should('contain', 'A-1')

        // TODO
    })

    it('Select sub node', () => {

        // WHEN selecting a sub node
        // THEN its details should be shown
        // AND  its matches should be shown

        cy.get('.grid-left').contains('Aa-1').click()

        cy.get('.grid-top-right').should('contain', 'Aa-1')
        cy.get('.grid-bottom-right').should('contain', 'Aa-1')

        // TODO
    })

    it('Add root node', () => {

        // WHEN clicking the "Add Root Node" button
        // THEN the "Node Details" and "Matches" sections should not show node information
        // AND  the "New Node" section should be shown with a disabled "Create Node" button

        cy.get('.grid-left button').contains('Add Root Node').click()

        cy.get('.grid-top-right').should('not.contain', 'Details')
        cy.get('.grid-bottom-right').should('not.contain', 'Matches')

        // TODO
    })

    it('Add entities', () => {

        // WHEN adding an entity by hitting RETURN
        // AND  adding an entity by clicking the "Add" button
        // AND  clicking the "Add" button without having entered an entity text
        // THEN the two new entities should be shown
        // AND  the "Create Node" button should become clickable

        cy.get('.grid-top-right input').type('foo{enter}')
        cy.get('.grid-top-right').should('contain', 'foo')

        cy.get('.grid-top-right input').type('bar')
        cy.get('.grid-top-right').contains('Add').click()
        cy.get('.grid-top-right').should('contain', 'bar')

        cy.get('.grid-top-right').contains('Add').click()
        cy.get('.grid-top-right').find('li').should('have.length', 3)

        // TODO
    })

    it('Delete entities', () => {

        // WHEN deleting all entities from the "New Node" section
        // THEN the "Create Node" button should not be clickable anymore

        cy.get('.grid-top-right button').contains('Delete').first().click()
        cy.get('.grid-top-right button').contains('Delete').click()

        cy.get('.grid-top-right').find('li').should('have.length', 1)

        // TODO
    })

    it('Create node', () => {

        // WHEN adding an entity to the "New Node" section
        // AND  clicking the "Create Node" button
        // THEN the "Node Details" section should not be shown anymore
        // AND  the new node should be shown in the taxonomy

        cy.get('.grid-top-right input').type('baz{enter}')

        cy.get('.grid-top-right button').contains('Create Node').click()

        cy.get('.grid-top-right').should('not.contain', 'New')
        cy.get('.grid-left').should('contain', 'baz')

        // TODO
    })
})
