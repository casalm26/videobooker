import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './specs',
  reporter: [['list']],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure'
  }
});
