var User = require('../models/user.js')
bcrypt = require('bcrypt-nodejs');

exports.get_user = function (req, res) {
    User.find(function(err, user) {
        if (err){
            res.json(err);
        }else{
            res.json({response:user})
        }
    });
};

exports.save_user = function (req, res) {
    var new_user = new User();
    new_user.username = req.body.username;
    new_user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    new_user.level = req.body.level
    
    new_user.save(function(err, result){
        if (err){
            res.json(err);
        }else{
            res.json({response : result})
        } 
    })
};

exports.update_user = function (req, res) {
    User.update({_id: req.body._id}, { $set: req.body}).exec(function(err,result){
        if(err){
            res.json({response:'Server Error'});
        }else{
            res.json({response:result});
        }
    })
};

exports.delete_user = function (req, res) {
    User.remove({_id: req.params.id}).exec(function(err,result){
        if(err){
            res.json({response:'Server Error'});
        }else{
            res.json({response:result});
        }
    })
};

exports.login = function (req, res) {
    User.findOne({username: req.body.username}).exec(function(err,user){
        if(err){
            res.json({response:'Server Error'});
        }else if(!user){
            res.json({response:'Invalid Username or Password'});
        }else{
            if(bcrypt.compareSync(req.body.username, user.password)){
                req.login(user, function(error){
                    if(error){
                        res.json({response:'Server Error'});
                    }else{
                        res.json({response:user})
                    }
                })
            }else{
                res.json({response:'Invalid Username or Password'});
            }
        }
    })
};

exports.authenticate = function(req, res){
    res.json(req.isAuthenticated() ? req.user : '0');
}

exports.logout = function(req, res){
    req.logOut();
    res.json({response: true})
}
