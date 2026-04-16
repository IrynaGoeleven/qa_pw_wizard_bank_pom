import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let customer;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm();
  await addCustomerPage.submitCustomerForm();
  await page.reload();

  customer = {
    firstName: addCustomerPage.firstName,
    lastName: addCustomerPage.lastName,
    postCode: addCustomerPage.postCode,
  };

});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page, customer);

  await openAccountPage.open();
  await openAccountPage.selectCustomer(customer.firstName + ' ' + customer.lastName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
  await customersListPage.open();
  await customersListPage.assertAccountNumberIsNotEmpty();
});
