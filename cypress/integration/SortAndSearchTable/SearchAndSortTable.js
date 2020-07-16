/// <reference types="Cypress" />
import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps'

Given('I visit the Sort and Search table',() => {
    cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('.nav.navbar-nav:nth-child(1)>li:nth-child(3)').click({force:true})
        cy.get('.dropdown-menu [href="./table-sort-search-demo.html"]').
           click({force:true})
})

When('I write {string} in the Search field', sCity => {
    cy.get('[type="search"]').type(sCity)
})

Then('I should see {int} entries on the table', nEntries => {
    cy.get('tbody tr').should('have.length', nEntries)
})

And('I should the message {string}', sMessage => {
    cy.get('tr td').then(function(element){
        expect(element.text().toUpperCase()).to.include(sMessage.toUpperCase())
    })
})

When ('I click on {int} page button', nButton => {
    cy.get('[data-dt-idx="' + nButton + '"]').click()
})

Then ('I see the {int} page of the table', nPage => {
    cy.get('[data-dt-idx="' + nPage + '"]').should('have.class', 'current')
    cy.get('#example_info').should('have.text','Showing ' + (1+(nPage-1)*10) + ' to ' 
    + 10*nPage + ' of 32 entries')
})

When ('I click on {string} page button', sNextPrevious => {
    cy.get('#example_' + sNextPrevious).click()
})

When ('I click select {int} entries to show', nEntries => {
    cy.get('[name="example_length"]').select(nEntries.toString())
})

And('The table is sorted from {string}', sSortingType => {
    if(sSortingType.toUpperCase() == 'A-Z')
        cy.get('th:nth-child(1)').should('have.class','sorting_asc')
    if(sSortingType.toUpperCase() == 'Z-A')
        cy.CheckDescendentSortAlpha('tbody tr td:nth-child(1)')
})

When ('I click on Name/Age/Salary header on column {int}, {int} time(s)', (nColumnNumber, nClickN) => {
    let sCurrentHeader = 'th:nth-child(' + nColumnNumber + ')'
    for(let i=0; i<nClickN; i++){
        cy.get(sCurrentHeader).click()
    }    
})

Then ('The table is sorted {string} by Salary/Age header of column {int}', (sSortOrder, nColumn) => {
    cy.CheckSortNum('tr td:nth-child('+ nColumn + ')',sSortOrder.toLowerCase())
})
