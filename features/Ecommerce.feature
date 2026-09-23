Feature: Ecommerce validations
@Regression
Scenario: Placing an order successfully End 2 End
    Given I login using the "test123333@test.com" and "Password$12" credentials
    When I add "ZARA COAT 3" to the cart
    Then I should see the "ZARA COAT 3" in the cart
    Then I should proceed to checkout
    When I fill in the checkout information: CVV - "123", Name on card - "John Doe" and coupon - "rahulshettyacademy"
    Then I should see the coupon applied
    Then I should select the country from the dropdown
    Then I should see my email displayed
    Then I should place the order successfully
    Then I should see the order confirmation

# To run them in paralell, you can use the following command:
# npx cucumber-js features/Ecommerce.feature --parallel 2 --exit

# To run the reports for these and run them in parallel, you can use the following command:
# npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html

@Validation
Scenario Outline: Unsuccessful login with invalid credentials
    Given I login using the Ecommerce2 application with "<invalidUsername>" and "<invalidPassword>" credentials
    Then Verify error message is displayed

    Examples:
      | invalidUsername | invalidPassword |
      | tes            | $12            |
      | invalidUser    | invalidPass    |