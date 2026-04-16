import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('#/manager/login');
  }
  async clickBankManagerLogin() {
    await this.bankManagerLoginButton.click();
  }

  async assertManagerLoginSuccessful() {
    await expect(this.addCustomerButton).toBeVisible();
    await expect(this.openAccountButton).toBeVisible();
    await expect(this.customersButton).toBeVisible();
  }
}
