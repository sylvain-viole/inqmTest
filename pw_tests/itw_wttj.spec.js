const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.welcometothejungle.com/fr/me/settings/account");
  // As we are not loged in yet, we should be redirected to signin page
  await expect(page).toHaveURL(/.*signin/);
  // Loging in
  await page
    .locator('[data-testid="login-field-email"]')
    .fill(process.env.USER_EMAIL);
  await page
    .locator('[data-testid="login-field-password"]')
    .fill(process.env.USER_PASSWORD);
  await page.locator('[data-testid="login-button-submit"]').click();
  // Killing cookies
  await page.locator("button#axeptio_btn_dismiss").click();
  // Assert on redirection after successfull login
  await expect(page).toHaveURL(/.*account/);
});

test.describe('after visiting ["www.welcometothejungle.com/fr/me/settings/account"] webpage, clicking on ["Se connecter"] button, filling ["Email", "Mot de passe"] inputs, clicking ["Se connecter"] button, filling ["Photo de profil"] input and clicking on ["OK"] button', () => {
  test("_profile-avatar data are updated", async ({ page }) => {
    // Declaring needed locators
    const avatarEditField = page.locator(
      '[data-testid="account-edit-field-avatar"]'
    );
    const avatarImg = avatarEditField.locator("img");
    const actualImgUrl = await avatarImg.getAttribute("src");
    // Uploading new file
    await page
      .locator("input[name=avatar]")
      .setInputFiles("./cypress/fixtures/img/inqom.png");
    const newImgUrl = await avatarImg.getAttribute("src");
    // Asserting on new img url and img visibility
    expect(
      actualImgUrl,
      "avatar img url is not the same after upload of new image"
    ).not.toEqual(newImgUrl);
    expect(avatarImg).toBeVisible();
  });
});
