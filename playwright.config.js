// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout : 40 *1000, // compounds or cmapnions
  expect : 
  {
    timeout : 5 *1000,
  },  // assertions wait

  reporter: 'html',
  use: {
    browserName : 'chromium',
    headless : false
  },
});

