describe('Taxonomy Page', () => {

    it('Load page', () => {

        //
        // Upload ZIP
        // Should lead to taxonomy page
        //

        cy.visit('/upload')

        cy.get('input[type="file"]').attachFile('symptax_upload_v7_random.zip')
        
        // click "Upload"
        cy.get('[type="submit"]').click()
        cy.get('.continue').click()

        cy.url().should('contain', '/taxonomy')
        cy.get('html').should('contain', 'C-1')

        cy.get('html').toMatchSnapshot()

        //
        // Expand root node
        // Should show node details
        //

        cy.get(':nth-child(1) > .node-name').click()

        cy.get('.predictions > table > :nth-child(1) > td').should('contain', 2)

        cy.get('html').toMatchSnapshot()
    })

    it.skip('Select collapsed root node', () => {
        cy.visit('/taxonomy')

        cy.get(':nth-child(1) > .node-name').click()

        cy.get('html').toMatchSnapshot()
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
