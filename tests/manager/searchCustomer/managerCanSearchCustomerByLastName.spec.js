import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
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

test('Assert manager can search customer by Last Name', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
  const customersListPage = new CustomersListPage(page, customer);

  await customersListPage.open();
  await customersListPage.searchCustomerByLastName();
  await customersListPage.assertOnlyOneCustomerRowIsPresent();
});
