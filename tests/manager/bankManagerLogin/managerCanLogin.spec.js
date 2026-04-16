import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';

test('Assert manager can Login', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
  const bankManagerMainPage = new BankManagerMainPage(page);
  await bankManagerMainPage.open();
  await bankManagerMainPage.clickBankManagerLogin();
  await bankManagerMainPage.assertManagerLoginSuccessful();
});
