Feature: Table Sort and Search

    On the Sort and Search Table
    I can order the table by name, Age and salary
    I can navigate through the table with the navigation buttons
    and can display the entries I select from a list

    Scenario: Search an existing office on the table
        Given I visit the Sort and Search table
        When I write "new york" in the Search field
        Then I should see 6 entries on the table

    Scenario: Search a non-existing office on the table
        Given I visit the Sort and Search table
        When I write "caracas" in the Search field
        And I should the message "no matching"

    Scenario: Displaying different pages of the table with navigation buttons
        Given I visit the Sort and Search table
        When I click on 2 page button
        Then I see the 2 page of the table
        When I click on "previous" page button
        Then I see the 1 page of the table
        When I click on "next" page button
        When I see the 2 page of the table

    Scenario: Table display rows according to Show Entries value
        Given I visit the Sort and Search table
        When I click select 10 entries to show
        Then I should see 10 entries on the table
        When I click select 25 entries to show
        Then I should see 25 entries on the table

    Scenario: Table is ordered by name from Z-A
        Given I visit the Sort and Search table
        And The table is sorted from "A-Z" 
        When I click on Name header on column 1, 1 time
        Then The table is sorted from "Z-A"

    Scenario: Table is ordered by age from older to younger
        Given I visit the Sort and Search table
        When I click on Age header on column 4, 2 times
        Then The table is sorted "downwards" by Age header of column 4

    Scenario: Table is ordered by salary from older to younger
        Given I visit the Sort and Search table
        When I click on Salary header on column 6, 1 time
        Then The table is sorted "upward" by Salary header of column 6
