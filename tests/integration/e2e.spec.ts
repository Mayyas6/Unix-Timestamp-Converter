import { test, expect } from '@playwright/test';
import { ConverterPage } from '../support/converter-page-objects.js';

test.describe('End-to-End Integration Tests', () => {
  let converterPage: ConverterPage;

  test.beforeEach(async ({ page }) => {
    converterPage = new ConverterPage(page);
    await converterPage.goto();
  });

  test('should convert date to timestamp and verify via API', async ({
    page,
  }) => {
    const dateString = '2024-12-25 14:30:00';

    const responsePromise = page.waitForResponse(response =>
      response.url().includes('helloacm.com/api/unix-timestamp-converter')
    );

    const uiTimestamp = await converterPage.convertDateToTimestamp(dateString);

    const response = await responsePromise;
    expect(response.status()).toBe(200);

    const apiTimestamp = await response.text();
    expect(uiTimestamp).toBe(apiTimestamp);
  });

  test('should verify round-trip conversion', async () => {
    const originalDate = '2024-12-25 14:30:00';

    const timestamp = await converterPage.convertDateToTimestamp(originalDate);

    await converterPage.dateInput.clear();
    const resultDate = await converterPage.convertTimestampToDate(timestamp);

    expect(resultDate).toContain('2024-12-25');
  });

  test('should monitor network requests during conversions', async ({
    page,
  }) => {
    let apiCallCount = 0;

    page.on('request', request => {
      if (request.url().includes('helloacm.com/api/unix-timestamp-converter')) {
        apiCallCount++;
      }
    });

    await converterPage.convertTimestampToDate('1703512200');
    await converterPage.convertDateToTimestamp('2024-12-25 14:30:00');

    expect(apiCallCount).toBe(2);
  });
});
