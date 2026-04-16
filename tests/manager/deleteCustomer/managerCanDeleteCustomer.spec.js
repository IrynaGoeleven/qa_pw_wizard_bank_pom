import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

let customer;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */


  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm();
  await addCustomerPage.submitCustomerForm();

  customer = {
    firstName: addCustomerPage.firstName,
    lastName: addCustomerPage.lastName,
    postCode: addCustomerPage.postCode,
  };
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
  const customersListPage = new CustomersListPage(page, customer);

  await page.reload();
  await customersListPage.open();
  await customersListPage.deleteCustomer();
  await customersListPage.assertCustomerDeleted();

  await page.reload();
  await customersListPage.open();
  await customersListPage.assertCustomerDeleted();
});
