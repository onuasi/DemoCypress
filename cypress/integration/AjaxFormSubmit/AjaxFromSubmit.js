/// <reference types="Cypress" />
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
    
Given('I visit Ajax form site',() => {
    cy.visit('https://www.seleniumeasy.com/test/')
    cy.get('ul ul li.tree-branch:nth-child(1)').click({force:true})
    cy.get('.tree-branch li [href="./ajax-form-submit-demo.html"]').click({force:true})
})

Then('I select the field {string}',sFieldName => {
    cy.get('#' + sFieldName).click()
})

Then('I write {string} on it', sTextForField => {
    cy.focused().type(sTextForField)
})

When('I click submit',() => {
    cy.server()
    cy.route('POST', '*/php/first-form-demo.php').as('postForm')
    cy.get('#btn-submit').click()
})

Then('I can see an API code with {int}', nApiCode => {
        cy.wait('@postForm').its('status').should('eq',nApiCode)
})

Then('I can see the {string} image', sImageName => {
    cy.get('#submit-control img').should('have.attr','src', sImageName)
})

Then('I can see the word {string} in my screen',() => {
    cy.wait(1000)
    cy.get('#submit-control').then((el) => {
        expect(el.text()).to.include('Success')
    })
})

Then('Name field is highlighted', () => {
    cy.get('#title').should('have.css','border', '1px solid rgb(255, 0, 0)')
})