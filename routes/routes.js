var User = require('../models/user');
var jwt         = require('jwt-simple');
var config = require('../config/database.js');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


	app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', function(req, res, next) {

       User.findOne({
        'local.email': req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.render('login.ejs',{message:'User Not Found'});
        } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          req.session.token = token;
          req.session.user = user;
          res.redirect(['/dashboard']);
      } else {
        res.render('login.ejs',{message:'Password not Match'});
    }
});
  }
});

   });


	/*app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

    app.get('/register', function(req, res) {
        if (!req.body.name || !req.body.password) {
            res.json({success: false, msg: 'Please pass name and password.'});
        } else {
            var newUser = new User({
              name: req.body.name,
              password: req.body.password
          });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
    }
    res.json({success: true, msg: 'Successful created new user.'});
});
}
});
};