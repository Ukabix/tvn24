// cucumber imports
import {
  Given, When, Then
} from '@wdio/cucumber-framework';
// helpers
import helpers from '../helpers/helpers';
// POM imports
import homePage from '../pageobjects/home.page';
import commonPage from '../pageobjects/common.page';

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

Given(/^User is not recognized with a cookie/, async () => {
  await browser.deleteCookies();
});

Given(/^User is on the main page/, async () => {
  commonPage.openHomePage();
  console.log('opened home page');
  // assert home page is loaded
  helpers.assertTitleLiteral("Wiadomości z kraju i ze świata - najnowsze informacje w TVN24 - TVN24");
  console.log('asserted title literal');
  /// handle GDPR notice
  await homePage.btnAcceptGDPR.waitForExist();
  console.log('waited for gdpr button');
  homePage.acceptGDPR();
  console.log('accepted gdpr');
  // handle notification frame
  await homePage.frameNotifications.waitForExist();
  console.log('waited for frame notifications');
  homePage.closeFrameNotifications();
  console.log('closed frame notifications');
  // assert user is not logged - check if sign in btn is present
  await expect(homePage.btnSignIn).to.exist;
  console.log('asserted btn sign in exists');
  await expect(homePage.btnSignUp).to.exist;
  console.log('asserted btn sign up exists');
  // await browser.pause(3000);
  //homePage.navigateToSignIn();
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




