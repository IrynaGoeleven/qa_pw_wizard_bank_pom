import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postCodeInput = page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });

    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.postCode = faker.location.zipCode();
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillCustomerForm() {
    await this.firstNameInput.fill(this.firstName);
    await this.lastNameInput.fill(this.lastName);
    await this.postCodeInput.fill(this.postCode);
  }

  async submitCustomerForm() {
    await this.addCustomerButton.click();
  }

}
