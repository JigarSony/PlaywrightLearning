// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 300 *1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',

  use: {
    browerName: 'chrominum',
    headless: false,
    screenshot: 'on',
    // trace: 'on'
    trace: 'retain-on-failure' // off, on
  }
});

module.exports = config
