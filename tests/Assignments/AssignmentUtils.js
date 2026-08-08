class AssignmentUtils {
  constructor(page, apiContext, loginPayload) {
    this.page = page;
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const response = await this.apiContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
      {
        data: this.loginPayload,
      },
    );
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
  }

  async loginAndGoToEvents() {
    const token = await this.getToken();
    await this.page.addInitScript((value) => {
      window.localStorage.setItem("eventhub_token", value);
    }, token);

    await this.page.goto("https://eventhub.rahulshettyacademy.com/");
  }
}
module.exports = { AssignmentUtils };
