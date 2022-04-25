// cucumber imports
import {
  Given, When, Then
} from '@wdio/cucumber-framework';
// helpers
import helpers from '../helpers/helpers';
// POM imports
import commonPage from '../pageobjects/common.page';
import homePage from '../pageobjects/home.page';
import signInPage from '../pageobjects/signin.page';
import signUpPage from '../pageobjects/signup.page';
import emailServicePage from '../pageobjects/emailService.page';

// test data import
import fs from 'fs';
// parse string
let credentials = JSON.parse(
  fs.readFileSync(
    'features/test-data/signin.step.json'
  )
);
// POM imports
// const commonPage = require('../pageobjects/common.page');
// const homePage = require('../pageobjects/home.page');
// const signInPage = require('../pageobjects/signin.page').default;
// const homePage = require('../pageobjects/home.page').default;
// const emailServicePage = require('../pageobjects/emailService.page').default;
// const signUpPage = require('../pageobjects/signup.page').default;

Given(/^User has an email/, async () => {
  console.log('starting User has an email');
  // open email service
  emailServicePage.openEmailServicePage();
  console.log('opened service email page');
  // assert elements are loaded
  helpers.assertTitleLiteral('10-minutowy Mail');
  console.log('asserted visiting service email page');
  // get generated email adress
  const emailServiceAdress =
    await emailServicePage.getEmailAddress(); // should be string
    console.log('fetched email address');
  console.log(emailServiceAdress);
  fs.writeFileSync(
    'features/test-data/account.txt',
    emailServiceAdress
  );
  console.log('dumped email to file');
  // switch back to main tab
  const handles =
    await browser.getWindowHandles();
    console.log('fetched handles');
  await browser.switchToWindow(handles[0]);
  console.log('switched to handle[0]');
  console.log('ending User has an email');
});

When(
  /^User navigates to the sign up page/,
  async () => {
    console.log('starting User navigates to the sign up page');
    await $(
      '.account-standard__toggle-button'
    ).waitForExist();
    console.log('awaited for profile slider div');
    await $(
      '.account-standard__toggle-button'
    ).moveTo();
    console.log('moved cursor to profile slider div icon');
    await (
      await homePage.btnSignUp
    ).waitForExist();
    console.log('awaited btnSignUp to exist');
    homePage.navigateToSignUp();
    console.log('navigated to SignUp ');
    await (
      await browser.$('.step-welcome-main-text')
    ).waitForExist();
    console.log('waited for h1 on signup page');
    // assert sign in page is loaded
    await helpers.assertTitleLiteral('Konto TVN'); // maybe more specific?
    console.log('asserted title == konto tvn');
    console.log('ending User navigates to the sign up page');
    // await browser.pause(3000);
  }
);

When(
  /^User registers with his email/,
  async () => {
    console.log('starting User registers with his email');
    // state 1 - method selection
    await (
      await signUpPage.btnRegisterEmail
    ).waitForExist();
    console.log('waited for btn register email');
    signUpPage.navigateRegisterEmail();
    console.log('navigated to register email');
    // new state loads - state 2 - email registration form
    await (
      await signUpPage.btnSubmitSignup
    ).waitForExist();
    console.log('waited for signup submit btn');
    const randomTestName =
      helpers.randomTestName2();
      console.log('created random name');
    signUpPage.setFormInputUsername(
      randomTestName
    );
    console.log('set random name in input for name');
    const emailServiceAdress = fs.readFileSync(
      'features/test-data/account.txt',
      'utf8'
    );
    console.log('read generated email');
    signUpPage.setFormInputEmail(
      emailServiceAdress
    );
    console.log('set email in email form input');
    signUpPage.setFormInputPassword(
      credentials[1].password
    );
    console.log('passed password from json as password form input');
    signUpPage.changeFormChboxTos();
    console.log('used tos checkbox');
    // wait for validation to finish

    await browser.waitUntil(
      async () =>
        !(
          (
            await signUpPage.formInputUsername
          ).getAttribute('aria-invalid') ===
            true ||
          (
            await signUpPage.formInputEmail
          ).getAttribute('aria-invalid') ===
            true ||
          (
            await signUpPage.formInputPassword
          ).getAttribute('aria-invalid') === true
        ),
      {
        timeout: 5000,
        timeoutMsg: 'form not validated',
        interval: 500,
      }
    ); // should I refactor this stream?
    console.log('waited for form input valiadtions to refresh state');
    // browser.pause(3000);
    // await 
    signUpPage.submitBtnSubmitSignup(); // executes before validation is complete?
    console.log('clicked signup submit btn');
    // new state loads - state 3 - after signup
    // await (
    //   await signUpPage.btnAfterSignup
    // ).waitForExist();
    // signUpPage.navigateToMainAfterSignup(); wonky!

    // await browser.pause(3000);
    console.log('ending User registers with his email');
  }
);

Then(
  /^User should be able to finish registration/,
  async () => {
    console.log('starting User should be able to finish registration');
    // change page and handle activation email
    const handles =
    await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    // emailServicePage.changeWindowToEmailServicePage();
    // click send code

    emailServicePage.useValidationEmail(); // takes loooong


    await browser.switchToWindow(handles[0]); // or 1?
    // await browser.closeWindow(handles[1]);
    // navigate back to main page
    // const handles =
    //   await browser.getWindowHandles();

    // await browser.pause(3000);
    console.log('ending User should be able to finish registration');
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
