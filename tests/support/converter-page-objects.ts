import { Page, Locator } from '@playwright/test';

export class ConverterPage {
  readonly page: Page;
  readonly inputField: Locator;
  readonly convertButton: Locator;
  readonly resultLabel: Locator;
  readonly resultValue: Locator;
  readonly result: Locator;
  readonly loading: Locator;
  readonly timezoneNote: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inputField = page.getByTestId('input-field');
    this.convertButton = page.getByTestId('convert-button');

    this.result = page.getByTestId('result');
    this.resultLabel = page.locator('#resultLabel');
    this.resultValue = page.getByTestId('result-value');

    this.loading = page.getByTestId('loading');

    this.timezoneNote = page.getByTestId('timezone-note');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async convert(input: string): Promise<string> {
    await this.inputField.fill(input);
    await this.convertButton.click();
    await this.resultValue.waitFor({ state: 'visible' });
    return (await this.resultValue.textContent()) || '';
  }

  async getResultLabel(): Promise<string> {
    return (await this.resultLabel.textContent()) || '';
  }

  async getResultValue(): Promise<string> {
    return (await this.resultValue.textContent()) || '';
  }

  async isLoadingVisible(): Promise<boolean> {
    return await this.loading.isVisible();
  }

  async hasError(): Promise<boolean> {
    const classList = await this.result.getAttribute('class');
    return classList?.includes('error') || false;
  }

  async clearInput(): Promise<void> {
    await this.inputField.clear();
  }

  async pressEnter(): Promise<void> {
    await this.inputField.press('Enter');
  }
}
