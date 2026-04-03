# Playwright UI Automation Framework

A scalable and maintainable UI test automation framework built using **Playwright** and **TypeScript**, designed for reliable end-to-end testing of web applications.

---

## 🌟 Features

- **Page Object Model (POM)** for clean and reusable page abstractions.
- **Fixtures** for reusable setup, session management, and test data injection.
- **Environment Configuration** via `.env` for base URLs, credentials, and other settings.
- **JSON-Driven Test Data** for easy data-driven testing.
- **Session Storage Management** to skip login for every test, improving execution speed.
- **Cross-Browser Support**: Chromium, Firefox, WebKit.
- **Trace & Screenshot Capture** for failed tests.
- **Parallel Execution** and **Retries** for faster, more reliable tests.
- **Configurable via `playwright.config.ts`**.

---


---

## ⚙️ Prerequisites

- Node.js v18+  
- npm or yarn  
- Playwright dependencies:

```bash
npm install -D @playwright/test
npx playwright install

**🌱 Setup**
1. Clone the repository:
    git clone <repo-url>
    cd playwright-ui-automation-framework

2. Install dependencies:
    npm install

3. Create a .env file in the project root:
    AUTOMATION_BASE_URL=https://www.saucedemo.com
    AUTOMATION_USERNAME=standard_user
    AUTOMATION_PASSWORD=secret_sauce

4. Run tests:
    npx playwright test

Session storage will be saved in './src/test/storageState/auth.json' for faster tests.
