class SignInPage {
  // locators
  get btnSigninEmail() {
    return $('#login_by_email');
  }
  get btnSigninFacebook() {
    return $('#login_by_fb');
  }
  get btnSigninGoogle() {
    return $('#login_by_g');
  }
  get btnSigninTwitter() {
    return $('#login_by_tw');
  }
  get btnSigninApple() {
    return $('#login_by_apple');
  }
  get anchorSignup() {
    return $('#register');
  }
  get formUsername() {
    return $("input[name='login']");
  }
  get formPasword() {
    return $("input[name='password']");
  }
  get btnSubmitSignin() {
    return $('#sign_in');
  }
  // methods
  async navigateSigninEmail() {
    (await this.btnSigninEmail).click();
  }
  async navigateSigninFacebook() {
    (await this.btnSigninFacebook).click();
  }
  async navigateSigninGoogle() {
    (await this.btnSigninGoogle).click();
  }
  async navigateSigninTwitter() {
    (await this.btnSigninTwitter).click();
  }
  async navigateSigninApple() {
    (await this.btnSigninApple).click();
  }
  async navigateSignup() {
    (await this.anchorSignup).click();
  }
  async submitSignin() {
    (await this.btnSubmitSignin).click();
  }
}

module.exports = new SignInPage();
