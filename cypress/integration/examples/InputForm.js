/// <reference types="Cypress" />

describe('Testing and input form',function(){
    it('Fill the entire form',function(){
        cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('ul ul li.tree-branch:nth-child(1)').click({force:true})
        cy.get('.tree-branch li [href="./input-form-demo.html"]').click({force:true})

        //This is to catch a uncaught exception of the application not from cypress
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('$(...).bootstrapValidator')
            return false
          })

        cy.get('[name="first_name"]').click().type('Gabriela').should('have.value','Gabriela')
        cy.get('[name="last_name"]').click().type('Lopez').should('have.value','Lopez')
        cy.get('[name="email"]').click().type('lopezg@jupiter.com').should('have.value','lopezg@jupiter.com')
        cy.get('[name="phone"]').click().type('5535820366').should('have.value','5535820366')
        cy.get('[name="address"]').click().type('Las Lomas, Av Pisco #30').should('have.value','Las Lomas, Av Pisco #30')
        cy.get('[name="city"]').click().type('Hoboken').should('have.value','Hoboken')
        cy.get('[name="state"]').select('New Jersey').should('have.value','New Jersey')
        cy.get('[name="zip"]').click().type('07030').should('have.value','07030')
        cy.get('[name="website"]').click().type('talktoyou.com').should('have.value','talktoyou.com')
        cy.get('div.radio:last-child input').check().should('be.checked')
        cy.get('[name="comment"]').click().type('This is a fabolous project').should('include.value','fabolous')
        cy.get('[type="submit"]').click()

        //Validating
        cy.get('[name="first_name"]').should('have.attr','placeholder','First Name')
        cy.get('[name="last_name"]').should('have.attr','placeholder','Last Name')
        cy.get('[name="email"]').should('have.attr','placeholder','E-Mail Address')
        cy.get('[name="phone"]').should('have.attr','placeholder','(845)555-1212')
        cy.get('[name="address"]').should('have.attr','placeholder','Address')
        cy.get('[name="city"]').should('have.attr','placeholder','city')
        cy.get('[name="state"]').should('have.value',' ')
        cy.get('[name="zip"]').should('have.attr','placeholder','Zip Code')
        cy.get('[name="website"]').should('have.attr','placeholder','Website or domain name')
        cy.get('div.radio:last-child input').should('not.be.checked')
        cy.get('[name="comment"]').should('have.attr','placeholder','Project Description')
    })
})