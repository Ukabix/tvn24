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
    await browser.switchWindow('https://10minutemail.net/'); // causing problems?
  }
  async useValidationEmail () {
  //   const div = await browser.waitUntil(async () => {
  //     const elems = await $$('div')
  //     if (elems.length !== 2) {
  //         return false
  //     }
  
  //     return elems[2]
  // }, {
  //     timeoutMsg: 'Never found enough div elements'
  // })
  // await div.click()

    await browser.waitUntil(async () => {
      const elems = await $$('tr')
      if (elems.length !== 6) {
          return false
      }},
      {
        timeout: 1200000,
        reverse: false,
        timeoutMsg: 'no emails, dammit',
        interval: 10000,
      });

    // await (await this.anchorSender).waitUntil(async () => {
    //   await (await this.anchorSender).isExisting()}, {
    //       timeout: 1200000,
    //       reverse: false,
    //       timeoutMsg: '',
    //       interval: 10000,
    //     }
    // ); // maybe loop ? WRONG!
    // await (await this.anchorSender).waitForExist({
    //   timeout: 1200000,
    //   reverse: false,
    //   timeoutMsg: '',
    //   interval: 10000,
    // }); // looong loading times);
    await (await this.anchorSender).click();
    // await ((await this.anchorSender).isExisting() ? (await this.anchorSender).click() : (await this.anchorRefresh).click()); // BAD!
    await (await this.anchorSumbitSignup).waitForExist(); // causing errors?
    await (await this.anchorSumbitSignup).click();
  }
}

export default new EmailServicePage();
