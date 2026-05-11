import { test, expect } from '@playwright/test';

test('complete onboarding flow', async ({ page }) => {
  // 1. Start at registration
  await page.goto('/register');
  await expect(page.getByText('Create an account')).toBeVisible();

  // 2. Fill registration
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password', { exact: true }).fill('Password123!');
  await page.getByLabel('Confirm Password').fill('Password123!');
  await page.getByRole('button', { name: 'Register' }).click();

  // 3. KYC Step 1: Personal Info
  await expect(page).toHaveURL(/.*onboarding\/kyc/);
  await expect(page.getByText('Step 1 of 3')).toBeVisible();
  await page.getByLabel('Legal Full Name').fill('Test User');
  await page.getByLabel('Phone Number').fill('081234567890');
  await page.getByRole('button', { name: 'Next' }).click();

  // 4. KYC Step 2: Identity
  await expect(page.getByText('Step 2 of 3')).toBeVisible();
  await page.getByLabel('KTP / ID Number').fill('1234567890123456');
  await page.getByRole('button', { name: 'Next' }).click();

  // 5. KYC Step 3: Review
  await expect(page.getByText('Step 3 of 3')).toBeVisible();
  await expect(page.getByText('Test User')).toBeVisible();
  await page.getByRole('button', { name: 'Submit KYC' }).click();

  // 6. Verify success and redirection to risk profile
  await expect(page).toHaveURL(/.*onboarding\/risk-profile/);
});
