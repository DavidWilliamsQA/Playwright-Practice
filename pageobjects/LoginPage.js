class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator("#login");
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
  }

  async validLogin(username, password) {
    await this.userEmail.fill(username);
    await this.userPassword.fill(password);
    await this.signInButton.click();
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }
}

module.exports = { LoginPage };
