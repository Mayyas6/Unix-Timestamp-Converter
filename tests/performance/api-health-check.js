import http from 'k6/http';
import { check, sleep } from 'k6';

// Minimal configuration - just verify API is responsive
export const options = {
  vus: 1, // Only 1 virtual user
  iterations: 5, // Run only 5 times total
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% below 3 seconds
  },
};

const API_URL = 'https://helloacm.com/api/unix-timestamp-converter/?cached&s=';

// Test one of each type
const testCases = [
  { input: '1703469000', type: 'timestamp' },
  { input: '2024-12-25 14:30:00', type: 'date' },
  { input: 'tomorrow', type: 'natural language' },
];

export default function () {
  testCases.forEach(({ input, type }) => {
    const response = http.get(API_URL + encodeURIComponent(input));

    check(response, {
      [`${type} conversion is successful`]: r => r.status === 200,
      [`${type} response has content`]: r => r.body.length > 0,
    });

    // Wait 3 seconds between each request
    sleep(3);
  });
}
