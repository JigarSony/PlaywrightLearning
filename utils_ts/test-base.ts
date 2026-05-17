// const { base }  = require('@playwright/test');
import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    username:string;
    password:string;
    productName:string;
}

export const customtest = baseTest.extend<{testDataforOrder:TestDataForOrder}>(
    {
        testDataforOrder: {
            username: "sonijigar94@gmail.com",
            password: "Test1234",
            productName: "ZARA COAT 3"
        }
    }
)