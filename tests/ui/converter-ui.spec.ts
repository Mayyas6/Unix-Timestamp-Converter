import { test, expect } from '@playwright/test';
import { ConverterPage } from '../support/converter-page-objects';

test.describe('Timestamp Converter UI Tests', () => {
  let converterPage: ConverterPage;

  test.beforeEach(async ({ page }) => {
    converterPage = new ConverterPage(page);
    await converterPage.goto();
  });

  test('should load the page correctly', async ({ page }) => {
    await expect(page).toHaveTitle('Unix Timestamp Converter');
    await expect(
      page.getByText('Convert between date strings and Unix timestamps')
    ).toBeVisible();
    await expect(converterPage.inputField).toBeVisible();
    await expect(converterPage.convertButton).toBeVisible();
    await expect(converterPage.timezoneNote).toBeVisible();
  });

  test('should show error when input is empty', async () => {
    await converterPage.convertButton.click();
    await expect(converterPage.resultValue).toContainText(
      'Please enter a value'
    );
  });

  test('should convert date string to timestamp', async () => {
    const dateString = '2024-12-25 14:30:00';
    const result = await converterPage.convert(dateString);
    expect(result).toMatch(/^\d+$/);
    const label = await converterPage.getResultLabel();
    expect(label).toBe('Unix Timestamp:');
    // Using JavaScript to calculate expected timestamp
    const expectedTimestamp = Math.floor(
      new Date(dateString).getTime() / 1000
    ).toString();
    // The result should match the calculated timestamp (within reasonable range due to timezone)
    const resultNum = parseInt(result);
    const expectedNum = parseInt(expectedTimestamp);
    const timeDifference = Math.abs(resultNum - expectedNum);
    // Allow for timezone differences (max 24 hours = 86400 seconds)
    expect(timeDifference).toBeLessThan(86400);
  });

  test('should convert timestamp to date string', async () => {
    const timestamp = '1703512200';
    const result = await converterPage.convert(timestamp);
    // Verify result is a date string format
    expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    const label = await converterPage.getResultLabel();
    expect(label).toBe('Date String:');
    expect(result).toMatch(/^2023-12-25/);
  });

  test('should perform round-trip conversion correctly', async () => {
    const originalTimestamp = '1703469000';
    const dateResult = await converterPage.convert(originalTimestamp);
    expect(dateResult).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    await converterPage.clearInput();
    const timestampResult = await converterPage.convert(dateResult);
    expect(timestampResult).toMatch(/^\d+$/);
    expect(originalTimestamp).toMatch(timestampResult);
  });

  test('should show error for invalid input format', async () => {
    await converterPage.convert('invalid-input-123abc');
    await expect(converterPage.result).toBeVisible();
    const hasError = await converterPage.hasError();
    expect(hasError).toBe(true);
  });

  test('should allow input via Enter key', async () => {
    await converterPage.inputField.fill('1703512200');
    await converterPage.pressEnter();
    await expect(converterPage.resultValue).toBeVisible();
  });

  test('should show loading indicator during conversion', async ({ page }) => {
    // Slow down the network to see loading state
    await page.route('**/helloacm.com/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.continue();
    });

    await converterPage.inputField.fill('1703512200');
    await converterPage.convertButton.click();
    const isLoading = await converterPage.isLoadingVisible();
    expect(isLoading).toBe(true);
    await expect(converterPage.resultValue).toBeVisible({ timeout: 5000 });
  });
});
