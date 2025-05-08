// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('auth/login'); // Replace with your login URL
  });

  // Prioritize this test by placing it first
  test('should login with valid credentials', async ({ page }) => {
    await page.fill('#username', 'validuser'); // Replace with actual selector and value
    await page.fill('#password', 'validpass'); // Replace with actual selector and value
    await page.click('#login-button'); // Replace with actual selector
    await expect(page).toHaveURL(/dashboard/); // Replace with expected URL after login
  });

  test('should fail with invalid credentials', async ({ page }) => {
    await page.fill('#username', 'invaliduser');
    await page.fill('#password', 'invalidpass');
    await page.click('#login-button');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should show error for empty credentials', async ({ page }) => {
    await page.click('#login-button');
    await expect(page.getByText('Username is required')).toBeVisible();
  });
});