class SignUpPage {
  // state 1 - method selection
  // locators
  get btnRegisterEmail() {
    return $('#register_by_email');
  }
  get btnRegisterFacebook() {
    return $('#register_by_fb');
  }
  get btnRegisterGoogle() {
    return $('#register_by_g');
  }
  get btnRegisterTwitter() {
    return $('#register_by_tw');
  }
  get btnRegisterApple() {
    return $('#register_by_apple');
  }
  get anchorSignin() {
    return $('#login');
  }
  // methods
  async navigateRegisterEmail() {
    (await this.btnRegisterEmail).click();
  }
  async navigateRegisterFacebook() {
    (await this.btnRegisterFacebook).click();
  }
  async navigateRegisterGoogle() {
    (await this.btnRegisterGoogle).click();
  }
  async navigateRegisterTwitter() {
    (await this.btnRegisterTwitter).click();
  }
  async navigateRegisterApple() {
    (await this.btnRegisterApple).click();
  }
  async navigateSignin() {
    (await this.anchorSignin).click();
  }
  // state 2 - register via email form
  get formInputUsername() {
    return $("input[name='firstName']");
  }
  get formInputEmail() {
    return $("input[name='login']");
  }
  get formInputPassword() {
    return $("input[name='password']");
  }
  get formChboxTos () {
    return $('#register-switch-group-item-1-0');
  }
  get formChboxAdvert () {
    return $('#register-switch-group-item-2-0');
  }
  get btnSubmitSignup() {
    return $('#create_account');
  }
  // methods
  async setFormInputUsername (username) {
    await (await this.formInputUsername).setValue(username);
  }
  async setFormInputEmail (email) {
    await (await this.formInputEmail).setValue(email);
  }
  async setFormInputPassword (password) {
    await (await this.formInputPassword).setValue(password);
  }
  async changeFormChboxTos () {
    await (await this.formChboxTos).click();
  }
  async changeFormChboxAdvert() {
    await (await this.formChboxAdvert).click();
  }
  async submitBtnSubmitSignup () {
    await (await this.btnSubmitSignup).click();
  }


  //state 3 - after signup
  // locators
  get btnAfterSignup () {
    return $('#next-step');
  }
  // methods
  async navigateToMainAfterSignup() {
    await (await this.btnAfterSignup).click();
  }
}

module.exports = new SignUpPage();
