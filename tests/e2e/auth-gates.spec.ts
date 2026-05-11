import { test, expect } from '@playwright/test';

test.describe('Authentication and KYC Gates', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should redirect unverified users to KYC onboarding', async ({ context, page }) => {
    // Set mock session cookie but no KYC status (defaults to Unverified)
    await context.addCookies([
      { name: 'session-token', value: 'mock-token', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/onboarding\/kyc/);
  });

  test('should redirect pending KYC users to waiting room', async ({ context, page }) => {
    await context.addCookies([
      { name: 'session-token', value: 'mock-token', domain: 'localhost', path: '/' },
      { name: 'kyc-status', value: 'Pending', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/onboarding\/verification/);
  });

  test('should allow verified users to access dashboard', async ({ context, page }) => {
    await context.addCookies([
      { name: 'session-token', value: 'mock-token', domain: 'localhost', path: '/' },
      { name: 'kyc-status', value: 'Verified', domain: 'localhost', path: '/' }
    ]);

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1')).toContainText('Portfolio Overview');
  });
});
