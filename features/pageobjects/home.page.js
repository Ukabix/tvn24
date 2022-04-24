class HomePage {
  // locators
  get btnSignIn() {
    return $(
      "button[class='account-content__button account-content__button--large']"
    );
  }
  get btnSignUp() {
    return $(
      "button[class='account-content__button account-content__button--link']"
    );
  }
  get btnHamburger() {
    return $('.hamburger__button');
  }
  get btnFacebook() {
    return $$('.header-socials__button')[0];
  }
  get btnTwitter() {
    return $$('.header-socials__button')[1];
  }
  get btnAcceptGDPR() {
    return $('#onetrust-accept-btn-handler');
  }
  get anchorHome() {
    return $(
      "a[title='przejdź na stronę TVN24']"
    );
  }
  get anchorEditProfile() {
    return $('a[href="https://panel.account.tvn.pl"]');
  }
  // frames
  get frameNotifications() {
    return $('.__ipPerunElement');
  }
  // methods
  async acceptGDPR() {
    await this.btnAcceptGDPR.click();
  }
  async navigateToSignIn() {
    await this.btnSignIn.click();
  }
  async navigateToSignUp() {
    await this.btnSignUp.click();
  }
  async navigateToHome() {
    await this.anchorHome.click();
  }
  async navigateToTwitter() {
    await this.btnTwitter.click();
  }
  async navigateToFacebook() {
    await this.btnFacebook.click();
  }
  async closeFrameNotifications() {
    await browser.switchToFrame(
      await this.frameNotifications
    );
    await $('.no-box').click();
    await browser.switchToFrame(null);
  }
  async navigateToEditProfile() {
    await this.anchorEditProfile.click();
  }
}

module.exports = new HomePage();
