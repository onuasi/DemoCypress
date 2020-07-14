/// <reference types="Cypress" />

describe('Testing Boostrap Date', function(){
    beforeEach(function(){
        cy.fixture('Dates').then(function(Dates){
            this.Dates = Dates
        })

        cy.visit('https://www.seleniumeasy.com/test/')
        cy.get('.nav.navbar-nav:nth-child(1)>li:nth-child(2)').click({force:true})
        cy.get('.dropdown-menu [href="./bootstrap-date-picker-demo.html"]').click({force:true})
    })

    it('Select data with number',function(){
        cy.get('.input-group.date input').should('have.attr','placeholder',this.Dates.defaultDate).click()
        cy.get('.datepicker-days .prev').click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == '6')
                el.click()
        })
        cy.get('.input-group.date input').should('have.value',this.Dates.date)
        cy.get('div .input-daterange input:nth-child(3)').should('have.attr','placeholder',
        this.Dates.defaultEndDate)
        cy.get('div .input-daterange input:nth-child(1)').should('have.attr','placeholder',
        this.Dates.defaultStartDate)
        .click()
        cy.get('.datepicker-days .prev').click().click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == '1')
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.startDate)
        .click()
        cy.get('div .input-daterange input:nth-child(3)').should('have.value',this.Dates.startDate)
        var nCurrentMonth = Number(this.Dates.startDate.split('/')[1])
        var nDiffBetweenMonths = Number(this.Dates.endDate.split('/')[1]) - nCurrentMonth
        cy.log(nCurrentMonth)
        cy.log(nDiffBetweenMonths)
        cy.get('div .input-daterange input:nth-child(3)').click()
        for(var i=0;i<nDiffBetweenMonths;i++){
            cy.get('.datepicker-days .next').click()
        }
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == '24')
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(3)').should('have.value',this.Dates.endDate)

    })

    it('Conditions behavior',function(){
        cy.get('.input-group.date input').click()
        cy.get('.datepicker-days .prev').click()
        var dateSelected = false
        //Trying to click all the sunday days
        cy.get('td.disabled').each((el,i,list)=>{
            //Is this clicking beeing done?
            el.click({force:true})
            cy.get('.input-group.date input').should('have.value','')
        })
        //Select a date
        cy.get('.datepicker-days .next').click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() === '2'){
                el.click()
                //This will act as a break
                //return false
            }
        })
        //click on botton since input was not working propertly
        cy.get('.glyphicon.glyphicon-th').click()
        cy.get('.datepicker-days .clear').click()
        cy.get('.input-group.date input').click().should('have.value','')
        cy.get('.datepicker-days th.today').click()

        //Getting current date
        var sActualDate = new Date()
        var sDate = sActualDate.getDate().toString()
        var sMonth = (sActualDate.getMonth()+1).toString()
        var sYear = sActualDate.getFullYear().toString()
        if(sDate.length<2)
            sDate = '0'.concat(sDate)
        if(sMonth.length<2)
            sMonth = '0'.concat(sMonth)
        cy.get('.input-group.date input').should('have.value',sDate+'/'+sMonth+'/'+sYear)

        //Range date
        cy.get('div .input-daterange input:nth-child(1)').click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == '6')
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.startDate2)
        cy.get('div .input-daterange input:nth-child(3)').click()
        cy.get('.datepicker-days .prev').click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == '9')
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(3)').should('have.value',this.Dates.endDate2)
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.endDate2)
        cy.get('div .input-daterange input:nth-child(1)').click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == '8')
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.startDate3)
    })
})