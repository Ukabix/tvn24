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
  // await browser.pause(3000);
  //homePage.navigateToSignIn();
});

Given(/^User is not recognized with a cookie/, async () => {
  await browser.deleteCookies();
  // await browser.pause(3000);
});

Then(
  /^User should be able to view secure page and edit his profile/,
  async () => {
    await $(
      '.account-standard__toggle-button'
    ).waitForExist({
      timeout: 200000,
      reverse: false,
      timeoutMsg: '',
      interval: 5000,
    }); // wonky loading times
    await $(
      '.account-standard__toggle-button'
    ).moveTo();
    await browser.pause(3000);
    homePage.navigateToEditProfile();
    // await browser.pause(10000);
    // assert new tab has opened for profile edit
    // helpers.switchToWindow(1);
    // now on edit profile page
    // const pageHandles =
    //   await browser.getWindowHandles(); // returns array - 2 windows
    // // switch page - pass window handle == tabs
    // await browser.switchWindow(pageHandles[1]);
    await expect($("input[name='code']")).to
      .exist; // change this to h1!!!
    browser.pause(3000);
  }
);




