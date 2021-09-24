describe('Taxonomy Page', () => {

    it('Load page', () => {
        cy.visit('/taxonomy')

        // Header and Footer should be shown
        cy.checkHeaderAndFooter()

        // "Upload" nav link should be highlighted
        cy.get('.router-link-active').should('contain.text', 'Taxonomy')
    })

    it.skip('Load page w/o data', () => {

        // TODO "Taxonomy" section should be shown with "Add Root Node" button only

        // TODO "Add Node", "Node Details", and "Matches" sections should not be shown
    })

    it.skip('Load page with data', () => {

        // TODO "Taxonomy" section should be shown with data and "Add Root Node" button

        // TODO "Add Node", "Node Details", and "Matches" sections should not be shown
    })

    it.skip('Select collapsed node', () => {

        // TODO selected node should be highlighted and expanded

        // TODO node details should be shown

        // TODO node matches should be shown

        // TODO "Add Node" section should not be shown
    })

    it.skip('Select expanded node', () => {

        // TODO selected node should still be highlighted but collapsed

        // TODO node information should still be shown
    })

    it.skip('Select sub node', () => {

        // TODO node should be highlighted

        // TODO node details and matches should be shown
    })

    it.skip('Add root node', () => {

        // TODO should not show "Node Details" or "Matches" sections

        // TODO should show "New Node" section with disabled "Create Node" button

        // TODO clicking "Create Node" should have no effect
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
