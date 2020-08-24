const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   productURL: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Product", productSchema);