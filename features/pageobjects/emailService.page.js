class EmailServicePage {
  get formEmailAdress() {
    return $('#fe_text');
  }
  get anchorRefresh() {
    return $('.fa.fa-refresh.fa-fw.fa-lg');
  }
  get anchorSender() {
    return $(
      '=TVN Online <kontakt@konto.tvn.pl>'
    );
  }
  get anchorSumbitSignup() {
    return $('=Przejdź do konta');
  }
  async openEmailServicePage() {
    await browser.newWindow(
      'https://10minutemail.net/',
      { windowName: '10minemail' }
    ); // does not work in mobile env
  }
  async getEmailAddress() {
    return await (await this.formEmailAdress).getValue();
  }
  async changeWindowToEmailServicePage() {
    await browser.switchWindow('https://10minutemail.net/');
  }
  async useValidationEmail () {
    await (await this.anchorSender).waitForExist({
      timeout: 1200000,
      reverse: false,
      timeoutMsg: '',
      interval: 10000,
    }); // looong loading times);
    await (await this.anchorSender).click();
    // await ((await this.anchorSender).isExisting() ? (await this.anchorSender).click() : (await this.anchorRefresh).click()); // BAD!
    await (await this.anchorSumbitSignup).waitForExist(); // causing errors?
    await (await this.anchorSumbitSignup).click();
  }
}

module.exports = new EmailServicePage();
