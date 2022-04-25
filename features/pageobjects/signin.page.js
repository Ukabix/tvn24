class SignInPage {
  // locators
  // state 1
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

  // state 2
  // locators
  get formInputUsername() {
    return $("input[name='login']");
  }
  get formInputPassword() {
    return $("input[name='password']");
  }
  get btnSubmitSignin() {
    return $('#sign_in');
  }
  // methods
  async submitSignin() {
    (await this.btnSubmitSignin).click();
  }
}

export default new SignInPage();
