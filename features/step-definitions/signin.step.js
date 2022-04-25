// cucumber imports
import {
  Given,
  When,
  Then,
} from '@wdio/cucumber-framework';
// helpers
import helpers from '../helpers/helpers';
// POM imports
import commonPage from '../pageobjects/common.page';
import homePage from '../pageobjects/home.page';
import signInPage from '../pageobjects/signin.page';
import signUpPage from '../pageobjects/signup.page';

// test data import
import fs from 'fs';
// parse string
let credentials = JSON.parse(
  fs.readFileSync(
    'features/test-data/signin.step.json'
  )
);

When(/^User signs in via email/, async () => {
  console.log('starting User signs in via email');
  helpers.waitForPageToLoad();
  await signInPage.btnSigninEmail.waitForExist();
  signInPage.navigateSigninEmail();
  // assert elements are loaded
  // await browser.pause(3000);
  console.log('ending User signs in via email');
});

When(
  /^User gives valid credentials/,
  async () => {
    console.log(
      'starting User gives valid credentials'
    );
    helpers.waitForPageToLoad();
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
    console.log(
      'ending User gives valid credentials'
    );
  }
);

Then(/^User should sign in/, async () => {
  console.log('starting User should sign in');
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
  console.log('ending User should sign in');
});
