import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.locator('#currency');
    this.customerSelect = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('#/manager/openAccount');
  }

  async selectCustomer(customer) {
    const fullName = `${customer.firstName} ${customer.lastName}`
      .replace(/\s+/g, ' ')
      .trim();

    await this.customerSelect.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async clickProcessButton() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.processButton.click();
  }

  async assertCurrencySelected(currency) {
    await expect(this.currencySelect.locator('option:checked')).toHaveText(currency);
  }
}