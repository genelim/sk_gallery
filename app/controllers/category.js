
var Category = require('../models/category.js');

exports.get_category = function (req, res) {
	Category.find().exec(function(err, category){
		res.json({response:category});
	})
};

exports.insert_main_category = function (req, res) {
	var new_category = new Category();
	new_category.main_category = req.body.name;
	
	new_category.save(function(err, category) {
		if(err){
			res.json({response:'Server Error'})
		}else{
			Category.find().exec(function(err, category){
				res.json({response:category});
			})
		}
    });
};


exports.insert_sub_category = function (req, res) {    
    Category.findOneAndUpdate({_id : req.body._id},{$set: {sub_category : req.body.sub_category}},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            Category.find().exec(function(err, category){
                res.json({response:category});
            })
        }
    });
};


exports.update_main_category = function (req, res) {    
    Category.findOneAndUpdate({_id : req.body._id},{$set: {main_category : req.body.main_category}},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            Category.find().exec(function(err, category){
                res.json({response:category});
            })
        }
    });
};

exports.update_sub_category = function (req, res) {    
    console.log(req.body)
    Category.findOneAndUpdate({_id : req.body._id},{$set: {sub_category : req.body.sub_category}},{upsert:true},function(err){
        if(err){
            console.log(err);
        }else{
            Category.find().exec(function(err, category){
                res.json({response:category});
            })
        }
    });
};
