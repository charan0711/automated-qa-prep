// Automated QA Prep - Complete Study Data
// Designed for Manual QA professionals transitioning to Test Automation

const TOPICS = {
  foundation: [
    { id: "why_automate", name: "Why Automate? (The Big Picture)", desc: "When to automate, when not to, ROI", icon: "🎯" },
    { id: "automation_mindset", name: "Automation Mindset Shift", desc: "Thinking like an automation engineer", icon: "🧠" },
    { id: "test_pyramid", name: "The Test Pyramid", desc: "Unit, integration, E2E — what goes where", icon: "🔺" },
    { id: "what_to_automate", name: "What to Automate First", desc: "Picking the right candidates", icon: "✅" },
  ],
  tools: [
    { id: "selenium_basics", name: "Selenium WebDriver", desc: "The industry standard for browser automation", icon: "🌐" },
    { id: "cypress_intro", name: "Cypress (Modern Alternative)", desc: "Fast, reliable, developer-friendly", icon: "⚡" },
    { id: "playwright_intro", name: "Playwright", desc: "Microsoft's cross-browser automation", icon: "🎭" },
    { id: "api_testing", name: "API Testing (Postman & REST Assured)", desc: "Testing without a browser", icon: "🔌" },
    { id: "programming_basics", name: "Programming for QA", desc: "Python/JavaScript essentials you need", icon: "💻" },
  ],
  advanced: [
    { id: "page_object_model", name: "Page Object Model (POM)", desc: "The most important design pattern", icon: "📐" },
    { id: "framework_design", name: "Test Framework Architecture", desc: "Building a maintainable framework", icon: "🏗️" },
    { id: "ci_cd", name: "CI/CD Integration", desc: "Running tests in pipelines", icon: "🔄" },
    { id: "reporting", name: "Test Reporting & Metrics", desc: "Allure, HTML reports, dashboards", icon: "📊" },
    { id: "best_practices", name: "Best Practices & Common Mistakes", desc: "What separates good from great", icon: "⭐" },
  ]
};

const TOPIC_CONTENT = {

  why_automate: {
    sections: [
      {
        heading: "You Already Know Testing — Now Let's Scale It",
        body: "As a manual tester, you already understand requirements, test cases, edge cases, and defects. That knowledge is GOLD. Automation doesn't replace your testing brain — it gives your brain superpowers. Instead of clicking through the same 50 regression tests every sprint, automation runs them in minutes while you focus on exploratory testing and edge cases.",
        terms: [
          { term: "Test Automation", def: "Using software tools to execute pre-written tests automatically, compare results, and report pass/fail without human intervention." },
          { term: "ROI of Automation", def: "Return on Investment — automation has high upfront cost but saves exponential time over months. A test run manually 50 times costs 50x the effort; automated costs 1x to write + near-zero to run." },
          { term: "Regression Testing", def: "Re-testing existing functionality after code changes. THIS is automation's #1 use case — repetitive, boring, time-consuming but critical." }
        ],
        tip: "Automation doesn't replace manual testers — it frees them to do higher-value exploratory testing that machines can't do."
      },
      {
        heading: "When to Automate vs When NOT To",
        body: "Not everything should be automated. The sweet spot is: tests that run frequently, have stable functionality, are time-consuming manually, and have clear pass/fail criteria. DON'T automate: one-time tests, brand new features still changing daily, tests requiring human judgment (visual/UX), or tests for features being redesigned.",
        terms: [
          { term: "Good Automation Candidates", def: "Smoke tests, regression suites, data-driven tests, cross-browser checks, API validations, login flows, checkout flows." },
          { term: "Bad Automation Candidates", def: "Exploratory testing, usability testing, ad-hoc testing, tests for features still in active development." },
          { term: "Automation Debt", def: "Like technical debt — automated tests that break frequently, cost more to maintain than they save. Avoid by choosing stable features first." }
        ],
        warn: "The #1 mistake: trying to automate EVERYTHING. Start with 10-20 high-value regression tests. Prove value, then expand."
      },
      {
        heading: "The Business Case",
        body: "Management cares about: faster releases, fewer production bugs, reduced manual effort, and cost savings. A manual regression suite taking 3 days can run in 30 minutes automated. That's 2.5 days saved per sprint × 26 sprints = 65 days/year saved. Frame automation in terms of: speed to market, risk reduction, and team capacity freed up for higher-value work.",
        tip: "When pitching automation to stakeholders: 'We can release with confidence in hours instead of days, catch bugs before customers do, and free the team to find bugs machines can't.'"
      }
    ]
  },

  automation_mindset: {
    sections: [
      {
        heading: "From 'Click and Verify' to 'Code and Assert'",
        body: "In manual testing, you think: 'I'll click this button and check that the page loads.' In automation, you think: 'I'll locate the element, trigger a click event, wait for the page state to change, and assert the expected content exists.' Same logic, different language. Your testing intuition stays — you're just expressing it in code instead of mouse clicks.",
        terms: [
          { term: "Locator", def: "How automation finds an element on the page — by ID, class, CSS selector, XPath, or test-specific attribute (data-testid)." },
          { term: "Assertion", def: "A code statement that checks if something is true. If assertion fails, the test fails. Like your mental 'check' but written in code." },
          { term: "Wait/Sync", def: "Telling automation to pause until something happens (page loads, element appears). The #1 source of flaky tests when done wrong." }
        ],
        tip: "You already think in test cases. Automation is just writing those test cases in a programming language instead of a spreadsheet."
      },
      {
        heading: "Think in Layers, Not Steps",
        body: "Manual tests are linear: Step 1, Step 2, Step 3. Automation thinks in layers: What's the test doing? (test layer) What page is it on? (page layer) What elements exist? (element layer) What actions are available? (action layer). This separation makes tests readable, maintainable, and reusable. You'll hear this called 'Page Object Model' — the most important pattern in test automation.",
        terms: [
          { term: "Abstraction", def: "Hiding complexity behind a simple interface. Instead of writing 5 lines to login every test, you write: loginPage.login('user', 'pass')" },
          { term: "Reusability", def: "Write once, use everywhere. A login function written once is used in 100 tests." },
          { term: "Maintainability", def: "When the UI changes, you update ONE place (the page object), not 100 tests." }
        ]
      },
      {
        heading: "Debugging is Part of the Job",
        body: "Automated tests fail. Sometimes it's a real bug (great!), sometimes it's a test problem (timing, stale element, changed UI). Learning to read error messages, use developer tools, and debug test code is essential. This gets easier fast — most failures follow patterns you'll recognize within weeks.",
        terms: [
          { term: "Flaky Test", def: "A test that sometimes passes and sometimes fails without code changes. Usually caused by timing issues, dynamic content, or test dependencies." },
          { term: "Stack Trace", def: "The error message showing exactly which line of code failed and why. Learn to read these — they tell you everything." },
          { term: "Element Not Found", def: "The most common automation error. Means your locator is wrong OR the element hasn't loaded yet." }
        ],
        warn: "Flaky tests destroy trust in automation. If a test fails randomly, fix it immediately or delete it. Never ignore flaky tests."
      }
    ]
  },

  test_pyramid: {
    sections: [
      {
        heading: "The Three Levels of Testing",
        body: "Imagine a pyramid. The base (largest) is Unit Tests — fast, cheap, test single functions. The middle is Integration/API Tests — medium speed, test components working together. The top (smallest) is E2E/UI Tests — slow, expensive, test full user flows through the browser. The key insight: you want LOTS of unit tests, SOME integration tests, and FEW E2E tests.",
        terms: [
          { term: "Unit Tests", def: "Test a single function or method in isolation. Run in milliseconds. Written by developers. Example: 'Does calculateDiscount(100, 20) return 80?'" },
          { term: "Integration Tests", def: "Test multiple components working together. Often test APIs without a browser. Example: 'Does POST /api/login return a valid token?'" },
          { term: "E2E Tests (End-to-End)", def: "Test full user workflows through the browser. Slowest but closest to real user experience. Example: 'Can a user sign up, browse products, and checkout?'" }
        ],
        tip: "As a QA automation engineer, you'll mostly write Integration (API) tests and E2E tests. Developers write unit tests. But understanding all three helps you make smart decisions."
      },
      {
        heading: "Where Manual QA → Automation Fits",
        body: "Your manual regression tests? Most of them are E2E tests. When automating, ask: 'Does this NEED a browser, or can I test it at the API level?' API tests run 10-100x faster than UI tests. Example: To verify a user can register, you could automate the full UI flow (slow) OR send a POST request to the registration API and verify the response (fast). Test the logic at API level, test the UI just once for the happy path.",
        terms: [
          { term: "Shift Left", def: "Testing earlier in the development process. Catch bugs at the unit/API level before they reach the UI." },
          { term: "Happy Path", def: "The ideal user journey with no errors. Automate this at E2E level. Test edge cases at API level." },
          { term: "Test Coverage", def: "What percentage of your application is tested. 100% E2E coverage is impractical; mix pyramid levels for optimal coverage." }
        ],
        warn: "Don't automate 200 E2E tests and call it done. A suite of 200 browser tests takes hours to run and breaks constantly. Use the pyramid."
      }
    ]
  },

  what_to_automate: {
    sections: [
      {
        heading: "Start with the Smoke Tests",
        body: "Smoke tests are the first thing to automate. They answer: 'Is the application fundamentally working?' Can users login? Can they navigate to main pages? Does the search work? Is the homepage loading? These run on every deployment and catch catastrophic failures immediately. Usually 10-20 tests that run in under 5 minutes.",
        terms: [
          { term: "Smoke Test", def: "A quick sanity check that core functionality works. Named after hardware testing: 'Plug it in, if it doesn't smoke, it's probably okay.'" },
          { term: "Sanity Test", def: "Similar to smoke — a quick check that a specific feature works after a change. Narrower scope than smoke." },
          { term: "Build Verification Test (BVT)", def: "Automated smoke tests that run on every build in CI/CD. Gate that blocks deployment if core features are broken." }
        ],
        tip: "Your first automation win: automate the login flow + 5 critical page loads. Deploy it to CI/CD. This alone proves massive value to management."
      },
      {
        heading: "The Automation Candidate Checklist",
        body: "Score each test case on these criteria. High scores = automate first.\n\n1. Frequency: How often is it run? (Daily = high priority)\n2. Stability: Is the feature changing? (Stable = good candidate)\n3. Complexity: How many steps? (More steps = more time saved)\n4. Risk: What if this breaks in prod? (High risk = automate)\n5. Data variations: Does it need many data combinations? (Data-driven = perfect for automation)",
        terms: [
          { term: "Data-Driven Testing", def: "Running the same test with different data sets. Example: testing login with 50 different username/password combinations. Trivial to automate, tedious manually." },
          { term: "Cross-Browser Testing", def: "Running the same tests in Chrome, Firefox, Safari, Edge. Automation runs all in parallel; manually you'd test each one." },
          { term: "Regression Suite", def: "The full set of tests that verify nothing broke after changes. Usually 100-500 tests. The #1 target for automation." }
        ]
      }
    ]
  },

  selenium_basics: {
    sections: [
      {
        heading: "What is Selenium WebDriver?",
        body: "Selenium WebDriver is an open-source tool that controls a real web browser through code. It supports Chrome, Firefox, Safari, and Edge. You write code that says 'open this URL, find this button, click it, verify this text appears' — and Selenium makes the browser do it. It's been the industry standard for 15+ years and is the foundation most automation engineers learn first.",
        terms: [
          { term: "WebDriver", def: "The core component — a protocol that lets your code communicate with browsers. Each browser has its own driver (chromedriver, geckodriver, etc.)" },
          { term: "Selenium Grid", def: "Runs tests on multiple machines/browsers in parallel. For large test suites needing to run on many browser/OS combinations." },
          { term: "Language Bindings", def: "Selenium works with Java, Python, JavaScript, C#, Ruby. You choose the language your team uses." }
        ],
        tip: "If job postings say 'Selenium experience required' — this is what they mean. It's still the most requested automation skill in QA job listings."
      },
      {
        heading: "Core Selenium Concepts",
        body: "Every Selenium test follows this pattern: 1) Create a WebDriver instance (opens browser), 2) Navigate to a URL, 3) Find elements on the page, 4) Perform actions (click, type, select), 5) Assert expected outcomes, 6) Close the browser.",
        code: `# Python Selenium Example
from selenium import webdriver
from selenium.webdriver.common.by import By

# 1. Open browser
driver = webdriver.Chrome()

# 2. Navigate
driver.get("https://example.com/login")

# 3. Find elements
username = driver.find_element(By.ID, "username")
password = driver.find_element(By.ID, "password")
login_btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")

# 4. Actions
username.send_keys("testuser")
password.send_keys("password123")
login_btn.click()

# 5. Assert
assert "Dashboard" in driver.title

# 6. Close
driver.quit()`,
        terms: [
          { term: "find_element()", def: "Locates a single element on the page. Throws error if not found. Use By.ID, By.CSS_SELECTOR, By.XPATH, etc." },
          { term: "send_keys()", def: "Types text into an input field. Like a human typing on a keyboard." },
          { term: "click()", def: "Clicks an element. The element must be visible and clickable." },
          { term: "Implicit Wait", def: "Tells WebDriver to wait X seconds before throwing 'element not found'. Applies globally." },
          { term: "Explicit Wait", def: "Waits for a SPECIFIC condition (element visible, text present). More reliable than implicit waits." }
        ],
        warn: "Never use time.sleep() or Thread.sleep() in real tests. Always use explicit waits. Sleep is the #1 cause of slow, flaky tests."
      }
    ]
  },

  cypress_intro: {
    sections: [
      {
        heading: "Cypress: The Modern Alternative",
        body: "Cypress is a newer tool (2017) designed to be fast, reliable, and developer-friendly. Unlike Selenium which runs OUTSIDE the browser, Cypress runs INSIDE the browser. This means: automatic waiting (no more flaky waits), real-time reloading, time-travel debugging, and much easier setup. Trade-off: it only supports Chromium-based browsers and Firefox (no Safari/IE).",
        terms: [
          { term: "Runs in Browser", def: "Cypress executes inside the same event loop as your app. This means it can intercept network requests, manipulate DOM directly, and wait automatically." },
          { term: "Time-Travel", def: "Cypress takes snapshots at each step. You can hover over each command and SEE what the page looked like at that moment." },
          { term: "Automatic Waiting", def: "Cypress automatically waits for elements to appear, animations to complete, and pages to load. No explicit waits needed in most cases." }
        ],
        tip: "If you're starting fresh (no legacy Selenium tests), Cypress is often the better choice for web UI automation. Faster to learn, less flaky."
      },
      {
        heading: "Cypress vs Selenium — Quick Comparison",
        body: "Selenium: Multi-language, multi-browser, industry standard, requires explicit waits, runs outside browser, complex setup, large community. Cypress: JavaScript only, Chromium + Firefox, modern DX, automatic waits, runs inside browser, simple setup, growing fast. Many companies use BOTH: Cypress for fast feedback on Chrome, Selenium Grid for cross-browser verification.",
        code: `// Cypress Example — same login test
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
    cy.get('h1').should('contain', 'Welcome')
  })
})`,
        tip: "Notice: no waits, no driver setup, no browser close. Cypress handles all of that automatically. This is why teams love it for rapid development."
      }
    ]
  },

  playwright_intro: {
    sections: [
      {
        heading: "Playwright: Best of Both Worlds",
        body: "Playwright (by Microsoft, 2020) combines Selenium's cross-browser support with Cypress's modern developer experience. It supports Chrome, Firefox, Safari, and mobile browsers. It has auto-waiting, powerful selectors, network interception, and runs tests in parallel by default. If you're choosing a tool in 2024+, Playwright is increasingly the top recommendation.",
        terms: [
          { term: "Cross-Browser", def: "Playwright supports Chromium, Firefox, AND WebKit (Safari). True cross-browser testing without extra setup." },
          { term: "Auto-Wait", def: "Like Cypress, Playwright waits for elements to be actionable before interacting. Reduces flakiness dramatically." },
          { term: "Codegen", def: "Playwright can RECORD your actions and generate test code. Open a browser, click around, get code. Great for learning." },
          { term: "Trace Viewer", def: "Like Cypress's time-travel but even more powerful. Records video, DOM snapshots, network calls, and console logs." }
        ],
        code: `// Playwright Example (JavaScript)
const { test, expect } = require('@playwright/test');

test('login flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h1')).toContainText('Welcome');
});`,
        tip: "Playwright's 'codegen' tool is your best friend when starting. Run: npx playwright codegen example.com — then just click around and it writes the code for you!"
      }
    ]
  },

  api_testing: {
    sections: [
      {
        heading: "Why API Testing is Your Secret Weapon",
        body: "API tests run 10-100x faster than UI tests, are more stable (no CSS changes breaking them), and test the actual business logic directly. As an automation engineer, you should automate at the API level first, then add minimal UI tests on top. Example: to test 'user registration handles duplicate emails,' you don't need a browser — just send a POST request twice and check the response.",
        terms: [
          { term: "REST API", def: "The most common web API style. Uses HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove). Returns JSON responses." },
          { term: "Status Code", def: "HTTP response number indicating result: 200=OK, 201=Created, 400=Bad Request, 401=Unauthorized, 404=Not Found, 500=Server Error." },
          { term: "Postman", def: "Popular tool for manually testing APIs. Also supports automated test collections that can run in CI/CD via Newman." },
          { term: "Request/Response", def: "You send a Request (method + URL + body + headers) and get a Response (status code + body + headers). Testing means verifying the response." }
        ],
        tip: "Start with Postman for learning — it's visual and intuitive. Then move to code-based API testing (REST Assured for Java, requests for Python, supertest for JS)."
      },
      {
        heading: "API Test Example",
        body: "Here's what API testing looks like in practice. No browser, no clicking, no waiting for pages to load. Just send data and verify the response.",
        code: `# Python API test example using requests
import requests

# Test: Create a user
response = requests.post(
    "https://api.example.com/users",
    json={"name": "Jane", "email": "jane@test.com"}
)

# Verify
assert response.status_code == 201
data = response.json()
assert data["name"] == "Jane"
assert "id" in data  # Should return an ID

# Test: Duplicate email should fail
response2 = requests.post(
    "https://api.example.com/users",
    json={"name": "Jane2", "email": "jane@test.com"}
)
assert response2.status_code == 409  # Conflict`,
        terms: [
          { term: "JSON", def: "JavaScript Object Notation — the standard data format for APIs. Looks like: {\"name\": \"Jane\", \"age\": 30}" },
          { term: "Headers", def: "Metadata sent with requests. Common: Authorization (token), Content-Type (usually application/json)." },
          { term: "Authentication", def: "Proving who you are to the API. Usually via Bearer token in the Authorization header." }
        ]
      }
    ]
  },

  programming_basics: {
    sections: [
      {
        heading: "You Don't Need to Be a Developer",
        body: "You need to: read code, write simple functions, use variables and loops, understand if/else logic, work with lists/arrays, and call functions. You do NOT need to: build full applications, understand complex algorithms, or architect systems. Think of it as learning enough English to order food in a restaurant — not writing a novel.",
        terms: [
          { term: "Variable", def: "A named container for data. name = 'Selenium' or let timeout = 30. Used to store values you'll reference later." },
          { term: "Function", def: "A reusable block of code. def login(user, password): — define it once, call it from any test." },
          { term: "Loop", def: "Repeat something multiple times. for item in list: — useful for checking multiple elements or running data-driven tests." },
          { term: "Conditional", def: "if/else logic. if element.is_displayed(): click it. Same decision logic you use in manual testing." }
        ],
        tip: "Pick ONE language: Python (easiest to learn) or JavaScript (used by Cypress/Playwright). Don't try to learn both at once."
      },
      {
        heading: "Python for QA — The Essentials",
        body: "Python is the most popular choice for QA automation beginners because its syntax reads like English. Here's everything you need for your first month:",
        code: `# Variables
url = "https://example.com"
timeout = 30
is_logged_in = False

# Lists (arrays)
test_users = ["alice", "bob", "charlie"]

# Functions
def login(username, password):
    driver.find_element(By.ID, "user").send_keys(username)
    driver.find_element(By.ID, "pass").send_keys(password)
    driver.find_element(By.ID, "submit").click()

# Loop — test with multiple users
for user in test_users:
    login(user, "password123")
    assert is_logged_in_successfully()
    logout()

# If/else
if element.is_displayed():
    element.click()
else:
    print("Element not visible, skipping")`
      }
    ]
  },

  page_object_model: {
    sections: [
      {
        heading: "The #1 Pattern in Test Automation",
        body: "Page Object Model (POM) means: for each page in your app, create a class that represents it. The class contains: all locators for that page's elements, and methods for all actions you can do on that page. Your tests then call these methods instead of directly interacting with elements. This is THE most important concept for writing maintainable automation.",
        terms: [
          { term: "Page Object", def: "A class representing one page/screen. Contains locators and action methods. Example: LoginPage has username field, password field, and login() method." },
          { term: "Separation of Concerns", def: "Tests describe WHAT to test. Page objects describe HOW to interact. If the UI changes, only the page object changes — tests stay the same." },
          { term: "DRY Principle", def: "Don't Repeat Yourself. Without POM, 50 tests duplicate the same login code. With POM, 50 tests call loginPage.login() — one source of truth." }
        ],
        warn: "If you're writing element locators directly in test files, STOP. That's the #1 sign of an unmaintainable test suite. Use page objects."
      },
      {
        heading: "Page Object Example",
        body: "Here's how a login test looks WITH and WITHOUT POM:",
        code: `# WITHOUT POM (bad — duplicated, hard to maintain)
def test_login():
    driver.find_element(By.ID, "username").send_keys("user1")
    driver.find_element(By.ID, "password").send_keys("pass")
    driver.find_element(By.CSS_SELECTOR, ".login-btn").click()

def test_login_invalid():
    driver.find_element(By.ID, "username").send_keys("bad")
    driver.find_element(By.ID, "password").send_keys("wrong")
    driver.find_element(By.CSS_SELECTOR, ".login-btn").click()

# WITH POM (good — clean, maintainable)
class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.username = (By.ID, "username")
        self.password = (By.ID, "password")
        self.login_btn = (By.CSS_SELECTOR, ".login-btn")

    def login(self, user, pwd):
        self.driver.find_element(*self.username).send_keys(user)
        self.driver.find_element(*self.password).send_keys(pwd)
        self.driver.find_element(*self.login_btn).click()

# Tests using POM — clean and readable
def test_login(login_page):
    login_page.login("user1", "pass")
    assert dashboard_is_visible()

def test_login_invalid(login_page):
    login_page.login("bad", "wrong")
    assert error_message_shown()`,
        tip: "When the UI changes login button from '.login-btn' to '#submit-login', you update ONE line in LoginPage — not 50 tests."
      }
    ]
  },

  framework_design: {
    sections: [
      {
        heading: "What is a Test Framework?",
        body: "A test framework is the organized structure that holds all your automation code together. It includes: a test runner (executes tests), page objects (UI interactions), utilities (helpers, config), test data (inputs), and reporting (results). Think of it like a filing cabinet — without one, you have papers everywhere. With one, everything has a place.",
        terms: [
          { term: "Test Runner", def: "Tool that discovers and executes tests: pytest (Python), Jest/Mocha (JS), TestNG/JUnit (Java). Handles setup/teardown, parallel execution, reporting." },
          { term: "Configuration", def: "Settings stored outside code: URLs, browser choice, timeouts, credentials. Changed without touching test code." },
          { term: "Test Data", def: "Input data separated from test logic. Stored in CSV, JSON, Excel, or databases. Enables data-driven testing." },
          { term: "Utilities/Helpers", def: "Shared functions: screenshot capture, wait helpers, date generators, random data builders." }
        ]
      },
      {
        heading: "Typical Framework Folder Structure",
        body: "A well-organized framework looks like this:",
        code: `my-automation-framework/
├── tests/               # Test files
│   ├── test_login.py
│   ├── test_checkout.py
│   └── test_search.py
├── pages/               # Page Objects
│   ├── login_page.py
│   ├── home_page.py
│   └── checkout_page.py
├── utils/               # Helpers
│   ├── config.py
│   ├── wait_helpers.py
│   └── data_generator.py
├── test_data/           # Input data
│   ├── users.json
│   └── products.csv
├── reports/             # Test results
├── conftest.py          # Setup/teardown (pytest)
├── pytest.ini           # Configuration
└── requirements.txt     # Dependencies`,
        tip: "Start simple. You can always add complexity later. A folder for tests, a folder for pages, and a config file — that's enough to start."
      }
    ]
  },

  ci_cd: {
    sections: [
      {
        heading: "What is CI/CD?",
        body: "CI/CD means Continuous Integration / Continuous Delivery. In simple terms: every time a developer pushes code, automated tests run AUTOMATICALLY. If tests pass, the code can deploy. If tests fail, deployment is blocked. Your automated tests become the safety gate that prevents bugs from reaching production. This is where automation delivers its biggest value.",
        terms: [
          { term: "CI (Continuous Integration)", def: "Developers merge code frequently (daily). Each merge triggers automated builds and tests." },
          { term: "CD (Continuous Delivery)", def: "Code that passes all tests is automatically ready to deploy (or deploys automatically)." },
          { term: "Pipeline", def: "A sequence of stages: Build → Test → Deploy. Your automation tests are the 'Test' stage." },
          { term: "Jenkins / GitHub Actions / GitLab CI", def: "Popular CI/CD tools that run your test pipelines. You configure them with a YAML file." }
        ],
        tip: "Your first CI goal: 'When code is pushed, run our smoke tests. If they fail, block the merge.' This single step prevents more production bugs than anything else."
      },
      {
        heading: "Running Tests in a Pipeline",
        body: "Here's what a simple CI configuration looks like (GitHub Actions):",
        code: `# .github/workflows/tests.yml
name: Run Automated Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest tests/ --html=report.html
      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: test-report
          path: report.html`,
        terms: [
          { term: "Trigger", def: "What starts the pipeline: push, pull request, schedule (nightly), or manual." },
          { term: "Artifact", def: "Files saved from a pipeline run: test reports, screenshots, logs." },
          { term: "Parallel Execution", def: "Running tests on multiple machines at once. A 1-hour suite runs in 10 minutes on 6 machines." }
        ]
      }
    ]
  },

  reporting: {
    sections: [
      {
        heading: "Making Test Results Visible",
        body: "Nobody reads raw console output. Good reporting means: dashboards showing pass/fail trends, clear failure messages with screenshots, history over time, and metrics that management understands. Tools like Allure generate beautiful interactive reports. Simple HTML reports work great too.",
        terms: [
          { term: "Allure Report", def: "The gold standard for test reporting. Interactive, beautiful, shows steps, attachments, history, and categories." },
          { term: "Screenshot on Failure", def: "Essential — when a test fails, capture what the page looked like. Saves hours of debugging." },
          { term: "Test Metrics", def: "Pass rate, execution time, flaky test rate, coverage percentage. Track these weekly." }
        ],
        tip: "Always include screenshots on failure and clear error messages. The easier it is to debug, the more your team trusts automation."
      }
    ]
  },

  best_practices: {
    sections: [
      {
        heading: "The Golden Rules of Test Automation",
        body: "These rules separate a test suite that helps the team from one that becomes a maintenance nightmare:",
        terms: [
          { term: "1. Tests Must Be Independent", def: "Each test runs alone, in any order. No test depends on another test's output. This enables parallel execution and easier debugging." },
          { term: "2. Use Explicit Waits, Never Sleep", def: "Wait for specific conditions (element visible, API responded), not arbitrary seconds. Tests run faster and are more reliable." },
          { term: "3. Use Page Objects", def: "Never put locators in test files. One locator change shouldn't break 50 tests." },
          { term: "4. Test Data Independence", def: "Tests create their own data (or use unique data). Never rely on pre-existing database state." },
          { term: "5. Fast Feedback", def: "Smoke tests < 5 min. Full regression < 30 min. If it takes longer, parallelize or split." },
          { term: "6. Fix Flaky Tests Immediately", def: "A test that randomly fails is WORSE than no test. It teaches the team to ignore failures." },
          { term: "7. Readable Test Names", def: "test_user_can_login_with_valid_credentials() — anyone should understand what's being tested without reading code." }
        ]
      },
      {
        heading: "Common Mistakes to Avoid",
        body: "Learn from others' failures so you don't repeat them.",
        terms: [
          { term: "Automating everything at once", def: "Start with 20 high-value tests. Prove value. Then expand. Don't promise 500 tests in month 1." },
          { term: "No maintenance plan", def: "Tests break when the app changes. Budget 20-30% of automation time for maintenance." },
          { term: "Testing implementation, not behavior", def: "Test 'user can checkout' not 'button with class cart-submit gets clicked'. Implementation changes; behavior shouldn't." },
          { term: "Ignoring test environment", def: "Tests need a consistent, dedicated test environment. Testing against a changing dev server = constant failures." },
          { term: "No version control", def: "Test code is code. It goes in Git, gets code-reviewed, and has commit history. Period." }
        ],
        warn: "The biggest mistake of all: building automation in isolation without talking to developers. Collaborate! Ask them to add data-testid attributes. Align on test environments."
      }
    ]
  }
};

// ============================================================
// FLASHCARDS
// ============================================================
const FLASHCARDS = [
  { q: "What is test automation?", a: "Using software tools to execute pre-written tests automatically, compare results, and report pass/fail without human intervention.", topic: "why_automate" },
  { q: "What is the #1 use case for automation?", a: "Regression testing — re-running existing tests after code changes to catch unintended breaks.", topic: "why_automate" },
  { q: "When should you NOT automate a test?", a: "One-time tests, features actively changing, tests needing human judgment (UX/visual), or exploratory testing.", topic: "what_to_automate" },
  { q: "What is a locator?", a: "How automation finds an element on the page — by ID, class, CSS selector, XPath, or data-testid attribute.", topic: "automation_mindset" },
  { q: "What is an assertion?", a: "A code statement that checks if something is true. If it fails, the test fails.", topic: "automation_mindset" },
  { q: "What is a flaky test?", a: "A test that sometimes passes and sometimes fails without code changes. Usually caused by timing/sync issues.", topic: "automation_mindset" },
  { q: "What are the 3 levels of the test pyramid?", a: "Unit tests (base, most), Integration/API tests (middle), E2E/UI tests (top, fewest).", topic: "test_pyramid" },
  { q: "Why are API tests preferred over UI tests?", a: "10-100x faster, more stable (no CSS changes breaking them), test business logic directly.", topic: "api_testing" },
  { q: "What is Page Object Model (POM)?", a: "A pattern where each page has a class with its locators and actions. Tests call page methods instead of directly finding elements.", topic: "page_object_model" },
  { q: "Why is POM important?", a: "Maintainability — when UI changes, you update ONE page object, not 50 tests.", topic: "page_object_model" },
  { q: "What does DRY stand for?", a: "Don't Repeat Yourself — write reusable code (like page objects) instead of duplicating logic across tests.", topic: "page_object_model" },
  { q: "What is CI/CD?", a: "Continuous Integration / Continuous Delivery — automated builds and tests run on every code change.", topic: "ci_cd" },
  { q: "What is a pipeline?", a: "A sequence of stages (Build → Test → Deploy) that code passes through automatically.", topic: "ci_cd" },
  { q: "Why should tests be independent?", a: "So they can run in any order, in parallel, and a failure in one doesn't cascade to others.", topic: "best_practices" },
  { q: "What is Selenium WebDriver?", a: "An open-source tool that controls real web browsers through code. Industry standard for 15+ years.", topic: "selenium_basics" },
  { q: "What is Cypress?", a: "A modern test tool that runs inside the browser, with automatic waiting and time-travel debugging.", topic: "cypress_intro" },
  { q: "What is Playwright?", a: "Microsoft's cross-browser automation tool (Chrome, Firefox, Safari) with auto-wait and codegen.", topic: "playwright_intro" },
  { q: "What does 'shift left' mean?", a: "Testing earlier in development — catching bugs at unit/API level before they reach the UI.", topic: "test_pyramid" },
  { q: "What should you automate FIRST?", a: "Smoke tests — 10-20 tests that verify core functionality works. Quick win that proves value.", topic: "what_to_automate" },
  { q: "What is an explicit wait?", a: "Waiting for a SPECIFIC condition (element visible, text present) before proceeding. More reliable than sleep.", topic: "selenium_basics" },
  { q: "Why is time.sleep() bad in tests?", a: "It always waits the full time even if the page is ready sooner, making tests slow. And if the page is slower, it causes failures.", topic: "selenium_basics" },
  { q: "What is data-driven testing?", a: "Running the same test with different data sets (e.g., testing login with 50 different credentials).", topic: "what_to_automate" },
  { q: "What is a test runner?", a: "Tool that discovers and executes tests: pytest (Python), Jest (JS), TestNG (Java). Handles setup/teardown and reporting.", topic: "framework_design" },
  { q: "Name 3 popular CI/CD tools", a: "Jenkins, GitHub Actions, GitLab CI. They run your test pipeline automatically on code changes.", topic: "ci_cd" },
  { q: "What is Allure Report?", a: "An interactive test reporting tool that shows steps, screenshots, history, and pass/fail trends.", topic: "reporting" },
  { q: "What is HTTP status code 200?", a: "OK — the request succeeded.", topic: "api_testing" },
  { q: "What is HTTP status code 404?", a: "Not Found — the requested resource doesn't exist.", topic: "api_testing" },
  { q: "What is HTTP status code 500?", a: "Internal Server Error — something broke on the server.", topic: "api_testing" },
  { q: "What is REST?", a: "REpresentational State Transfer — the most common API style. Uses HTTP methods (GET, POST, PUT, DELETE) and returns JSON.", topic: "api_testing" },
  { q: "What language should a QA beginner learn?", a: "Python (easiest syntax) or JavaScript (used by Cypress/Playwright). Pick ONE.", topic: "programming_basics" },
];

// ============================================================
// QUIZ QUESTIONS
// ============================================================
const QUIZ_QUESTIONS = [
  { q: "What is the PRIMARY benefit of test automation?", options: ["Replacing manual testers", "Running regression tests quickly and repeatedly", "Making testing easier", "Eliminating all bugs"], answer: 1, explanation: "Automation's biggest value is running repetitive regression tests quickly. It doesn't replace manual testers — it frees them for higher-value work.", topic: "why_automate" },
  { q: "Which tests should you automate FIRST?", options: ["All tests", "Edge cases", "Smoke/regression tests for stable features", "Tests for new features"], answer: 2, explanation: "Start with stable, repetitive tests (smoke/regression). New features change too often and edge cases have less ROI initially.", topic: "what_to_automate" },
  { q: "What is the Test Pyramid?", options: ["A management hierarchy", "A testing framework", "A model showing ideal distribution of test types (many unit, some integration, few E2E)", "A certification exam"], answer: 2, explanation: "The pyramid suggests: lots of fast unit tests at the base, some integration tests in the middle, and few slow E2E tests at the top.", topic: "test_pyramid" },
  { q: "What is a Page Object?", options: ["A web page", "A class representing a page with locators and action methods", "A testing tool", "A type of locator"], answer: 1, explanation: "A Page Object is a class that encapsulates a page's elements and interactions, keeping tests clean and maintainable.", topic: "page_object_model" },
  { q: "Why should you avoid time.sleep() in tests?", options: ["It's deprecated", "It makes tests slow and unreliable — use explicit waits instead", "It doesn't work in Selenium", "It costs money"], answer: 1, explanation: "Sleep always waits the full duration even if the page is ready. Explicit waits check for conditions and proceed immediately when ready.", topic: "selenium_basics" },
  { q: "What is CI/CD?", options: ["A testing tool", "Continuous Integration/Continuous Delivery — automated build+test on every code change", "A programming language", "A type of test report"], answer: 1, explanation: "CI/CD means code changes automatically trigger builds and tests, enabling fast, safe releases.", topic: "ci_cd" },
  { q: "Which tool runs INSIDE the browser?", options: ["Selenium", "Cypress", "Postman", "Jenkins"], answer: 1, explanation: "Cypress runs inside the browser's event loop, giving it direct access to the DOM and automatic waiting.", topic: "cypress_intro" },
  { q: "What HTTP status code means 'Created'?", options: ["200", "201", "301", "404"], answer: 1, explanation: "201 means a new resource was successfully created (e.g., after a POST request to create a user).", topic: "api_testing" },
  { q: "What is a flaky test?", options: ["A test that always fails", "A test that passes/fails randomly without code changes", "A test that's too slow", "A deprecated test"], answer: 1, explanation: "Flaky tests fail intermittently due to timing issues, test dependencies, or unstable environments. They destroy team trust in automation.", topic: "automation_mindset" },
  { q: "What does DRY mean?", options: ["Don't Run Yesterday", "Don't Repeat Yourself", "Debug, Run, Yield", "Deliver Rapidly, Yolo"], answer: 1, explanation: "Don't Repeat Yourself — write reusable code (page objects, helpers) instead of copy-pasting the same logic across tests.", topic: "page_object_model" },
  { q: "What is Playwright's 'codegen' feature?", options: ["A code editor", "Records your browser actions and generates test code", "A reporting tool", "A CI/CD pipeline"], answer: 1, explanation: "Codegen opens a browser, records your clicks/typing, and outputs test code. Great for beginners to see how automation code maps to actions.", topic: "playwright_intro" },
  { q: "Which is the best locator strategy?", options: ["XPath always", "data-testid attributes", "Class names", "Text content"], answer: 1, explanation: "data-testid attributes are purpose-built for testing, don't change with styling, and are explicit. Ask developers to add them.", topic: "selenium_basics" },
  { q: "How should tests handle test data?", options: ["Use production data", "Create their own data or use unique test data", "Share data between tests", "Hardcode everything"], answer: 1, explanation: "Tests should be independent — each creates its own data or uses unique data that doesn't conflict with other tests.", topic: "best_practices" },
  { q: "What percentage of automation time should be budgeted for maintenance?", options: ["0%", "5%", "20-30%", "80%"], answer: 2, explanation: "Apps change constantly. Budget 20-30% of automation effort for updating tests when UI or features change.", topic: "best_practices" },
  { q: "What is an API?", options: ["A visual interface", "Application Programming Interface — how software components communicate", "A testing tool", "A type of database"], answer: 1, explanation: "APIs are how software talks to software. In testing, you can send requests directly to APIs without needing a browser.", topic: "api_testing" },
  { q: "What is Selenium Grid used for?", options: ["Finding elements", "Running tests on multiple browsers/machines in parallel", "Generating reports", "Writing test data"], answer: 1, explanation: "Selenium Grid distributes tests across multiple machines and browsers, enabling parallel execution for faster results.", topic: "selenium_basics" },
  { q: "What should a test name look like?", options: ["test_1", "test_user_can_login_with_valid_credentials", "loginTest", "t_login"], answer: 1, explanation: "Test names should clearly describe WHAT is being tested. Anyone should understand the test's purpose without reading the code.", topic: "best_practices" },
  { q: "When should you use E2E (UI) tests?", options: ["For everything", "Only for critical user journeys and happy paths", "Never", "Only for API calls"], answer: 1, explanation: "E2E tests are slow and brittle. Use them for critical happy paths. Test edge cases and logic at the API level.", topic: "test_pyramid" },
  { q: "What is an explicit wait in Selenium?", options: ["time.sleep(5)", "Waiting for a specific condition before proceeding", "Waiting forever", "A global timeout"], answer: 1, explanation: "Explicit waits use WebDriverWait to wait for specific conditions (element visible, clickable, text present) — much more reliable than sleep.", topic: "selenium_basics" },
  { q: "What makes Playwright different from Selenium?", options: ["It only works with Java", "It combines cross-browser support with modern auto-waiting and codegen", "It's older than Selenium", "It doesn't support Chrome"], answer: 1, explanation: "Playwright supports Chrome, Firefox, AND Safari with modern features like auto-wait, codegen, and trace viewer — best of Selenium + Cypress.", topic: "playwright_intro" },
];
