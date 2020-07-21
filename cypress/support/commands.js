// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//Check if the alphabetical input is sort
Cypress.Commands.add("CheckDescendentSortAlpha", (sElement) => {
    var aName = new Array()
    var sAuxName = ""
    var nWrongOder = true
    cy.get(sElement).each((el,index,list)=>{
        aName.push(el.text())
        sAuxName = el.text()
        if(aName.length>1){
            for(var i=0; i<aName.length-1;i++){
                if(sAuxName>aName[i]){
                    aName.splice(i,0,sAuxName)
                    aName.splice(aName.length-1,1)
                    nWrongOder = false
                    break
                }
            }
        }
    }).then(function(){
        expect(nWrongOder).to.be.true
    })
})

//Check if the numerical input is sort
Cypress.Commands.add("CheckSortNum", (sElement, sOrder) => {
    var aName = new Array()
    var sAuxName = ""
    var nWrongOder = true
    cy.get(sElement).each((el,index,list)=>{
        aName.push(el.text())
        sAuxName = el.text()

        if(aName.length>1){
            for(var i=0; i<aName.length-1;i++){
                if(sOrder == 'upward' && (sAuxName-aName[i])<0 /*sAuxName<aName[i]*/){
                    aName.splice(i,0,sAuxName)
                    aName.splice(aName.length-1,1)
                    nWrongOder = false
                    break
                }
                else if(sOrder == 'downward' && (sAuxName-aName[i])>0){
                    aName.splice(i,0,sAuxName)
                    aName.splice(aName.length-1,1)
                    nWrongOder = false
                    break
                }
            }
        }
    }).then(function(){
        console.log(aName)
        expect(nWrongOder).to.be.true 
    })
    
})

Cypress.Commands.add("InTheList",(inList,element,listValue)=>{
    var nfoundData = false
    cy.get(element).each((el,i,list)=>{
        if(el.text() === listValue)
            nfoundData = true
    }).then(()=>{
        if(inList == true && nfoundData== true)
            expect('Element "' + listValue + '" is in the list').to.be.eq('Element "' + listValue + '" is in the list')
        else if (inList == false && nfoundData== false)
        expect('Element "' + listValue + '" is NOT in the list').to.be.eq('Element "' + listValue + '" is NOT in the list')
        //When conditions are not fulfilled
        else
            expect('Is '  + nfoundData + ' that element "' + listValue + '" should be in the list').to.be.
            eq('Is '  + inList + ' that element "' + listValue + '" should be in the list')
    })
})
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
