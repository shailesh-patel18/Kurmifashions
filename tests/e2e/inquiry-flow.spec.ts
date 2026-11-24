import { test, expect } from "@playwright/test";

test.describe("KURMI.FASHIONS Pre-Launch Demand Validation Site", () => {
  test("strictly contains NO cart, checkout, or payment promises", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const content = await page.content();
    const forbiddenPhrases = [
      /\badd to cart\b/i,
      /\bshopping cart\b/i,
      /\bcheckout\b/i,
      /\bpayment\b/i,
      /\bcredit card\b/i,
      /\bcvv\b/i,
      /\bin stock\b/i,
      /\bships tomorrow\b/i,
      /\bfree shipping\b/i,
    ];

    forbiddenPhrases.forEach((regex) => {
      expect(content).not.toMatch(regex);
    });
  });

  test("runs full inquiry submission flow successfully", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // 1. Check title & headline
    await expect(page.locator("h1")).toContainText("Wear the wild");

    // 2. Select a size on the first design card and click "I want this"
    const card = page.locator(".design-card").first();
    await expect(card).toBeVisible();
    await card.locator("button:has-text('I want this')").click();

    // 3. Drawer opens
    const drawer = page.locator("[role='dialog'][aria-labelledby='drawer-title']");
    await expect(drawer).toBeVisible();
    await expect(drawer).toContainText("My Interest List");
    await expect(drawer).toContainText("₹0");

    // 4. Click "Send my inquiry" to open 2-step modal
    await drawer.locator("button:has-text('Send my inquiry')").click();
    const modal = page.locator("[role='dialog'][aria-labelledby='inquiry-modal-title']");
    await expect(modal).toBeVisible();

    // 5. Step 1: Fill name, WhatsApp, city
    await modal.locator("input[id='your-full-name']").fill("Aarav Sharma");
    await modal.locator("input[type='tel']").fill("9876543210");
    await modal.locator("input[id='city-/-town']").fill("Bengaluru");
    await modal.locator("button:has-text('Continue to Review')").click();

    // 6. Step 2: Consent & Submit
    await modal.locator("button:has-text('Confirm & Register My Inquiry')").click();

    // 7. Success Screen: Supporter #N appears
    await expect(modal).toContainText("You're on the list!");
    await expect(modal).toContainText("supporter #");
  });
});
