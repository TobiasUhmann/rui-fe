describe('TaxonomyPage', () => {

    it('should show the loaded data', () => {

        /// WHEN    uploading a ZIP

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// THEN    the taxonomy page should be shown with the respective data

        cy.url().should('contain', '/taxonomy')

        cy.get('html').should('contain', 'C-1')

        /// TODO
    })

    it("should show a root node's data when it is selected", () => {

        /// WHEN    selecting a root node

        cy.get('.grid-left').contains('A-1').click()

        /// THEN    its details should be shown
        /// AND     its matches should be shown

        cy.get('.grid-top-right').should('contain', 'A-1')
        cy.get('.grid-bottom-right').should('contain', 'A-1')

        /// TODO
    })

    it("should show a sub node's data when it is selected", () => {

        /// WHEN    selecting a sub node

        cy.get('.grid-left').contains('Aa-1').click()

        /// THEN    its details should be shown
        /// AND     its matches should be shown

        cy.get('.grid-top-right').should('contain', 'Aa-1')
        cy.get('.grid-bottom-right').should('contain', 'Aa-1')

        /// TODO
    })

    it('should allow adding a root node', () => {

        /// WHEN    clicking the "Add Root Node" button

        cy.get('.grid-left button').contains('Add Root Node').click()

        /// THEN    the "Node Details" and "Matches" sections should not show node information
        /// AND     the "New Node" section should be shown with a disabled "Create Node" button

        cy.get('.grid-top-right').should('not.contain', 'Details')
        cy.get('.grid-bottom-right').should('not.contain', 'Matches')

        /// TODO
    })

    it('should allow adding entities', () => {

        /// WHEN    adding an entity by hitting RETURN
        /// AND     adding an entity by clicking the "Add" button
        /// AND     clicking the "Add" button without having entered an entity text

        cy.get('.grid-top-right input').type('foo{enter}')

        /// THEN    the two new entities should be shown
        /// AND     the "Create Node" button should become clickable

        cy.get('.grid-top-right').should('contain', 'foo')

        cy.get('.grid-top-right input').type('bar')
        cy.get('.grid-top-right').contains('Add').click()
        cy.get('.grid-top-right').should('contain', 'bar')

        cy.get('.grid-top-right').contains('Add').click()
        cy.get('.grid-top-right').find('li').should('have.length', 3)

        /// TODO
    })

    it('should allow deleting entities', () => {

        /// WHEN    deleting all entities from the "New Node" section

        cy.get('.grid-top-right button').contains('Delete').first().click()
        cy.get('.grid-top-right button').contains('Delete').click()

        /// THEN    the "Create Node" button should not be clickable anymore

        cy.get('.grid-top-right').find('li').should('have.length', 1)

        /// TODO
    })

    it('should allow adding a new node', () => {

        /// WHEN    adding an entity to the "New Node" section
        /// AND     clicking the "Create Node" button

        cy.get('.grid-top-right input').type('baz{enter}')

        cy.get('.grid-top-right button').contains('Create Node').click()

        /// THEN    the "Node Details" section should not be shown anymore
        /// AND     the new node should be shown in the taxonomy

        cy.get('.grid-top-right').should('not.contain', 'New')
        cy.get('.grid-left').should('contain', 'baz')

        /// TODO
    })
})
