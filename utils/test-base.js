const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    userEmail: "test123333@test.com",
    userPassword: "Password$12",
    productName: "iphone 13 pro",
    cvvCode: "123",
    nameOnCard: "John Doe",
    applyCoupon: "rahulshettyacademy",
  },
});
