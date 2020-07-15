Feature: Display

    On the JavaScript alert page
    I should be able to throw pop ups
    when in click on the corresponding buttons

    Scenario: Display alert box
        Given I open JavaScript alert page
        When I open "alertBox" and click "ok"
      
    Scenario: Display confirm box and accept
        Given I open JavaScript alert page
        When I open "confirmBox" and click "ok"
        Then I should see a text with "OK" on it

    Scenario: Display confirm box and cancel
        Given I open JavaScript alert page
        When I open "confirmBox" and click "cancel"
        Then I should see a text with "Cancel" on it

    Scenario: Display prompt box
        Given I open JavaScript alert page
        When I open "promptBox" and click "ok"
        When I write on the prompt "Luis"
        Then I should see a text with "Luis" on the page