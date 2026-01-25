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
  }
});

module.exports = config
