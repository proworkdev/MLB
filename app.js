var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passport = require('passport');
var flash    = require('connect-flash');
var jwt         = require('jwt-simple');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cors = require('cors')
var expressLayouts = require('express-ejs-layouts');
var admin_routes = require('./routes/admin-routes');
var flarum = require('node-flarum');
var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to database

require('./config/passport')(passport); // pass passport for configuration
require('./config/passport-api')(passport);

// set up our express application
app.use(expressLayouts);
app.use(morgan('dev')); 
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser());
app.set('view engine', 'ejs'); // template engine
//app.set('views', [__dirname + '/views/admin',__dirname + '/views',__dirname + '/views/admin/adminpages',__dirname+'/dist']); //admin
// required for passport
app.use(session({ secret: configDB.secret})); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(express.static('public'))
app.use(express.static('dist/assets'))
app.use(cors())
require('./routes/routes.js')(app, passport);  // Simple Routes
require('./routes/admin-routes.js')(app, passport); // Admin Routes
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.get('/admin',function(req,res){

	res.sendFile(__dirname + '/dist/index.html');
});
app.get('/admin/*',function(req,res){

	res.sendFile(__dirname + '/dist/index.html');
});
// connect the api routes under /api/*
app.use('/api', require('./routes/api-routes.js'));

app.use('/forum', flarum) // This will execute flarum on the "/forum" path
app.use(flarum)           // This will execute flarum on the root path
app.listen(port);
console.log('Site running on : ' + port);