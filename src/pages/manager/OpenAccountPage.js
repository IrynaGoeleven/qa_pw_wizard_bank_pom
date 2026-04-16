import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.locator('#currency');
    this.customerSelect = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertCurrencySelected(currency) {
    await expect(this.currencySelect).toHaveValue(currency);
  }
}
