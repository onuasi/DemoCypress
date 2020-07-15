class DualList {
    
    getListA(){
        return cy.get('.pickData')
    }

    getListB(){
        return cy.get('.pickListResult')
    }

    getAdd(){
        return cy.get('.pAdd')
    }

    getAddAll(){
        return cy.get('.pAddAll')
    }

    getRemove(){
        return cy.get('.pRemove')
    }

    getRemoveAll(){
        return cy.get('.pRemoveAll')
    }
}
export default DualList;