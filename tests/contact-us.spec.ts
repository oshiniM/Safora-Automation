import { test, expect } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUsPage';
import { invalidContactData, validContactData } from '../test-data/contact-us-data';

async function expectNoMailerSubmission(page: import('@playwright/test').Page) {
  return page
    .waitForRequest(
      (request) => request.url().includes('/assets/mailer.php') && request.method() === 'POST',
      { timeout: 3000 },
    )
    .then(() => false)
    .catch(() => true);
}

test.describe('Safora Contact Us form', () => {
  test('TC01 - Verify whether Contact Us page loads successfully', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    await contactUsPage.goto();

    await contactUsPage.expectLoaded();
  });

  test('TC02 - Verify whether all required form fields are displayed', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);

    await contactUsPage.goto();

    await contactUsPage.expectFormVisible();
  });

  test('TC03 - Verify whether that required validation messages are shown for empty submission', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Full name is required.')).toBeVisible();
    await expect(contactUsPage.errorMessage('Email address is required.')).toBeVisible();
    await expect(contactUsPage.errorMessage('Phone number is required.')).toBeVisible();
    await expect(contactUsPage.errorMessage('Message is required.')).toBeVisible();
  });

  test('TC04 - Verify whether that validation is shown when Name is empty', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm({ ...validContactData, name: '' });
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Full name is required.')).toBeVisible();
  });

  test('TC05 - Verify whether that short Name is validated', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm(invalidContactData.shortName);
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Name must be at least 2 characters.')).toBeVisible();
  });

  test('TC06 - Verify whether that validation is shown when Email is empty', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm({ ...validContactData, email: '' });
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Email address is required.')).toBeVisible();
  });

  test('TC07 - Verify whether that invalid Email format is validated', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm(invalidContactData.invalidEmail);
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Please enter a valid email address.')).toBeVisible();
  });

  test('TC08 - Verify whether that validation is shown when Phone is empty', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm({ ...validContactData, phone: '' });
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Phone number is required.')).toBeVisible();
  });

  test('TC09 - Verify whether that short Phone number is validated', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm(invalidContactData.shortPhone);
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Please enter a valid phone number (min 7 digits).')).toBeVisible();
  });

  test('TC10 - Verify whether that letters are removed from the Phone field', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.phoneInput.fill('abc123xyz');

    await expect(contactUsPage.phoneInput).toHaveValue('123');
  });

  test('TC11 - Verify whether that valid Phone symbols are accepted', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.phoneInput.fill('+46 73-044-5855');

    await expect(contactUsPage.phoneInput).toHaveValue('+46 73-044-5855');
  });

  test('TC12 - Verify whether that validation is shown when Message is empty', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm({ ...validContactData, message: '' });
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Message is required.')).toBeVisible();
  });

  test('TC13 - Verify whether that short Message is validated', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm(invalidContactData.shortMessage);
    await contactUsPage.submit();

    await expect(contactUsPage.errorMessage('Message must be at least 10 characters.')).toBeVisible();
  });

  test('TC14 - Verify whether that valid form submission is blocked when reCAPTCHA is not completed', async ({ page }) => {
    test.fail(true, 'Known defect: visible form can submit without completed reCAPTCHA because scripts target duplicate contact-form IDs.');
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();
    await contactUsPage.mockFormSubmission();
    await page.waitForFunction(() => 'grecaptcha' in window, null, { timeout: 10000 });

    await contactUsPage.fillForm(validContactData);

    const noSubmissionPromise = expectNoMailerSubmission(page);
    await contactUsPage.submit();

    expect(await noSubmissionPromise).toBe(true);
    await expect(contactUsPage.nameInput).toHaveValue(validContactData.name);
    await expect(contactUsPage.emailInput).toHaveValue(validContactData.email);
    await expect(contactUsPage.phoneInput).toHaveValue(validContactData.phone);
    await expect(contactUsPage.messageInput).toHaveValue(validContactData.message);
  });

  test('TC15 - Verify whether that Email validation error is cleared after correcting invalid Email', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await contactUsPage.fillForm(invalidContactData.invalidEmail);
    await contactUsPage.submit();
    await expect(contactUsPage.errorMessage('Please enter a valid email address.')).toBeVisible();

    await contactUsPage.emailInput.fill(validContactData.email);
    await expect(contactUsPage.errorMessage('Please enter a valid email address.')).toHaveCount(0);
  });
});
