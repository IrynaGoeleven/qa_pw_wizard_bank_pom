import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page, customerData) {
    this.page = page;
    this.customerData = customerData;

    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.rows = page.locator('table tbody tr');


  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertCustomerAdded() {
    const row = this.customerRow();
    await expect(row).toHaveCount(1);

    const cells = row.first().locator('td');
    await expect(cells.nth(0)).toHaveText(this.customerData.firstName);
    await expect(cells.nth(1)).toHaveText(this.customerData.lastName);
    await expect(cells.nth(2)).toHaveText(this.customerData.postCode);
    await expect(cells.nth(3)).toBeEmpty();
  }

  customerRow() {
    return this.rows.filter({
      has: this.page.locator('td').filter({ hasText: this.customerData.firstName }),
    }).filter({
      has: this.page.locator('td').filter({ hasText: this.customerData.lastName }),
    }).filter({
      has: this.page.locator('td').filter({ hasText: this.customerData.postCode }),
    });
  }

  async deleteCustomer(customer) {
    const row = this.customerRow();
    await expect(row).toHaveCount(1);
    await row.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCustomerDeleted(customer) {
    await expect(this.customerRow()).toHaveCount(0);
  }

  async assertAccountNumberIsNotEmpty() {
    const row = this.customerRow();
    await expect(row).toHaveCount(1);
    const accountNumberCell = row.last().locator('td').nth(3);
    await expect(accountNumberCell).not.toBeEmpty();
  }

  async searchCustomerByFirstName() {
    await this.page.getByRole('textbox', { name: 'Search Customer' }).fill(this.customerData.firstName);
  }

  async searchCustomerByLastName() {
    await this.page.getByRole('textbox', { name: 'Search Customer' }).fill(this.customerData.lastName);
  }

  async searchCustomerByPostalCode() {
    await this.page.getByRole('textbox', { name: 'Search Customer' }).fill(this.customerData.postCode);
  }

  async assertOnlyOneCustomerRowIsPresent() {
    await expect(this.rows).toHaveCount(1);
    const row = this.rows.first();
    const cells = row.locator('td');
    await expect(cells.nth(0)).toHaveText(this.customerData.firstName);
    await expect(cells.nth(1)).toHaveText(this.customerData.lastName);
    await expect(cells.nth(2)).toHaveText(this.customerData.postCode);
  }
}

