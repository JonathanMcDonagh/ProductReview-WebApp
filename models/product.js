const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   producturl: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Product", productSchema);