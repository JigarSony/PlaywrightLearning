// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browerName: 'webkit',
        headless: true,
        screenshot: 'on', // on, off, only-on-failure
        trace: 'on', //'retain-on-failure' // off, on
        // viewport: {width:720, height:720}, // change behaviour on web page - to check responsive
        ignoreHttpsErrors: true, // private or ssl certification error
        permission: ['geolocation'], // allow location 
        video: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry

      }
    },
    {
      name: 'chrome',
      use: {
        browerName: 'chrominum',
        headless: true,
        screenshot: 'on', // on, off, only-on-failure
        trace: 'on', //'retain-on-failure' // off, on
        ...devices['iPhone 11'] //this will open iphone screen type

      }
    }
  ],

});

module.exports = config