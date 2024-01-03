let express = require("express");
let routes = express.Router();
let user = require("./controller/userController");
let product = require("./controller/productController");
let Auth = require("./controller/authController");
let { auth } = require("./middleware/authMiddleware");
let { mail } = require("./helper/mailer");
let otpGenerator = require("otp-generator");

// USER CREATION
routes.post("/user", user.createUser);
routes.post("/product", product.createProduct);
routes.post("/authRegister", Auth.createAuthUser);
routes.post("/authLogin", Auth.loginAuthUser);
routes.get("/users", auth("user"), (req, res) => {
  return res.send(req.userData);
});
routes.get("/session", (req, res) => {
  console.log(req.session);
  // let view=req.session.view
  if (req.session.view) {
    req.session.view += 1;
  } else {
    req.session.view = 1;
  }
  return res.send({ view: req.session.view });
});
routes.get("/ejs", (req, res) => {
  let user = { name: "abc", contact: "996772972", email: "admin@gmail.com" };
  return res.render("test.ejs", user);
});

routes.get("/register", Auth.register_ui)
routes.post("/register", Auth.createAuthUser)
module.exports = {
  routes,
};

routes.get("/sendmail", async (req, res) => {
  let otp = otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false})
  let mailOption = {
    from: "rahulkumar058790@gmail.com",
    to: req.body.email,
    subject: "mail testing",
    text: `This is your otp ${otp}`
  }
  let sendMail = await mail(mailOption).catch((error) => {
    return { error }
  })
  if (!sendMail || (sendMail && sendMail.error)) {
    return { error: "Mail is not send" }
  }
  return res.send(`mail is send to ${req.body.email}`)
})