///<reference types="Cypress" />


describe('POST',function(){

    it('Fill and send form',function(){
        cy.visit('https://example.cypress.io/commands/network-requests')
        cy.server()
        cy.route('POST', '/comments').as('post')
        cy.get('.network-post').click()
        cy.wait('@post').its('status').should('eq',201)
    })
})