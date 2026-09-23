Feature: Error validations

@Validation
Scenario: Unsuccessful login with invalid credentials
    Given I login using the Ecommerce2 application with "tes" and "$12" credentials
    Then Verify error message is displayed