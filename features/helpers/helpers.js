class Helpers {
  async assertTitleLiteral(expectedTitle) {
    await (await $('<title>')).waitForExist(); // wonky?
    await expect(
      await browser.getTitle()
    ).to.be.eql(expectedTitle);
  }
  // stopped working on Sunday 1900 ...
  // randomTestName() {
  //   const randint = Math.floor(Math.random() * 1000) + 1;
  //   return (`myaccount${randint}`);
  // }
  randomTestName2(length = 9) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(
          Math.random() * charactersLength
        )
      );
    }
    return result;
  }

  async waitForPageToLoad() {
    await browser.waitUntil(() =>
      browser.execute(
        () => document.readyState === 'complete'
      )
    ),
      {
        timeout: 60 * 1000,
        timeoutMsg: 'page not ready after 60s',
      };
  }

  // async switchToWindow(number) {
  //   const pageHandles = await browser.getWindowHandles();
  //   await browser.switchToWindow(pageHandles[number]);
  // }
}

export default new Helpers();
