class Helpers {
  async assertTitleLiteral(expectedTitle) {
    await (await $('<title>')).waitForExist();
    await expect(
      await browser.getTitle()
    ).to.be.eql(expectedTitle);
  }
}

module.exports = new Helpers();
