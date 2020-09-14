const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   producturl: String,
   author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Product", productSchema);