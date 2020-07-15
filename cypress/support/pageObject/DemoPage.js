const sUrl = 'https://www.seleniumeasy.com/test/'
const sMenuListForms = 'ul ul li.tree-branch:nth-child(1)'
const sListFormSubmit = '.tree-branch li [href="./input-form-demo.html"]'

class DemoPage{
    static goToWeb(){
        return cy.visit(sUrl)
    }

    static getMenuListForms(){
        return cy.get(sMenuListForms)
    }

    static getListFormSubmit(){
        return cy.get(sListFormSubmit)
    }
}

export default DemoPage