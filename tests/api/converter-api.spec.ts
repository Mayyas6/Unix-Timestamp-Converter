import { test, expect } from '@playwright/test';
import { happyPathCases, edgeCases, errorCases } from 'tests/support/testCases';

const API_URL = 'https://helloacm.com/api/unix-timestamp-converter/?cached&s=';

test.describe('Common cases validation', () => {
  happyPathCases.forEach(({ input, expected, description }) => {
    test(`should convert ${description}`, async ({ request }) => {
      const response = await request.get(API_URL + encodeURIComponent(input));
      expect(response.status()).toBe(200);

      const data = JSON.parse(await response.text());
      expect(data).toBe(expected);
    });
  });
});

// NOTE: skipping because the API is not able to handle too many requests and is returning 429
test.describe.skip('Edge case validation', () => {
  edgeCases.forEach(({ input, expected, description }) => {
    test(`should handle ${description}`, async ({ request }) => {
      const response = await request.get(API_URL + input);
      expect(response.status()).toBe(200);
      const data = JSON.parse(await response.text());
      expect(data).toBe(expected);
    });
  });
});

// NOTE: skipping because the API is not able to handle too many requests and is returning 429
test.describe.skip('Error handling', () => {
  errorCases.forEach(({ input, expectedStatus, description }) => {
    test(`should return ${expectedStatus} for ${description}`, async ({
      request,
    }) => {
      const response = await request.get(API_URL + encodeURIComponent(input));
      expect(response.status()).toBe(expectedStatus);
    });
  });
});

// NOTE: The API page doesn't explicitly mention that these methods are unsupported,
// but based on the API the description these methods should not be supported
test.describe('Unsupported HTTP Methods', () => {
  const validInput = '1735137000';

  test('should return 405 for POST method', async ({ request }) => {
    const response = await request.post(API_URL + validInput);
    expect(response.status()).toBe(405);
  });

  test('should return 405 for PUT method', async ({ request }) => {
    const response = await request.put(API_URL + validInput);
    expect(response.status()).toBe(405);
  });

  test('should return 405 for DELETE method', async ({ request }) => {
    const response = await request.delete(API_URL + validInput);
    expect(response.status()).toBe(405);
  });
});
