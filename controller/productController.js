let productModel = require("../model/productModel");

async function createProduct(req, res) {
  let modelData = await productModel.createPro(req.body).catch((err) => {
    return { error: err };
  });
  if (!modelData || (modelData && modelData.error)) {
    // console.log("modelData", modelData);
    let error =
      modelData && modelData.error ? modelData.error : "Internal Server";
    return res.send({ error });
  }
  // console.log("data", modelData.data);
  return res.send({ data: modelData.data });
}
async function updateProduct(req, res) {
  let modelDataUp = await productModel.update(req, res).catch((err) => {
    return { error: err };
  });
  if (!modelDataUp || (modelDataUp && modelDataUp.error)) {
    let error =
      modelDataUp && modelDataUp.error ? modelDataUp.error : "Internal Update";
    return res.send({ error });
  }
  return res.send({ data: modelDataUp.data });
}
async function readProduct(req, res) {
  // let reaData=await productModel.
}
module.exports = { createProduct, updateProduct };
