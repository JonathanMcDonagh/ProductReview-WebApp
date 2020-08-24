const mongoose = require("mongoose"),
 	  Product  = require("./models/product"),
 	  Comment  = require("./models/comment");
 
const data = [
		{
			name: "Product 1", 
			image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/journeys/NTg4MTg2YTQt/NTg4MTg2YTQt-ZGI5NWU3ZmMt-w379._SY304_CB409095718_.jpg",
			description: "This is a really good product",
			producturl: "https://www.amazon.co.uk/"	
		},
		{
			name: "Product 2", 
			image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/journeys/ZjU0YzQ0Y2It/ZjU0YzQ0Y2It-NTAwNDA3Y2It-w372._SY232_CB428737032_.jpg",
			description: "This is a really good product",
			producturl: "https://www.amazon.co.uk/"	
		},
		{
			name: "Product 3", 
			image: "https://images-eu.ssl-images-amazon.com/images/G/02/kindle/merch/2020/campaign/91874378/uk-v3-gateway-dashboard-card-758x608._SY608_CB429036539_.jpg", 	
			description: "This is a really good product",
			producturl: "https://www.amazon.co.uk/"	
		}
];

 
function seedDB(){
   //Remove all products
   Product.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed products!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few products
            data.forEach(function(seed){
                Product.create(seed, function(err, product){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a product");
                        //create a comment forEach product
                        Comment.create(
                            {
                                text: "This is a really good review",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    product.comments.push(comment);
                                    product.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;