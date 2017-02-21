var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var admin_routes = require('./routes/admin-routes');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(expressLayouts);
app.use(morgan('dev')); 
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); 

app.set('view engine', 'ejs'); // template engine
app.set('views', [__dirname + '/views/admin',__dirname + '/views',__dirname + '/views/admin/adminpages']); //admin
// required for passport
app.use(session({ secret: 'mlb' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(express.static('public'))

require('./routes/routes.js')(app, passport);  // Simple Routes
require('./routes/admin-routes.js')(app, passport); // Admin Routes


app.listen(port);
console.log('Site running on : ' + port);