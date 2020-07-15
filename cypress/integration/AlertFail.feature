Feature: Display

    As a valid user
    I want to log in into Application

    Scenario: Display alert box
        Given I open JavaScript alert page
        When I click on click button for "alertBox"
        Then I should see the "alertBox"
      
    Scenario: Display confirm box and accept
        Given I open JavaScript alert page
        When I click on click button for "confirmBox"
        Then I should see the "confirmBox"
        When I click "ok"
        Then I should see a text with "ok" on it

    Scenario: Display confirm box and cancel
        Given I open JavaScript alert page
        When I click on click button for "confirmBox"
        Then I should see the "confirmBox"
        When I click "Cancel"
        Then I should see a text with "cancel" on it

    Scenario: Display prompt box
        Given I open JavaScript alert page
        When I click on click button for "promptBox"
        And I write on the prompt "Luis"
        And I click "ok"
        Then I should see a text with "Luis" on the page