const { render } = require("ejs");
let authModel = require("../model/authModel");

async function createAuthUser(req, res) {
  console.log(req.body);
  let modelData = await authModel.register(req.body).catch((err) => {
    return { error: err };
  });

  console.log(modelData);
  if (!modelData || (modelData && modelData.error)) {
    let error =
      modelData && modelData.error ? modelData.error : "Internal Server 2";
    return res.send({ error });
  }
  return res.send({ data: modelData.data });
}

async function loginAuthUser(req, res) {
  let loginData = await authModel.login(req.body).catch((error) => {
    return { error };
  });
  if (!loginData || (loginData && loginData.error)) {
    // console.log(loginData);
    let error =
      loginData && loginData.error
        ? loginData.error
        : "Internal Server Login Error";
    return res.send({ error: error });
  }

  // return res.header({ token: loginData.data }).send({ data: loginData.data });
  return res.send({ data: loginData.data, token: loginData.token });
  // return res.send({ data: loginData.data });
}

function register_ui(req,res) {
  return res.render("register.ejs", {});
}
module.exports = {
  createAuthUser,
  loginAuthUser,
  register_ui
};
