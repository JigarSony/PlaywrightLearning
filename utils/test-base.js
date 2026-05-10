// const { base }  = require('@playwright/test');
import { test as base } from '@playwright/test';

exports.customtest = base.test.extend(
    {
        testDataforOrder: {
            username: "sonijigar94@gmail.com",
            password: "Test1234",
            productName: "ZARA COAT 3"
        }
    }
)