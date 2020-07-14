/// <reference types="Cypress" />

describe('Throw javascript pop ups',function(){
    beforeEach(function(){
        cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('.navbar-right>li:nth-child(2)').click({force:true})
        cy.get('.dropdown-menu [href="./javascript-alert-box-demo.html"]').click({force:true})
    })
    it('Alert, confirm and prompt boxes are displayed',function(){
        cy.get('.text-left>:nth-child(4) .btn').click().then(function(text){
           
        })
        cy.on("window:alert",(text) =>{
            expect(text).to.equal('I am an alert box!')
        })

        cy.get('.text-left>:nth-child(5) .btn').click()
        cy.on('window:confirm', () => true)
        cy.once("window:confirm",(str)=>{
            expect(str).to.equal('Press a button!')
        })
        cy.get('#confirm-demo').then((el)=>{
            expect(el.text()).to.contain('You pressed OK!')
        })

        cy.get('.text-left>:nth-child(6) .btn').click()
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('Carlos')
            //click the same button to close the prompt
            cy.get('.text-left>:nth-child(6) .btn').click()
        })
        cy.get('#prompt-demo').then(function(el){
            expect(el.text()).to.contain('Carlos')
        })
        
    })

    it('Cancel confirmation box',function(){
        cy.get('.text-left>:nth-child(5) .btn').click()
        //This will choose cancel on the confirmation window
        cy.on('window:confirm', () => false)
        cy.get('#confirm-demo').then((el)=>{
            expect(el.text()).to.contain('You pressed Cancel!')
        })
    })
})