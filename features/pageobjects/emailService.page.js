class EmailServicePage {
  get textEmailAdress() {
    return $('#fe_text').getValue();
  }
  get anchorRefresh () {
    return $('.fa.fa-refresh.fa-fw.fa-lg')
  }
  get anchorSender() {
    return $('=TVN Online <kontakt@konto.tvn.pl>');
  }
  get anchorSumbitSignup () {
    return $('=Przejdź do konta');
  }
  async openEmailServicePage() {
    await browser.newWindow('https://10minutemail.net/', { windowName: '10minemail' }); // does not work in mobile env
  }
  
}

module.exports = new EmailServicePage();