var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Teams = require('../models/teams');
var Players = require('../models/players');
var Pages = require('../models/pages');
var jwt         = require('jwt-simple');
var config = require('../config/database.js');
var passport = require('passport');

router.post('/signup', function(req, res) {

 User.findOne({
  'local.email': req.body.email
}, function(err, user) {
  if (err) throw err;

  if (user) {
    res.send({success: false, msg: 'Email Already Exist'});
  } else {
   var newUser            = new User();
   newUser.local.email    = req.body.email;
   newUser.local.password = req.body.password;
   newUser.local.first_name = req.body.first_name;
   newUser.local.last_name = req.body.last_name;
   newUser.local.role = 'user';
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

});

router.post('/authenticate', function(req, res) {
  User.findOne({
    'local.email': req.body.email,
    'local.role': 'admin'
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          req.session.token = token;
          req.session.user = user;
          // return the information including token as JSON
          res.json({success: true, token: 'JWT '+token,user:user});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        res.json({success: true, msg: 'Welcome in the member area ' + user.local.email + '!'});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.get('/mlbTeams', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        Teams.find({}, function (err, users) {
          res.send(users);
        });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.get('/mlbPlayers', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {

        Teams.find({}, function (err, players) {
          res.send(players);
        });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.get('/getMembers', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        User.find({'local.role': {'$ne':'admin' }},function (err, users) {
          res.send(users);
        });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.post('/deleteMember', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var checkUser = checkAuthenticate(token);
    if(checkUser){
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    }else{

      User.findByIdAndRemove(req.body.id, function (err, user) {  
        var response = {
          success : true,
          message: "Todo successfully deleted",
          id: user._id
        };
        res.send(response);
      });
    }
    
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.post('/editMember', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if(token){
    var checkUser = checkAuthenticate(token);
    if(checkUser){
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    }else{
      User.findById(req.body.id, function (err, user) {  
        if (err) {
          res.status(500).send(err);
        } else 
        user.local.first_name = req.body.first_name 
        user.local.last_name = req.body.last_name
        user.local.email = req.body.email
        user.save(function (err, user) {
          if (err) {
            res.status(500).send(err)
          }
          res.send(user);
        });
      });
    }
  }else{
   return res.status(403).send({success: false, msg: 'No token provided.'});
 }
});


router.post('/addPage', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if(token){
    var checkUser = checkAuthenticate(token);
    if(checkUser){
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    }else{
      if(req.body.id){
       Pages.findById(req.body.id, function (err, page) {  
        if (err) {
          res.status(500).send(err);
        } else 
        page.title = req.body.title 
        page.slug = req.body.slug
        page.content = req.body.content
        page.save(function (err, page) {
          if (err) {
            res.status(500).send(err)
          }
          res.send(page);
        });
      });
     }else{
      var page = new Pages();
      page.title = req.body.title
      page.slug = req.body.slug
      page.content = req.body.content
      page.save(function (err, page) {
        if (err) {
          res.status(500).send(err)
        }
        res.send(page);
      });
    }


  }
}else{
 return res.status(403).send({success: false, msg: 'No token provided.'});
}
});

router.get('/getPages', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if(token){
    var checkUser = checkAuthenticate(token);
    if(checkUser){
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    }else{
      Pages.find({},function (err, pages) {
        res.send(pages);
      });

    }
  }else{
   return res.status(403).send({success: false, msg: 'No token provided.'});
 }
});

router.get('/getPage/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if(token){
    var checkUser = checkAuthenticate(token);
    if(checkUser){
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    }else{
     Pages.findOne({
      '_id': req.params.id
    }, function(err, page) {
      if (err) throw err;

      if (page) {
        res.send(page);
      } else {
       res.send({msg:'No Page found'})
     }
   });

   }
 }else{
   return res.status(403).send({success: false, msg: 'No token provided.'});
 }
});


router.post('/deletePage', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var checkUser = checkAuthenticate(token);
    if(checkUser){
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    }else{
      res.send(req.body.id);
      Pages.findByIdAndRemove(req.body.id, function (err, page) {  
        var response = {
          success : true,
          message: "Page successfully deleted",
          id: page._id
        };
        res.send(response);
      });
    }
    
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});



getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

checkAuthenticate = function(token){
  var decoded = jwt.decode(token, config.secret);
  User.findOne({
    name: decoded.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      return false;
    } else {
     return true;

   }
 });
}

module.exports = router;