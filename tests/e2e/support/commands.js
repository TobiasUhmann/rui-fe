// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload'

Cypress.Commands.add('checkHeaderAndFooter', () => {

    // "RUI - HUNTING ENTITIES" logo should be shown
    cy.contains('RUI').should('be.visible')
    cy.contains('Hunting').contains('Entities').should('be.visible')

    // LAVIS, EMPOLIS, and HSRM logos should be shown
    cy.get('[src*="logo-lavis"]').should('be.visible')
    cy.get('[src*="logo-empolis"]').should('be.visible')
    cy.get('[src*="logo-hsrm"]').should('be.visible')

    // Nav links should be shown
    cy.contains('Upload').get('[href="/upload"]').should('be.visible')
    cy.contains('Taxonomy').get('[href="/taxonomy"]').should('be.visible')
})
