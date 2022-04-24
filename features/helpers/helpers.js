class Helpers {
  async assertTitleLiteral(expectedTitle) {
    await (await $('<title>')).waitForExist();
    await expect(
      await browser.getTitle()
    ).to.be.eql(expectedTitle);
  }
  randomTestName() {
    const randint = Math.floor(Math.random() * 1000) + 1;
    return (`dummyaccount${randint}`);
  }
  // async switchToWindow(number) {
  //   const pageHandles = await browser.getWindowHandles();
  //   await browser.switchToWindow(pageHandles[number]);
  // }
}

module.exports = new Helpers();
