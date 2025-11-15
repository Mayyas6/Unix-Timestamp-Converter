import { test, expect } from '@playwright/test';
import { ConverterPage } from '../support/converter-page-objects.js';

test.describe('Timestamp Converter UI Tests', () => {
  let converterPage: ConverterPage;

  test.beforeEach(async ({ page }) => {
    converterPage = new ConverterPage(page);
    await converterPage.goto();
  });

  test('should display page title and subtitle', async ({ page }) => {
    await expect(page).toHaveTitle('Unix Timestamp Converter');
    await expect(
      page.getByText('Convert between date strings and Unix timestamps')
    ).toBeVisible();
  });

  test('should show error when date input is empty', async () => {
    await converterPage.convertDateButton.click();
    await expect(converterPage.dateResult).toContainText(
      'Please enter a date string'
    );
  });

  test('should show error when timestamp input is empty', async () => {
    await converterPage.convertTimestampButton.click();
    await expect(converterPage.timestampResult).toContainText(
      'Please enter a Unix timestamp'
    );
  });

  test('should show error for invalid timestamp format', async () => {
    await converterPage.timestampInput.fill('abc123');
    await converterPage.convertTimestampButton.click();
    await expect(converterPage.timestampResult).toContainText(
      'valid numeric timestamp'
    );
  });

  test('should display timezone note in footer', async () => {
    await expect(converterPage.timezoneNote).toBeVisible();
    await expect(converterPage.timezoneNote).toContainText(
      'This converter uses Coordinated Universal Time (UTC) timezone.'
    );
  });

  test('should allow input via Enter key for timestamp', async () => {
    await converterPage.timestampInput.fill('1703512200');
    await converterPage.timestampInput.press('Enter');
    await expect(converterPage.timestampResult).toBeVisible();
  });
});
