const sFirtsName = '[name="first_name"]'
const sLastName = '[name="last_name"]'
const sEmail = '[name="email"]'
const sPhone = '[name="phone"]'
const sAddress = '[name="address"]'
const sCity = '[name="city"]'
const sState = '[name="state"]'
const sZip = '[name="zip"]'
const sWebsite = '[name="website"]'
const sRadioButton = 'div.radio:last-child input'
const sDescription = '[name="comment"]'
const sSubmit = '[type="submit"]'

class InputForm{
    
    static getFirstName(){
        return cy.get(sFirtsName)
    }
    static getLastName(){
        return cy.get(sLastName)
    }
    static getEmail(){
        return cy.get(sEmail)
    }
    static getPhone(){
        return cy.get(sPhone)
    }
    static getAddress(){
        return cy.get(sAddress)
    }
    static getCity(){
        return cy.get(sCity)
    }
    static getState(){
        return cy.get(sState)
    }
    static getZip(){
        return cy.get(sZip)
    }
    static getWebsite(){
        return cy.get(sWebsite)
    }
    static getRadioButton(){
        return cy.get(sRadioButton)
    }
    static getDescription(){
        return cy.get(sDescription)
    }
    static getSubmit(){
        return cy.get(sSubmit)
    }
}

export default InputForm