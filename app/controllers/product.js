var Category    = require('../models/category.js'),
    Product     = require('../models/product.js');

exports.add_product = function (req, res) {
	var new_product = new Product();
    
	new_product.name = req.body.name;
	new_product.color = req.body.color;
	new_product.size = req.body.size;
	new_product.image = req.body.image;
	new_product.sub_category = req.body.sub_category;
	new_product.main_category = req.body.main_category._id;
	new_product.user = req.body.user._id;
	
	new_product.save(function(err, category) {
		if(err){
			res.json({response:'Server Error'})
		}else{
			Product.find().exec(function(err, product){
				res.json({response:product});
			})
		}
    });
};

exports.get_product = function (req, res) {
    Product.find().exec(function(err, product){
		res.json({response:product});
	})
};

exports.update_product = function (req, res) {
    Product.findOneAndUpdate({_id : req.body._id},{$set: req.body},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            Product.find().exec(function(err, product){
                res.json({response:product});
            })
        }
    });
};

exports.delete_product = function (req, res) {    
    Product.remove({_id : req.params.id},function(err){
        if(err){
            console.log(err);
        }else{
            Product.find().exec(function(err, product){
                res.json({response:product});
            })
        }
    });
};
