Feature: Ecommerce validations

Scenario: Placing an order successfully
    Given I login using the "username" and "password" credentials
    When I add "product" to the cart
    Then I should see the "product" in the cart
    Then I should proceed to checkout
    When I fill in the checkout information: CVV - "123", Name on card - "John Doe" and coupon - "DISCOUNT10"
    Then I should see the coupon applied
    Then I should select the country from the dropdown
    Then I should see my email displayed
    Then I should place the order successfully
    Then I should see the order confirmation