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
import emailServicePage from '../pageobjects/emailService.page';

Given(/^User selects the top article/, async () => {
  homePage.navigateToTopStory();
  browser.pause(3000);
});