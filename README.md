# Unix Timestamp Converter

This project offers a simple UI for converting between Unix Timestamps and Date & Time Strings

## 🔗 API Reference

This project consumes the **Unix Timestamp Converter API**:

- **API URL**: https://helloacm.com/api/unix-timestamp-converter/
- **Documentation**: https://helloacm.com/tools/unix-timestamp-converter/

The API supports converting:

- Unix timestamps to date strings (format: `Y-m-d H:i:s`)
- Date strings to Unix timestamps

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn
- playwright installed

### Installation

1. Clone the repository:

```
git clone https://github.com/Mayyas6/Unix-Timestamp-Converter.git
```

```
cd Unix-Timestamp-Converter
```

2. Install dependencies:

```
npm install
```

## 🏃 Running the Application

### Start development server:

```
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

## 🧑‍💻 Running Tests

### Run all tests:

If you run the tests without starting localhost first, localhost will be started automatically to run the tests

```
npm test
```

or

```
npm run test
```

### Run tests in UI mode (interactive):

`npm run test:ui`

This opens the Playwright UI for interactive test execution and debugging.

### Run tests with headed browser (visible):

`npm run test:headed`

Watch the tests run in a visible browser window.

### Debug tests:

`npm run test:debug`

Opens Playwright Inspector for step-by-step debugging.

### Run specific test file:

```
npx playwright test tests/playwright/api/converter-api.spec.ts
```

```
npx playwright test tests/playwright/ui/converter-ui.spec.ts
```

Runs tests only in the specified test file

### View test report:

After you run the tests Playwright serves the results as an HTML report if there is any failed test. if all tests pass and you want to serve it:
`npx playwright show-report`

## Tests in CI:

UI tests are running in Github Actions CI on push and pull requests.
**NOTE:** API and Performance tests are ignored in CI here on purpose because they will fail due to issues on the API side, and to not overload the API with performance tests on every commit

# 📈 Performance tests

Lightweight performance tests using k6 to verify API responsiveness without causing excessive load on the third-party API.

### Health check (5 requests, ~15 seconds):

```
npm run perf:health

```

### Light load test (minimal load, ~40 seconds):

```
npm run perf:light

```

**Note:** These tests are intentionally lightweight to respect the third-party API. They validate response times and basic availability without causing significant load.
