var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var bcrypt = require('bcrypt');
// define the schema for our user model
var userSchema = mongoose.Schema({

	local            : {
		first_name   : String,
		last_name	 : String,
		email        : String,
		password     : String,
		role     	 : String,
	}
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

userSchema.pre('save', function (next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.local.password, salt, function (err, hash) {
				if (err) {
					return next(err);
				}
				user.local.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (passw, cb) {
	bcrypt.compare(passw, this.local.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);