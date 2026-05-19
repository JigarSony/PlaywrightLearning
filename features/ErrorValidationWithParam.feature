Feature: Ecommerce2 validation
    @Smoke
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
        |   username              |   password            |
        |   rahulshettyacademy1   |   Learning@830$3mK2   |
        |   hello@123.com         |   Iamhello@12         |
