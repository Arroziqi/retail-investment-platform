import { test, expect } from '@playwright/test';

test('dashboard displays portfolio summary and orders', async ({ page }) => {
  // Navigate to dashboard
  await page.goto('/dashboard');
  
  // 1. Verify Portfolio Summary
  await expect(page.getByText('Total Portfolio Value')).toBeVisible();
  await expect(page.getByText('Rp 12,500,000')).toBeVisible(); // From mock data
  await expect(page.getByText('13.6%')).toBeVisible();

  // 2. Verify Tabs
  await expect(page.getByRole('tab', { name: 'My Holdings' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Order History' })).toBeVisible();

  // 3. Switch to Order History
  await page.getByRole('tab', { name: 'Order History' }).click();
  
  // 4. Verify Order History Table
  await expect(page.getByText('Majoris Pasar Uang Syariah')).toBeVisible();
  await expect(page.getByText('Completed').first()).toBeVisible();
  await expect(page.getByText('Pending')).toBeVisible();
  await expect(page.getByText('Rp 5,000,000')).toBeVisible();
});
