# Safora Contact Us Automation

This project contains Playwright automation tests for the Safora Contact Us page:

https://safora.se/en/contact.html

The tests are written in TypeScript and focus on the Contact Us form validation, negative scenarios, phone field behavior, and reCAPTCHA submission behavior.

## Tools Used

- Playwright
- TypeScript
- Google Chrome browser

## Project Structure

```text
Safora_Automation/
├── pages/
│   └── ContactUsPage.ts
├── test-data/
│   └── contact-us-data.ts
├── tests/
│   └── contact-us.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## How to Run This Project

### Prerequisites

Before running the tests, make sure the following are installed:

- Node.js
- npm
- Google Chrome browser

### Steps

1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Go to the project folder:

```bash
cd Safora_Automation
```

3. Install dependencies:

```bash
npm install
```

4. Run the tests:

```bash
npm test
```

5. View the HTML report:

```bash
npm run report
```

Replace `<your-repository-url>` with the actual GitHub repository URL after uploading the project.

## Additional Commands

Run tests with a visible browser:

```bash
npm run test:headed
```

Run tests using Playwright UI mode:

```bash
npm run test:ui
```

## Browser Configuration

This project is configured to run tests using the locally installed Google Chrome browser:

```ts
channel: 'chrome'
```

Therefore, Google Chrome must be installed before running the tests.

Playwright Chromium download is not required for this project.

## Test Coverage

The automated suite covers:

- Contact Us page loading
- Required form fields visibility
- Empty field validation
- Invalid email validation
- Short name, phone, and message validation
- Phone field character filtering
- Valid phone symbol handling
- Validation error clearing
- reCAPTCHA submission behavior

## Note

The Contact Us form contains Google reCAPTCHA. The script does not bypass reCAPTCHA. Instead, it verifies the expected behavior when the form is submitted without completing reCAPTCHA.

One exploratory finding is documented in the test suite: the page contains duplicate `contact-form` IDs, which can affect form submission behavior.
