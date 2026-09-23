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