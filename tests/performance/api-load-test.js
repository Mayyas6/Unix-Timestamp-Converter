import http from 'k6/http';
import { check, sleep } from 'k6';

// Lightweight configuration - minimal load
export const options = {
  stages: [
    { duration: '10s', target: 2 }, // Ramp up to 2 users over 10 seconds
    { duration: '20s', target: 2 }, // Stay at 2 users for 20 seconds
    { duration: '10s', target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    http_req_failed: ['rate<0.1'], // Error rate should be below 10%
  },
};

const API_URL = 'https://helloacm.com/api/unix-timestamp-converter/?cached&s=';

// Limited test data to reduce requests
const testInputs = [
  '1703469000', // Unix timestamp
  '2024-12-25 14:30:00', // Date string
  'tomorrow', // Natural language
];

export default function () {
  // Pick a random input from test data
  const randomInput = testInputs[Math.floor(Math.random() * testInputs.length)];
  const url = API_URL + encodeURIComponent(randomInput);

  // Make request
  const response = http.get(url);

  // Assertions
  check(response, {
    'status is 200': r => r.status === 200,
    'response time < 2s': r => r.timings.duration < 2000,
    'response has content': r => r.body.length > 0,
  });

  // Wait 2 seconds between requests (longer pause to reduce load)
  sleep(2);
}
