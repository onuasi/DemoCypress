/// <reference types="Cypress" />
import InputForm from '../../support/pageObject/InputFormPage'
import DemoPage from '../../support/pageObject/DemoPage'

describe('Testing and input form',function(){
    it('Fill the entire form',function(){
        DemoPage.goToWeb()
        DemoPage.getMenuListForms().click({force:true})
        DemoPage.getListFormSubmit().click({force:true})

        //This is to catch a uncaught exception of the application not from cypress
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('$(...).bootstrapValidator')
            return false
          })

        InputForm.getFirstName().click().type('Gabriela').should('have.value','Gabriela')
        .and('have.attr','placeholder','First Name')
        InputForm.getLastName().click().type('Lopez').should('have.value','Lopez')
        .and('have.attr','placeholder','Last Name')
        InputForm.getEmail().click().type('lopezg@jupiter.com').should('have.value','lopezg@jupiter.com')
        .and('have.attr','placeholder','E-Mail Address')
        InputForm.getPhone().click().type('5535820366').should('have.value','5535820366')
        .and('have.attr','placeholder','(845)555-1212')
        InputForm.getAddress().click().type('Las Lomas, Av Pisco #30').should('have.value','Las Lomas, Av Pisco #30')
        .and('have.attr','placeholder','Address')
        InputForm.getCity().click().type('Hoboken').should('have.value','Hoboken')
        .and('have.attr','placeholder','city')
        InputForm.getState().select('New Jersey').should('have.value','New Jersey')
        InputForm.getZip().click().type('07030').should('have.value','07030')
        .and('have.attr','placeholder','Zip Code')
        InputForm.getWebsite().click().type('talktoyou.com').should('have.value','talktoyou.com')
        .and('have.attr','placeholder','Website or domain name')
        InputForm.getRadioButton().check().should('be.checked')
        InputForm.getDescription().click().type('This is a fabolous project').should('include.value','fabolous')
        .and('have.attr','placeholder','Project Description')
        InputForm.getSubmit().click()

        //Validating some fields after click
        InputForm.getFirstName().should('have.value','')
        InputForm.getLastName().should('have.value','')
        InputForm.getEmail().should('have.value','')
        InputForm.getPhone().should('have.value','')
        InputForm.getAddress().should('have.value','')
        InputForm.getCity().should('have.value','')
        InputForm.getState().should('have.value',' ')
        InputForm.getZip().should('have.value','')
        InputForm.getWebsite().should('have.value','')
        InputForm.getRadioButton().should('not.be.checked')
        InputForm.getDescription().should('have.value','')

    })
})