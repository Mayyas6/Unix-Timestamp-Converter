import { Page, Locator } from '@playwright/test';

export class ConverterPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly timestampInput: Locator;
  readonly convertDateButton: Locator;
  readonly convertTimestampButton: Locator;
  readonly dateResult: Locator;
  readonly timestampResult: Locator;
  readonly dateLoading: Locator;
  readonly timestampLoading: Locator;
  readonly timezoneNote: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dateInput = page.getByTestId('date-input');
    this.timestampInput = page.getByTestId('timestamp-input');
    this.convertDateButton = page.getByTestId('convert-date-button');
    this.convertTimestampButton = page.getByTestId('convert-timestamp-button');
    this.dateResult = page.getByTestId('date-result-value');
    this.timestampResult = page.getByTestId('timestamp-result-value');
    this.dateLoading = page.getByTestId('date-loading');
    this.timestampLoading = page.getByTestId('timestamp-loading');
    this.timezoneNote = page.getByTestId('timezone-note');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async convertDateToTimestamp(dateString: string): Promise<string> {
    await this.dateInput.fill(dateString);
    await this.convertDateButton.click();
    await this.dateResult.waitFor({ state: 'visible' });
    return (await this.dateResult.textContent()) || '';
  }

  async convertTimestampToDate(timestamp: string): Promise<string> {
    await this.timestampInput.fill(timestamp);
    await this.convertTimestampButton.click();
    await this.timestampResult.waitFor({ state: 'visible' });
    return (await this.timestampResult.textContent()) || '';
  }

  async isLoadingVisible(
    type: 'date' | 'timestamp' = 'date'
  ): Promise<boolean> {
    const loading = type === 'date' ? this.dateLoading : this.timestampLoading;
    return await loading.isVisible();
  }
}
