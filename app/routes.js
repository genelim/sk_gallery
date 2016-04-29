var user        = require('./controllers/user'),
    category    = require('./controllers/category'),
    upload      = require('./controllers/upload'),
    product     = require('./controllers/product');

module.exports = function(app, passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
    //users
    app.get('/api/user', user.get_user);
    app.post('/api/user', user.save_user);
    app.put('/api/user', user.update_user);
    app.delete('/api/user/:id', user.delete_user);
    app.post('/api/login', user.login);
    app.post('/api/authenticate', user.authenticate);
    app.post('/api/logout', user.logout);
    
    //product__main_category
    app.post('/api/main_category', category.insert_main_category);
    app.get('/api/main_category', category.get_category);
    app.put('/api/main_category', category.update_main_category);
    app.delete('/api/main_category/:id', category.delete_main_category);

    //product__sub_category
    app.post('/api/sub_category', category.insert_sub_category);
    app.put('/api/sub_category', category.update_sub_category);
    
    //product
    app.post('/api/product', product.add_product);
    app.get('/api/product', product.get_product);

    //image upload
    app.post('/api/upload_image', upload.upload_image);    
};

