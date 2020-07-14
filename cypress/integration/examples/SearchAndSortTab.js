
/// <reference types="Cypress" />

describe('SearchAndSortTab', function(){
    beforeEach(function(){
        cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('.nav.navbar-nav:nth-child(1)>li:nth-child(3)').click({force:true})
        cy.get('.dropdown-menu [href="./table-sort-search-demo.html"]').
           click({force:true})
    })
       it('Search Existing Office', function(){

           cy.get('[type="search"]').type('new york')
           cy.get('tbody tr').should('have.length','6')
       })

       it('Search Non Exisiting Office', function(){
        cy.get('[type="search"]').type('caracas')
        cy.get('tr td').then(function(element){
            expect(element.text()).to.include('No matching')
        })
       })

       it('Navigation buttons', function(){
           cy.get('[data-dt-idx="2"]').click()
           cy.get('[data-dt-idx="2"]').should('have.class', 'current')
           cy.get('#example_info').should('have.text','Showing 11 to 20 of 32 entries')
           cy.get('#example_previous').click()
           cy.get('[data-dt-idx="1"]').should('have.class', 'current')
           cy.get('#example_info').should('have.text','Showing 1 to 10 of 32 entries')
           cy.get('#example_next').click()
           cy.get('[data-dt-idx="2"]').should('have.class', 'current')
       })

       it('Entry and table button', function(){
            cy.get('[name="example_length"]').select('25')
            cy.get('tbody tr').should('have.length','25')
            cy.get('th:nth-child(1)').click().should('have.class','sorting_desc')
            //Checking order for name
            cy.CheckDescendentSortAlpha('tbody tr td:nth-child(1)')
            //Check sort descendent in age column
            cy.get('th:nth-child(4)').click().click()
            cy.CheckSortNum('tr td:nth-child(4)','downward')
            //Check sort upward in salary
            cy.get('th:nth-child(6)').click()
            cy.CheckSortNum('tr td:nth-child(6)','upward')
       })
})