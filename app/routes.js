var user = require('./controllers/user');
var category = require('./controllers/category');

module.exports = function(app) {
    app.get('/api/user', user.get_user);
    app.post('/api/user', user.save_user);
    app.put('/api/user', user.update_user);
    app.delete('/api/user/:id', user.delete_user);
    
    //product__main_category
    app.post('/api/main_category', category.insert_main_category);
    app.get('/api/main_category', category.get_category);
    app.put('/api/main_category', category.update_main_category);
    app.delete('/api/main_category/:id', category.delete_main_category);

    //product__sub_category
    app.post('/api/sub_category', category.insert_sub_category);
    app.put('/api/sub_category', category.update_sub_category);
};

