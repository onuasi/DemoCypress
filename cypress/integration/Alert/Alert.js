/// <reference types="Cypress" />
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

Given ('I open JavaScript alert page',()=>{
    cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('.navbar-right>li:nth-child(2)').click({force:true})
        cy.get('.dropdown-menu [href="./javascript-alert-box-demo.html"]').click({force:true})
})

//I wanted to set check the window message and selected option in another two steps 
//but after some tries it looks like its not possible with cy.on
when ('I open {string} and click {string}',(sTypeBox, sOption) => {
    switch(sTypeBox) {
        case "alertBox":
            cy.get('.text-left>:nth-child(4) .btn').click()
            cy.on("window:alert", sText => {
                expect(sText).to.equal('I am an alert box!')
            })
          break;
        case "confirmBox":
            cy.get('.text-left>:nth-child(5) .btn').click()
            cy.on("window:confirm", sText => {
                expect(sText).to.equal('Press a button!')
            })
            if(sOption.toUpperCase() == "CANCEL")
                cy.on('window:confirm',() => false)
            else
                cy.on('window:confirm',() => true)
          break;
        case "promptBox":
            cy.get('.text-left>:nth-child(6) .btn').click()
            break;
        default:
          expect(false).to.be(false)
      }
})

Then('I should see a text with {string} on it', sStatus => {
    cy.get('#confirm-demo').then((el) => {
        expect(el.text()).to.contain('You pressed ' + sStatus)
    })
})

when('I write on the prompt {string}', sName => {
    cy.window().then(win => {
        cy.stub(win, 'prompt').returns(sName)
        //click the same button to close the prompt
        cy.get('.text-left>:nth-child(6) .btn').click()
    })
})

Then('I should see a text with {string} on the page', sName => {
    cy.get('#prompt-demo').then(function(el){
        expect(el.text()).to.contain(sName)
    })
})