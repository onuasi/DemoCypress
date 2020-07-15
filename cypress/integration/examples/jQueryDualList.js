/// <reference types="Cypress" />
import DualList from "../../support/pageObject/DualListPage"

describe('jQuery list',function(){
    beforeEach(function(){
        cy.fixture('ListElement').then(function(name){
            this.name = name
        })
        this.DualListPage = new DualList()
        cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('.navbar-right .dropdown:nth-child(3)').click({force:true})
        cy.get('.dropdown-menu [href="./jquery-dual-list-box-demo.html"]').click({force:true})
    })
    it('AddRemove elements',function(){
        this.DualListPage.getListA().select(this.name.nameList[0])
        this.DualListPage.getAdd().click()
        //Check that name is not in the pickData list
        cy.InTheList(false,'.pickData option',this.name.nameList[0])
        //Check that name is in the pickListResult
        cy.InTheList(true,'.pickListResult option',this.name.nameList[0])
        this.DualListPage.getListA().select(this.name.nameList[1])
        this.DualListPage.getAdd().click()
        cy.InTheList(false,'.pickData option',this.name.nameList[1])
        cy.InTheList(true,'.pickListResult option',this.name.nameList[1])
        this.DualListPage.getListA().select(this.name.nameList[2])
        this.DualListPage.getAdd().click()
        cy.InTheList(false,'.pickData option',this.name.nameList[2])
        cy.InTheList(true,'.pickListResult option',this.name.nameList[2])
        //Remove an element
        this.DualListPage.getListB().select(this.name.nameList[1])
        this.DualListPage.getRemove().click()
        cy.InTheList(true,'.pickData option',this.name.nameList[1])
        cy.InTheList(false,'.pickListResult option',this.name.nameList[1])
    })

    it('Add all Remove all',function(){
        var nListACount = 0
        this.DualListPage.getListA().find('option').each((el,i,list)=>{
            nListACount  += 1
        })
        this.DualListPage.getListA().select(this.name.nameList[2])
        this.DualListPage.getAdd().click()
        cy.InTheList(true,'.pickListResult option',this.name.nameList[2])
        this.DualListPage.getAddAll().click()
        var nListBCount = 0
        this.DualListPage.getListB().find('option').each((el,i,list)=>{
            nListBCount += 1
        }).then(()=>{
            //All elements are in ListB
            if (nListACount == nListBCount)
                expect(true).to.be.true
            else
                expect(true).to.be.false
        })
        this.DualListPage.getListB().select(this.name.nameList[1])
        this.DualListPage.getRemove().click()
        cy.InTheList(false,'.pickListResult option',this.name.nameList[1])
        cy.InTheList(true,'.pickData option',this.name.nameList[1])
        this.DualListPage.getRemoveAll().click().then(()=>{
            this.DualListPage.getListA().find('option').should('have.length',nListACount)
        })
        
    })
})
