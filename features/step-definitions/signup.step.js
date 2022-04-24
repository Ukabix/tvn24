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

Given(/^Given User has an email/, async () => {
  // open email service
  emailServicePage.openEmailServicePage();
  // assert elements are loaded 
  helpers.assertTitleLiteral('10-minutowy Mail');
  // get generated email adress
  const emailServiceAdress = await emailServicePage.textEmailAdress(); // should be string
  console.log(emailServiceAdress);
  // switch back to main tab
  const handles = await browser.getWindowHandles()
  await browser.switchToWindow(handles[1])
});

When(/^User navigates to the sign up page/, async () => {
    await $('.account-standard__toggle-button').moveTo();
    homePage.navigateToSignUp();
    // assert sign in page is loaded
    await helpers.assertTitleLiteral("Konto TVN"); // maybe more specific?
    // await browser.pause(3000);
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
