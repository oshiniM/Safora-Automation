import { expect, type Locator, type Page } from '@playwright/test';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export class ContactUsPage {
  readonly page: Page;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageInput: Locator;
  readonly recaptcha: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('.rs-contact-form form').first();
    this.nameInput = this.form.locator('#name');
    this.emailInput = this.form.locator('#email');
    this.phoneInput = this.form.locator('#phone');
    this.messageInput = this.form.locator('#message');
    this.recaptcha = this.form.locator('.g-recaptcha');
    this.sendMessageButton = this.form.getByRole('button', { name: 'Send Message' });
  }

  async goto() {
    await this.page.goto('contact.html', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/en\/contact\.html$/);
    await expect(this.page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
  }

  async expectFormVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.recaptcha).toBeAttached();
    await expect(this.sendMessageButton).toBeVisible();
  }

  async fillForm(data: ContactFormData) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.messageInput.fill(data.message);
  }

  async submit() {
    await this.sendMessageButton.click();
  }

  async mockFormSubmission() {
    await this.page.route('**/assets/mailer.php', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Mocked form response',
      });
    });
  }

  errorMessage(text: string) {
    return this.form.locator('.field-error', { hasText: text });
  }

  recaptchaWarning() {
    return this.page.locator('.swal2-popup', {
      hasText: 'Please complete the reCAPTCHA to submit the form.',
    });
  }
}
