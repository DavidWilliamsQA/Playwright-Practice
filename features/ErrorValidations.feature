Feature: Error validations

@Validation
Scenario Outline: Unsuccessful login with invalid credentials
    Given I login using the Ecommerce2 application with "<invalidUsername>" and "<invalidPassword>" credentials
    Then Verify error message is displayed

    Examples:
      | invalidUsername | invalidPassword |
      | tes            | $12            |
      | invalidUser    | invalidPass    |
