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

    it('Select date with number',function(){
        //First field for date
        var nDay
        cy.get('.input-group.date input').should('have.attr','placeholder',this.Dates.sDefaultDate).click()
        .then(() => {
            //Get the day we want to select
            nDay = Number(this.Dates.sDate.split('/')[0])
        })
        cy.get('.datepicker-days .prev').click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == nDay)
                el.click()
        })
        //Validating date is correct
        cy.get('.input-group.date input').should('have.value',this.Dates.sDate)

        //Second field for dates
        cy.get('div .input-daterange input:nth-child(3)').should('have.attr','placeholder',
        this.Dates.sDefaultEndDate)
        var nCurrentMonth
        var nDiffBetweenMonths
        var actualDate = new Date()
        cy.get('div .input-daterange input:nth-child(1)').should('have.attr','placeholder',
        this.Dates.sDefaultStartDate).click().then(() => {
        //Find how many months to move
            nDay = Number(this.Dates.sStartDate.split('/')[0])
            nCurrentMonth = actualDate.getMonth()+1
            nDiffBetweenMonths = Math.abs(Number(this.Dates.sStartDate.split('/')[1]) - nCurrentMonth)
        }).then(() => {
            for(let i = 0; i<nDiffBetweenMonths; i++)
            cy.get('.datepicker-days .prev').click()
        })
       
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == nDay)
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.sStartDate)
        .click()
        cy.get('div .input-daterange input:nth-child(3)').should('have.value',this.Dates.sStartDate)

        //Find current month to know how many month to move
        nCurrentMonth = Number(this.Dates.sStartDate.split('/')[1])
        nDiffBetweenMonths = Number(this.Dates.sEndDate.split('/')[1]) - nCurrentMonth
        cy.get('div .input-daterange input:nth-child(3)').click().then(() => {
            nDay = Number(this.Dates.sEndDate.split('/')[0])
        }).then(() => {
            for(var i=0;i<nDiffBetweenMonths;i++)
                cy.get('.datepicker-days .next').click()
        })
       
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == nDay)
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(3)').should('have.value',this.Dates.sEndDate)

    })

    it('Conditions behavior',function(){
        cy.get('.input-group.date input').click()
        //Moving to previous month
        cy.get('.datepicker-days .prev').click()
        //Trying to click all the sunday days
        cy.get('td.disabled').each((el,i,list)=>{
            //Is this clicking beeing done?
            el.click({force:true})
            cy.get('.input-group.date input').should('have.value','')
        })
        //Moving to current month
        var actualDate = new Date()
        var sCurrentMonth = (actualDate.getMonth()+1).toString()
        sCurrentMonth = sCurrentMonth.length<2 ? '0'.concat(sCurrentMonth) : sCurrentMonth
        cy.get('.datepicker-days .next').click()

        //Select the first available day of the displayed month
        var sSelectedDay
        cy.get('td.day:not(.disabled):not(.old)').each((el,i,list) => {
            el.click()
            sSelectedDay = el.text().length < 2 ? '0'.concat(el.text()) : el.text()
            return false
        }).then(() => {
            cy.get('.input-group.date input').should('have.value',sSelectedDay + '/'
            + sCurrentMonth + '/' + actualDate.getFullYear())
        })

        //click on botton since input was not working propertly
        //Deleting current selected date
        cy.get('.glyphicon.glyphicon-th').click()
        cy.get('.datepicker-days .clear').click()
        cy.get('.input-group.date input').click().should('have.value','')

        //Seleting today date
        cy.get('.datepicker-days th.today').click()
        //Getting current date
        var sDate = actualDate.getDate().toString()
        var sMonth = (actualDate.getMonth()+1).toString()
        var sYear = actualDate.getFullYear().toString()
        if(sDate.length<2)
            sDate = '0'.concat(sDate)
        if(sMonth.length<2)
            sMonth = '0'.concat(sMonth)
        cy.get('.input-group.date input').should('have.value',sDate+'/'+sMonth+'/'+sYear)

        //Range date
        //Selecting start date
        var nDay
        cy.get('div .input-daterange input:nth-child(1)').click().then(() => {
            nDay = Number(this.Dates.sStartDate2.split('/')[0])
        })
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == nDay)
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.sStartDate2)

        //Selecting a end date before start date
        cy.get('div .input-daterange input:nth-child(3)').click().then(() => {
            nDay = Number(this.Dates.sEndDate2.split('/')[0])
        })
        cy.get('.datepicker-days .prev').click()
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == nDay)
                el.click()
        })
        //Start date and end date should have the same value
        cy.get('div .input-daterange input:nth-child(3)').should('have.value',this.Dates.sEndDate2)
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.sEndDate2)

        //Updating the start date
        cy.get('div .input-daterange input:nth-child(1)').click().then(() => {
            nDay = Number(this.Dates.sStartDate3.split('/')[0])
        })
        cy.get('.datepicker-days tr td').each((el,i,list)=>{
            if(el.text() == nDay)
                el.click()
        })
        cy.get('div .input-daterange input:nth-child(1)').should('have.value',this.Dates.sStartDate3)
    })
})