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
const emailServicePage = require('../pageobjects/emailService.page');
const signupPage = require('../pageobjects/signup.page');

Given(/^User has an email/, async () => {
  // open email service
  emailServicePage.openEmailServicePage();
  // assert elements are loaded
  helpers.assertTitleLiteral('10-minutowy Mail');
  // get generated email adress
  const emailServiceAdress =
    await emailServicePage.getEmailAddress(); // should be string
  console.log(emailServiceAdress);
  fs.writeFileSync(
    'features/test-data/account.txt',
    emailServiceAdress
  );
  // switch back to main tab
  const handles =
    await browser.getWindowHandles();
  await browser.switchToWindow(handles[0]);
});

When(
  /^User navigates to the sign up page/,
  async () => {
    await $(
      '.account-standard__toggle-button'
    ).waitForExist();
    await $(
      '.account-standard__toggle-button'
    ).moveTo();
    await (
      await homePage.btnSignUp
    ).waitForExist();
    homePage.navigateToSignUp();
    await (
      await browser.$('.step-welcome-main-text')
    ).waitForExist();
    // assert sign in page is loaded
    await helpers.assertTitleLiteral('Konto TVN'); // maybe more specific?
    // await browser.pause(3000);
  }
);

When(
  /^User registers with his email/,
  async () => {
    // state 1 - method selection
    await (
      await signupPage.btnRegisterEmail
    ).waitForExist();
    signupPage.navigateRegisterEmail();
    // new state loads - state 2 - email registration form
    await (
      await signupPage.btnSubmitSignup
    ).waitForExist();
    const randomTestName =
      helpers.randomTestName2();
    signupPage.setFormInputUsername(
      randomTestName
    );
    const emailServiceAdress = fs.readFileSync(
      'features/test-data/account.txt',
      'utf8'
    );
    signupPage.setFormInputEmail(
      emailServiceAdress
    );
    signupPage.setFormInputPassword(
      credentials[1].password
    );
    signupPage.changeFormChboxTos();
    // wait for validation to finish

    await browser.waitUntil(
      async () =>
        !(
          (
            await signupPage.formInputUsername
          ).getAttribute('aria-invalid') ===
            true ||
          (
            await signupPage.formInputEmail
          ).getAttribute('aria-invalid') ===
            true ||
          (
            await signupPage.formInputPassword
          ).getAttribute('aria-invalid') === true
        ),
      {
        timeout: 5000,
        timeoutMsg: 'form not validated',
        interval: 500,
      }
    ); // should I refactor this stream? 
    // browser.pause(3000);
    // await 
    signupPage.submitBtnSubmitSignup(); // executes before validation is complete?
    // new state loads - state 3 - after signup
    // await (
    //   await signupPage.btnAfterSignup
    // ).waitForExist();
    // signupPage.navigateToMainAfterSignup(); wonky!

    // await browser.pause(3000);
    // NEED TO NAVIGATE TO EDIT PROFILE AND CLICK THE SEND CODE DUMMY!
  }
);

Then(
  /^User should be able to finish registration/,
  async () => {
    // change page and handle activation email
    emailServicePage.changeWindowToEmailServicePage();
    // click send code

    emailServicePage.useValidationEmail(); // takes loooong

    const handles =
      await browser.getWindowHandles();
    await browser.switchToWindow(handles[0]); // or 1?
    // await browser.closeWindow(handles[1]);
    // navigate back to main page
    // const handles =
    //   await browser.getWindowHandles();

    // await browser.pause(3000);
  }
);

// Scenario: TC-001 Sign in with valid credentials | incogito
// Given User has an email
// And User is not recognized with a cookie
// And User is on the main page
// When User navigates to the sign up page
// And User registers with his email
// And User navigates to the sign in page
// And User gives valid credentials
// Then User should sign in
// And User should be able to view secure page and edit his profile
