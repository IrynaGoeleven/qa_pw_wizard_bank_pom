export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', {
      name: 'Customer Login',
    });
  }

  async open() {
    await this.page.goto('#/login');
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }
}
