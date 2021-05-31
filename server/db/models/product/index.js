const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const productSchema = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  category: { type: String, default: "" },
  data:{type:Number}
});

module.exports = mongoose.model("Products", productSchema);
