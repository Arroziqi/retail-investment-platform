import { test, expect } from '@playwright/test';

test.describe('Responsive Navigation', () => {
  test.beforeEach(async ({ context, page }) => {
    // Ensure we are logged in and verified for navigation tests
    await context.addCookies([
      { name: 'session-token', value: 'mock-token', domain: 'localhost', path: '/' },
      { name: 'kyc-status', value: 'Verified', domain: 'localhost', path: '/' }
    ]);
  });

  test('should show sidebar on desktop and bottom nav on mobile', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/dashboard');
    await expect(page.locator('aside')).toBeVisible(); // Sidebar
    await expect(page.locator('nav.md\\:hidden')).not.toBeVisible(); // BottomNav hidden

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('aside')).not.toBeVisible(); // Sidebar hidden
    await expect(page.locator('nav.md\\:hidden')).toBeVisible(); // BottomNav visible
  });

  test('should navigate through primary routes via bottom nav on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');

    // Click Explore (Funds)
    await page.click('nav.md\\:hidden >> text=Explore');
    await expect(page).toHaveURL(/\/funds/);

    // Click Watch (Watchlist)
    await page.click('nav.md\\:hidden >> text=Watch');
    await expect(page).toHaveURL(/\/watchlist/);

    // Click Profile (Settings)
    await page.click('nav.md\\:hidden >> text=Profile');
    await expect(page).toHaveURL(/\/settings/);
  });
});
