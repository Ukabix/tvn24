class Helpers {
  async assertTitleLiteral(expectedTitle) {
    await (await $('<title>')).waitForExist();
    await expect(
      await browser.getTitle()
    ).to.be.eql(expectedTitle);
  }
  // async switchToWindow(number) {
  //   const pageHandles = await browser.getWindowHandles();
  //   await browser.switchToWindow(pageHandles[number]);
  // }
}

module.exports = new Helpers();
