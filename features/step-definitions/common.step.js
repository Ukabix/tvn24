// cucumber imports
const {
  Given, When, Then
} = require ('@wdio/cucumber-framework');
const helpers = require('../helpers/helpers');
// POM imports
const commonPage = require('../pageobjects/common.page');
const homePage = require('../pageobjects/home.page');

// Given(/^User is on the main page$/, async () => {
//   commonPage.openHomePage();
//   // wait for GDPR notice to exist 
//   await (await homePage.btnAcceptGDPR).waitForExist();
//   // pass GDPR notice

//   // assert user is not logged - check if sign in btn is present
//   await expect(homePage.btnSignIn).toBePresent();
//   await expect(homePage.btnSignUp).toBePresent();

//   homePage.navigateToSignIn();
// });
Given(/^User is on the main page/, async () => {
  commonPage.openHomePage();
  // assert home page is loaded
  await helpers.assertTitleLiteral("Wiadomości z kraju i ze świata - najnowsze informacje w TVN24 - TVN24");
  /// handle GDPR notice
  await homePage.btnAcceptGDPR.waitForExist();
  await homePage.acceptGDPR();
  // handle notification frame
  await homePage.frameNotifications.waitForExist();
  homePage.closeFrameNotifications();
  // assert user is not logged - check if sign in btn is present
  await expect(homePage.btnSignIn).to.exist;
  await expect(homePage.btnSignUp).to.exist;
  await browser.pause(3000);
  //homePage.navigateToSignIn();
});

Given(/^User is not recognized with a cookie/, async () => {
  await browser.deleteCookies();
  await browser.pause(3000);
});

When(/^User navigates to the sign in page/, async () => {
  await $('.account-standard__toggle-button').moveTo();
  homePage.navigateToSignIn();
  // assert sign in page is loaded
  await helpers.assertTitleLiteral("Konto TVN");
  await browser.pause(3000);
});
