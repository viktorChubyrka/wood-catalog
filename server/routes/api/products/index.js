const express = require("express");

const productsController = require("../../../controller/productsController");

const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

var upload = multer({ storage: storage });

var type = upload.single("file");

router.post("/create", type, async function (req, res) {
  let path = "http://localhost:3000/" + req.file.filename;
  let newproduct = await productsController.createproduct(req.body,path);
  res.send(newproduct);
});

router.post("/update", type, async function (req, res) {
  let path = '';
  if(req.file){
    path = "http://localhost:3000/" + req.file.filename;
  }
  let updatetproduct = await productsController.updateproduct(req.body,path);
  res.send(updatetproduct);
});


router.post("/delete", async (req, res) => {
  let message = await productsController.deleteProduct(req.body.id);
  res.send(message)
});
router.get("/all_products", async (req, res) => {
  let products = await productsController.getAllproducts();
  res.send(products);
});
router.get("/product:id", async (req, res) => {
  console.log(req.params);
  let product = await productsController.getproduct(req.params);
  res.send(product);
});

module.exports = router;
