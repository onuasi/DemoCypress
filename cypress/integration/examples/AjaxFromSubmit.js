/// <reference types="Cypress" />

describe('Testing Ajax form Submit',function(){
    beforeEach(function(){
        cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('ul ul li.tree-branch:nth-child(1)').click({force:true})
        cy.get('.tree-branch li [href="./ajax-form-submit-demo.html"]').click({force:true})
    })
    it('Fill and send form',function(){
        cy.get('#title').type('Jorge').should('have.value','Jorge')
        cy.get('#description').type('Working as a banker in Bank of America \
        with 10 years of expirience, bringing ....').should('include.value','Working as a')
        cy.server()
        cy.route('POST', '*/php/first-form-demo.php').as('postForm')
        cy.get('#btn-submit').click()
        cy.wait('@postForm').its('status').should('eq',200)
        cy.get('#submit-control img').should('have.attr','src','LoaderIcon.gif')
        cy.wait(1000)
        //With the then it works, but if a try a should it doesnt
        cy.get('#submit-control').then((el)=>{
            expect(el.text()).to.include('Success')

        })
    })
    it('Send form without name',function(){
        cy.get('#description').type('Working as a banker in Bank of America \
        with 10 years of expirience, bringing ....').should('include.value','Working as a')
        cy.get('#btn-submit').click()
        cy.get('#title').should('have.css','border', '1px solid rgb(255, 0, 0)')
    })
})