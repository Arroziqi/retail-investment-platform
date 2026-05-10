import { test, expect } from '@playwright/test';

test('browse catalog and purchase a fund', async ({ page }) => {
  // 1. Mock a verified user (manual storage injection if possible, or just follow flow)
  // For this test, we'll assume the user is already registered and verified
  // We can use a custom route or just follow the flow
  
  // Navigate to catalog
  await page.goto('/catalog');
  await expect(page.getByText('Mutual Fund Catalog')).toBeVisible();

  // 2. Search and filter
  await page.getByPlaceholder('Search funds...').fill('Sucor');
  await expect(page.getByText('Sucorinvest Stable Fund')).toBeVisible();
  await expect(page.getByText('BNP Paribas Pesona')).not.toBeVisible();

  // 3. Clear search and filter by category
  await page.getByPlaceholder('Search funds...').fill('');
  await page.getByRole('button', { name: 'Money Market' }).click();
  await expect(page.getByText('Majoris Pasar Uang Syariah')).toBeVisible();
  await expect(page.getByText('Sucorinvest Stable Fund')).not.toBeVisible();

  // 4. Try to invest (should show KYC warning if not verified)
  // But wait, our mock handler/store might default to Unverified
  await page.getByRole('button', { name: 'Invest Now' }).first().click();
  
  // Since we haven't logged in in this test, we might see the KYC warning
  await expect(page.getByText('Verification Required')).toBeVisible();
  
  // 5. Complete verification (shortcut by clicking the button in the dialog)
  await page.getByRole('button', { name: 'Complete KYC' }).click();
  await expect(page).toHaveURL(/.*onboarding\/kyc/);
});
