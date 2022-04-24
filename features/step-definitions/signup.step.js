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
  fs.writeFileSync('features/test-data/account.txt', emailServiceAdress);
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
    ).moveTo();
    await (await homePage.btnSignUp).waitForExist();
    homePage.navigateToSignUp();
    // assert sign in page is loaded
    await helpers.assertTitleLiteral('Konto TVN'); // maybe more specific?
    // await browser.pause(3000);
  }
);

When(/^User registers with his email/, async () => {
  // state 1 - method selection
  await (await signupPage.btnRegisterEmail).waitForExist();
  signupPage.navigateRegisterEmail();
  // new state loads - state 2 - email registration form
  await (await (signupPage.btnSubmitSignup)).waitForExist();
  const randomTestName = helpers.randomTestName();
  signupPage.setFormInputUsername(randomTestName);
  const emailServiceAdress = fs.readFileSync('features/test-data/account.txt', 'utf8');
  signupPage.setFormInputEmail(emailServiceAdress);
  signupPage.setFormInputPassword(credentials[1].password);
  signupPage.changeFormChboxTos();
  await browser.pause(5000);
});

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
