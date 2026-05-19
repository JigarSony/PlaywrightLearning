Feature: Ecommerce2 validation
    @Smoke
    Scenario: Placing the order
        Given a login to Ecommerce2 application with "rahulshettyacademy1" and "Learning@830$3mK2"
        Then Verify Error message is displayed
