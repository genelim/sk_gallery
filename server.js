var express        = require('express'),
    app            = express(),
    mongoose       = require('mongoose'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    port = process.env.PORT || 1001,
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
	session = require('express-session'),
    db = require('./config/db');
    
mongoose.connect(db.url); 

app.use(bodyParser.json()); 
app.use(session({secret: 'this is sk_gallery', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
require('./app/routes')(app, passport); 

app.use('/app', express.static(__dirname + '/public/app'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/libs', express.static(__dirname + '/public/libs'));
app.all('/*', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname });
}); 

app.listen(port);	
console.log('Magic happens on port ' + port);