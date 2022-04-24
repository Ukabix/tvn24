// cucumber imports
const {
  Given,
  When,
  Then,
} = require('@wdio/cucumber-framework');
const helpers = require('../helpers/helpers');
// test data import
const fs = require('fs');
// parse string
let credentials = JSON.parse(
  fs.readFileSync(
    'features/test-data/signin.step.json'
  )
);
// POM imports
// const commonPage = require('../pageobjects/common.page');
// const homePage = require('../pageobjects/home.page');
const signInPage = require('../pageobjects/signin.page');
const homePage = require('../pageobjects/home.page');

When(/^User signs in via email/, async () => {
  await signInPage.btnSigninEmail.waitForExist();
  signInPage.navigateSigninEmail();
  // assert elements are loaded
  // await browser.pause(3000);
});

When(
  /^User gives valid credentials/,
  async () => {
    await signInPage.formInputUsername.waitForExist();
    await signInPage.formInputPassword.waitForExist();
    // pass credentials
    await signInPage.formInputUsername.setValue(
      credentials[1].username
    );
    await signInPage.formInputPassword.setValue(
      credentials[1].password
    );
    // assert elements are loaded
    // await browser.pause(3000);
  }
);

When(/^User navigates to the sign in page/, async () => {
  await (await browser.$('.account-standard__toggle-button')).waitForExist();
  await $('.account-standard__toggle-button').moveTo();
  await (await homePage.btnSignIn).waitForExist();
  homePage.navigateToSignIn();
  // assert sign in page is loaded
  await helpers.assertTitleLiteral("Konto TVN"); // maybe more specific
  // await browser.pause(3000);
});

Then(/^User should sign in/, async () => {
  // await signInPage.btnSubmit.waitForExist(); // redundant?
  await $(
    '.MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-indeterminate'
  ).waitForExist({
    reverse: true,
  });
  // MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-indeterminate
  await browser.pause(3000);
  signInPage.submitSignin();
  // assert user is signed in
  await $(
    '.account-standard__toggle-button'
  ).waitForExist({
    timeout: 200000,
    reverse: false,
    timeoutMsg: '',
    interval: 5000,
  });
  await $(
    '.account-standard__toggle-button'
  ).moveTo();
  await expect(homePage.anchorEditProfile).to
    .exist;
});


