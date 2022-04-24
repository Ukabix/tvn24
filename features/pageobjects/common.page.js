
class CommonPage {
  async openHomePage() {
    await browser.url('https://tvn24.pl/');
    console.log('navigated to home url');
  }
  async verifyPageTitle() {
    await browser.getTitle();
    // assert the page title as valid
    
  }
  async changeWindowHelper(url) {
    await browser.switchWindow(url);
  }
}

module.exports = new CommonPage();