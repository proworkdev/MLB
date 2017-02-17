module.exports = function(app, passport) {

    app.get('/admin', isLoggedIn, function(req, res) {
        res.render('dashboard', {
            layout: 'adminlayout',
            user : req.user,
            title: 'Dashboard'
        });
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
      res.render('dashboard', {
        layout: 'adminlayout',
        user : req.user,
        title: 'Dashboard'
    });
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        if(req.user.local.role == 'admin'){
         return next(); 
     }else{
        res.send('Un User');
    }
    
}else{
        // if they aren't redirect them to the home page
        res.redirect('/login');
    }

    
}


