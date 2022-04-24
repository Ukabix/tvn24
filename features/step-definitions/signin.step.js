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
    await signInPage.formUsername.waitForExist();
    await signInPage.formPasword.waitForExist();
    // pass credentials
    await signInPage.formUsername.setValue(
      credentials[1].username
    );
    await signInPage.formPasword.setValue(
      credentials[1].password
    );
    // assert elements are loaded
    // await browser.pause(3000);
  }
);

When(/^User navigates to the sign in page/, async () => {
  await $('.account-standard__toggle-button').moveTo();
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

Then(
  /^User should be able to view secure page and edit his profile/,
  async () => {
    await $(
      '.account-standard__toggle-button'
    ).waitForExist();
    await $(
      '.account-standard__toggle-button'
    ).moveTo();
    await browser.pause(3000);
    homePage.navigateToEditProfile();
    await browser.pause(10000);
    // assert new tab has opened for profile edit
    // helpers.switchToWindow(1);
    // now on edit profile page
    // const pageHandles =
    //   await browser.getWindowHandles(); // returns array - 2 windows
    // // switch page - pass window handle == tabs
    // await browser.switchWindow(pageHandles[1]);
    await expect($("input[name='code']")).to
      .exist;
    browser.pause(3000);
  }
);
