
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
  get mailboxElement() {
    return $('#mailbox');
  }
  get tableRowsElements() {
    return $$('tr');
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
    // console.log('executing useValidationEmail');
    // await ((await this.anchorSender).isExisting() ? (await this.anchorSender).click() : (await this.anchorRefresh).click());

    // assert 10 min email page is open

    //// below is not executing - why???

    // await (await this.mailboxElement).scrollIntoView(); 
    // console.log('scrolled to mailbox');
    // console.log((await this.tableRowsElements).length); // why is ths not executing?
    await browser.waitUntil(
      async () => {
        (((await this.tableRowsElements).length) === 3);
      },
      {
        timeout: 1200000,
        reverse: false,
        timeoutMsg: 'no emails, dammit',
        interval: 10000,
      }
    );
    // console.log('waited for registration email and it arrived');
    ////////////////// something wrong below

    await (await this.anchorSender).waitForExist();
    // console.log('waited for anchor sender');
    // await browser.pause(3000);

    await (await this.anchorSender).click();
    // console.log('clicked anchorSender = tvn');
    // await browser.pause(3000);
    // await ((await this.anchorSender).isExisting() ? (await this.anchorSender).click() : (await this.anchorRefresh).click()); // BAD!
    await (await this.anchorSumbitSignup).waitForExist(); // causing errors?
    // console.log('waited for submit btn in email');
    await (await this.anchorSumbitSignup).click();
    // console.log('clicked submit btn in email');
    // await browser.pause(3000);
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

  }
}

export default new EmailServicePage();


