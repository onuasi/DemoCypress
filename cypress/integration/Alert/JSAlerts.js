/// <reference types="Cypress" />
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

Given ('I open JavaScript alert page',()=>{
    cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('.navbar-right>li:nth-child(2)').click({force:true})
        cy.get('.dropdown-menu [href="./javascript-alert-box-demo.html"]').click({force:true})
})

//I wanted to set check the window message and selected option in another two steps 
//but after some tries it looks like its not possible with cy.on
when ('I open {string} and click {string}',(typeBox,option)=>{
    switch(typeBox) {
        case "alertBox":
            cy.get('.text-left>:nth-child(4) .btn').click()
            cy.on("window:alert",(text) =>{
                expect(text).to.equal('I am an alert box!')
            })
          break;
        case "confirmBox":
            cy.get('.text-left>:nth-child(5) .btn').click()
            cy.on("window:confirm",(text) =>{
                expect(text).to.equal('Press a button!')
            })
            if(option.toUpperCase() == "CANCEL")
                cy.on('window:confirm',()=>false)
            else
                cy.on('window:confirm',()=>true)
          break;
        case "promptBox":
            cy.get('.text-left>:nth-child(6) .btn').click()
            break;
        default:
          expect(false).to.be(false)
      }
})

Then('I should see a text with {string} on it',(status)=>{
    cy.get('#confirm-demo').then((el)=>{
        expect(el.text()).to.contain('You pressed ' + status)
    })
})

when('I write on the prompt {string}',name=>{
    cy.window().then(win => {
        cy.stub(win, 'prompt').returns(name)
        //click the same button to close the prompt
        cy.get('.text-left>:nth-child(6) .btn').click()
    })
})

Then('I should see a text with {string} on the page', name=>{
    cy.get('#prompt-demo').then(function(el){
        expect(el.text()).to.contain(name)
    })
})