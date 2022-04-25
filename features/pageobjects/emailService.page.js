class EmailServicePage {
  get formEmailAdress() {
    return $('#fe_text');
  }
  get anchorRefresh() {
    return $('.fa.fa-refresh.fa-fw.fa-lg');
  }
  get anchorSender() {
    return $(
      '*=Rejestracja'
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
    return await (
      await this.formEmailAdress
    ).getValue();
  }
  async changeWindowToEmailServicePage() {
    await browser.switchWindow(
      'https://10minutemail.net/'
    ); // causing problems?
  }
  async useValidationEmail() {
    console.log('executing useValidationEmail');


    // assert 10 min email page is open

    await $('#mailbox').scrollIntoView();
    console.log('scrolled to mailbox');
    console.log((await $$('tr').length));
    await browser.waitUntil(
      async () => {
        ((await $$('tr').length) > 2); 
      },
      {
        timeout: 1200000,
        reverse: false,
        timeoutMsg: 'no emails, dammit',
        interval: 10000,
      }
    );
    console.log('waited for registration email and it arrived');
    ////////////////// something wrong below

    await (await this.anchorSender).waitForExist();
    console.log('waited for anchor sender');
    await browser.pause(3000);

    await (await this.anchorSender).click();
    console.log('clicked anchorSender = tvn');
    await browser.pause(3000);
    // await ((await this.anchorSender).isExisting() ? (await this.anchorSender).click() : (await this.anchorRefresh).click()); // BAD!
    await this.anchorSumbitSignup.waitForExist(); // causing errors?
    console.log('waited for submit btn in email');
    await this.anchorSumbitSignup.click();
    console.log('clicked submit btn in email');
    await browser.pause(3000);
  }
}

export default new EmailServicePage();

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

    // await browser.waitUntil(
    //   async () => {
    //     const elems = await $$('tr');
    //     if (elems.length !== 6) {
    //       return false;
    //     }
    //   },
    //   {
    //     timeout: 1200000,
    //     reverse: false,
    //     timeoutMsg: 'no emails, dammit',
    //     interval: 10000,
    //   }
    // );
