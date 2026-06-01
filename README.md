# Safora Contact Us Automation

This project contains Playwright automation tests for the Safora Contact Us page:

https://safora.se/en/contact.html

The tests are written in TypeScript and focus on the Contact Us form validation, negative scenarios, phone field behavior, and reCAPTCHA submission behavior.

## How to Run This Project

### Prerequisites
Before running the tests, make sure the following are installed:
- Node.js
- npm
- Google Chrome browser

### Steps

Open Command Prompt terminal and run the commands below.

1. Clone the repository:

```bash
git clone https://github.com/oshiniM/Safora-Automation.git
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
npx playwright show-report
```

## Additional Commands

Run tests with a visible browser:

```bash
npm run test:headed
```

Run tests using Playwright UI mode:

```bash
npx playwright test --ui
```
