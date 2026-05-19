Feature: Ecommerce validation
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "sonijigar94@gmail.com" and "Test1234"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valida details and Place the Order
        Then Verify order is presernt in the OrderHistory
