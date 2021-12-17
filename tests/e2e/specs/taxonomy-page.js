describe('Taxonomy Page', () => {

    it('Visit /taxonomy', () => {

        /// WHEN    visiting /taxonomy

        cy.visit('/taxonomy')

        /// THEN    the page should be shown

        cy.get('h1').contains('Taxonomy')
    })

    it('Visit /taxonomy with nodes', () => {

        /// GIVEN   a backend with nodes

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// WHEN    visiting /taxonomy

        cy.visit('/taxonomy')

        /// THEN    the taxonomy page should show the data

        cy.get('html').should('contain', 'A-1')
    })

    it('Click RUI logo', () => {

        /// GIVEN   the taxonomy page

        cy.visit('/taxonomy')

        /// WHEN    clicking the RUI logo

        cy.get('.title').click()

        /// THEN    the app should navigate to the home page

        cy.url().should('contain', '/upload')
    })

    it('Select root node', () => {

        /// GIVEN   a backend with nodes

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// WHEN    selecting a root node

        cy.get('.grid-left').contains('A-1').click()

        /// THEN    its details should be shown
        /// AND     its matches should be shown

        cy.get('.grid-top-right').should('contain', 'A-1')
        cy.get('.grid-bottom-right').should('contain', 'A-1')

        /// THEN    the selected node should not be expanded and the sub nodes should not be visible

        cy.get('.grid-left').should('not.contain', 'Aa-1')
    })

    it('Select sub node', () => {

        /// GIVEN   a backend with nodes

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// WHEN    selecting a sub node

        cy.get('.grid-left').contains('A-1').parent().find('.marker').click()
        cy.get('.grid-left').contains('Aa-1').click()

        /// THEN    its details should be shown
        /// AND     its matches should be shown

        cy.get('.grid-top-right').should('contain', 'Aa-1')
        cy.get('.grid-bottom-right').should('contain', 'Aa-1')
    })

    it('Add root node', () => {

        /// WHEN    clicking the "Add Root Node" button

        cy.get('.grid-left button').contains('Add Root Node').click()

        /// THEN    the "Node Details" and "Matches" sections should not show node information
        /// AND     the "New Node" section should be shown with a disabled "Create Node" button

        cy.get('.grid-top-right').should('not.contain', 'Details')
        cy.get('.grid-bottom-right').should('not.contain', 'Matches')
    })

    it('Create child node', () => {

        /// GIVEN   a backend with nodes

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// WHEN    selecting a node
        /// AND     clicking the "Add Child Node" button in the "Node Details" section
        /// AND     adding an entity to the "New Node" section
        /// AND     clicking the "Create Node" button

        cy.get('.grid-left').contains('A-1').click()
        cy.get('.grid-top-right').contains('Add Child Node').click()
        cy.get('.grid-top-right input').type('baz{enter}')
        cy.get('.grid-top-right button').contains('Create Node').click()

        /// THEN    the "New Node" section should not be shown anymore
        /// AND     the new node should be shown in the taxonomy

        cy.get('.grid-top-right').should('not.contain', 'New')

        cy.get('.grid-left').contains('A-1').parent().find('.marker').click()
        cy.get('.grid-left').should('contain', 'baz')
    })

    it('Add entities to node', () => {

        /// GIVEN   a backend with nodes

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        /// WHEN    selecting a node
        /// WHEN    adding an entity by hitting RETURN
        /// AND     adding an entity by clicking the "Add" button
        /// AND     clicking the "Add" button without having entered an entity text

        cy.get('.grid-left').contains('A-1').click()

        cy.get('.grid-top-right input').type('foo{enter}')

        cy.get('.grid-top-right input').type('bar')
        cy.get('.grid-top-right').contains('Add').click()

        cy.get('.grid-top-right').contains('Add').click()

        /// THEN    the two new entities should be shown
        /// AND     the "Create Node" button should become clickable

        cy.get('.grid-top-right').should('contain', 'foo')
        cy.get('.grid-top-right').should('contain', 'bar')

        // existing entity + 2 new entities + "Add entity" row
        cy.get('.grid-top-right').find('li').should('have.length', 4)
    })

    it('Hover over taxonomy item', () => {

        /// GIVEN   a backend with nodes

        /// WHEN    hovering over an item in the taxonomy

        /// THEN    the item should be highlighted

    })

    it('Hover over expand/collapse button', () => {

        /// GIVEN   a backend with nodes

        /// WHEN    hovering over an item's expand/collapse button

        /// THEN    the expand/collapse button should be highlighted

    })
})
