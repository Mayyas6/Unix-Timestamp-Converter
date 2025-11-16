export const edgeCases = [
  { input: '0', expected: '1970-01-01 00:00:00', description: 'Unix epoch' },
  {
    input: '-86400',
    expected: '1969-12-31 00:00:00',
    description: 'negative timestamp',
  },
  {
    input: '2147483647',
    expected: '2038-01-19 03:14:07',
    description: 'Year 2038 problem',
  },
  {
    input: '253402300799',
    expected: '9999-12-31 23:59:59',
    description: 'far future date',
  },
  {
    input: '1970-01-01 00:00:00',
    expected: 0,
    description: 'Unix epoch (date string)',
  },
  {
    input: '2024-02-29 12:00:00',
    expected: 1709208000,
    description: 'leap year date (Feb 29, 2024)',
  },
  {
    input: '2000-02-29 00:00:00',
    expected: 951782400,
    description: 'century leap year (Feb 29, 2000)',
  },
  {
    input: '2024-12-31 23:59:59',
    expected: 1735689599,
    description: 'end of year boundary',
  },
];

export const errorCases = [
  {
    input: '',
    expectedStatus: 400,
    description: 'empty input',
  },
  {
    input: 'invalid-date',
    expectedStatus: 400,
    description: 'invalid date format',
  },
  {
    input: '2024-13-45',
    expectedStatus: 400,
    description: 'non-existent date',
  },
  {
    input: 'abc123',
    expectedStatus: 400,
    description: 'non-numeric string',
  },
  {
    input: '2023-02-29 12:00:00',
    expectedStatus: 400,
    description: 'invalid leap year date',
  },
  {
    input: "'; DROP TABLE--",
    expectedStatus: 403,
    description: 'SQL injection attempt',
  },
];

export const happyPathCases = [
  {
    input: '1735137000',
    expected: '2024-12-25 14:30:00',
    description: 'standard timestamp to date',
  },
  {
    input: '1704067200',
    expected: '2024-01-01 12:00:00',
    description: 'new year timestamp',
  },
  {
    input: '1719792000',
    expected: '2024-07-01 12:00:00',
    description: 'mid-year timestamp',
  },
  {
    input: '1641074400',
    expected: '2022-01-01 22:00:00',
    description: 'past year timestamp',
  },
  {
    input: '2024-12-25 14:30:00',
    expected: 1735137000,
    description: 'standard date to timestamp',
  },
  {
    input: '2024-06-15 09:30:00',
    expected: 1718443800,
    description: 'mid-year date to timestamp',
  },
  {
    input: '2024-12-25 02:30:00 PM',
    expected: 1735137000,
    description: 'use AM/PM standard',
  },
  {
    input: '2024-01-01 00:00:00',
    expected: 1704067200,
    description: 'new year date to timestamp',
  },
  {
    input: '2025-12-31 23:59:59',
    expected: 1767225599,
    description: 'end of year date to timestamp',
  },
];

export const naturalLanguageTests = [
  { input: 'tomorrow', shouldBeFuture: true, maxDaysAway: 2 },
  { input: 'yesterday', shouldBeFuture: false, maxDaysAway: 2 },
  { input: 'next week', shouldBeFuture: true, maxDaysAway: 14 },
  { input: 'last month', shouldBeFuture: false, maxDaysAway: 62 },
  { input: 'next year', shouldBeFuture: true, maxDaysAway: 730 },
  { input: '+3 days', shouldBeFuture: true, maxDaysAway: 4 },
  { input: '+1 week', shouldBeFuture: true, maxDaysAway: 14 },
];
