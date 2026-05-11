import { test, expect, devices } from '@playwright/test';

test.describe('Navigation Responsiveness', () => {
  test('should show sidebar on desktop and hide bottom nav', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/dashboard');
    
    // Check Sidebar (hidden md:flex)
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
    
    // Check BottomNav (md:hidden)
    const bottomNav = page.locator('nav').filter({ has: page.locator('.lucide-layout-dashboard') }).last();
    // In our implementation, BottomNav is a 'nav' with fixed bottom-0
    const mobileNav = page.locator('nav.fixed.bottom-0');
    await expect(mobileNav).toBeHidden();
  });

  test('should hide sidebar on mobile and show bottom nav', async ({ page }) => {
    await page.setViewportSize(devices['Pixel 5'].viewport);
    await page.goto('/dashboard');
    
    // Check Sidebar
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeHidden();
    
    // Check BottomNav
    const mobileNav = page.locator('nav.fixed.bottom-0');
    await expect(mobileNav).toBeVisible();
  });
});
