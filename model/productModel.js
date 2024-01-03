let { Product } = require("../schema/productSchema");
let joi = require("joi");

async function createPro(params) {
  let valid = await check(params).catch((err) => {
    return { error: err };
  });
  if (!valid || (valid && valid.error)) {
    return { error: valid.error };
  }
  let productData = {
    name: params.Name,
    price: params.Price,
    description: params.desc,
  };
  let data = await Product.create(productData).catch((err) => {
    // console.log("data", data1);
    return { error: err };
  });
  if (!data || (data && data.error)) {
    return { error: "Internal Server error" };
  }
  return { data: data };
}

async function check(data) {
  let schema = joi.object({
    Name: joi.string().min(4).max(20).required(),
    Price: joi.number().required(),
    desc: joi.string().min(6).max(30).required(),
  });
  let valid = await schema.validateAsync(data).catch((err) => {
    return { error: err };
  });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      console.log("valid.error.details");
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
}

// update product
async function checkUp(data) {
  let schema = joi.object({
    Name: joi.string().min(4).max(20).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "org"] } })
      .required(),
    phone: joi.number().required(),
    password: joi.string().min(8).max(14).required(),
  });
  let valid = await schema.validateAsync(data).catch((err) => {
    return { error: err };
  });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      console.log(i);
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
}
//
// app.get("/read", async (req, res) => {
//   let id = await User.findAll().catch((err) => {
//     return { error: err };
//   });
//   if (!id || (id && id.error)) {
//     return res.send({ error: id.error });
//   }
//   return res.send(id);
// });

function read(){
  
}
async function update(params) {
  let valid = await checkUp(params).catch((err) => {
    return { error: err };
  });
  if (!valid || (valid && valid.error)) {
    return { error: valid.error };
  }
  let updateData = {
    username: params.name,
    email_id: params.email,
    contact: params.phone,
    password: params.password,
  };
  (updateData = await Product.update(req.body)),
    {
      where: { id: req.params.id },
    };
  return res.send({ data: "data is required" });
}
async function read() {
  // let read=await che
}
module.exports = {
  createPro,
  update,
};
