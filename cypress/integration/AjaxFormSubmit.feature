Feature: Fill and send and Ajax form

    On the Ajax form submit site
    I can fill the form
    and send submit it
    As long as the name is field is filled

    Scenario: Fill all the form and submit it
        Given I visit Ajax form site
        And I select the field "title"
        And I write "Jorge" on it
        And I select the field "description"
        And I write "Working as a banker in Bank of America with 10 years of expirience, bringing ...." on it
        When I click submit
        Then I can see an API code with 200
        And I can see the "LoaderIcon.gif" image
        And I can see the word "Success" in my screen

    Scenario: Fill only comment field and submit the form
        Given I visit Ajax form site
        And I select the field "description"
        And I write "Working as a banker in Bank of America with 10 years of expirience, bringing ...." on it
        When I click submit
        Then Name field is highlighted



