import { test, expect } from '@playwright/test';

test.describe('Auth and KYC Gates', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login.*/);
    await expect(page.getByText('Log in to manage your investments')).toBeVisible();
  });

  test('should redirect unverified users to KYC', async ({ page }) => {
    // 1. Login
    await page.goto('/login');
    await page.getByLabel('Email').fill('investor@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Check redirect (assuming mock starts with Unverified)
    await expect(page).toHaveURL(/.*onboarding\/kyc/);
  });
});
