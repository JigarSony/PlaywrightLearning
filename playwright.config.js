// @ts-check
import { defineConfig, devices } from '@playwright/test';

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

  use: {
    browerName: 'chrominum',
    headless: false,
    screenshot: 'on', // on, off, only-on-failure
    trace: 'on' //'retain-on-failure' // off, on
  }
});

module.exports = config