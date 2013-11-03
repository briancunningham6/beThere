
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore')

//TODO: create another schema for views... this exposes the salted password and is totally unsecure
var schemaOptions = {
    toObject: {
        virtuals: true
    }
    ,toJSON: {
        virtuals: true
    }
};

/**
 * User Schema
 */

var UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  provider: String,
  phonenumber: Number,
  country: String,
  emailverificationcode: {type:String, default:'verifyme'},
  phoneverificationcode: {type:Number, default:4321 },
  emailverified: {type:Boolean, default:false},
  phoneverified: {type:Boolean,default:false},
  hashed_password: String,
  credits: {type:Number, default:0},
  salt: String,
//  _credits: Number
}, schemaOptions)



/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length
}

// these validations only apply if you are signing up locally - BC

UserSchema.path('firstname').validate(function (firstname) {
  return firstname.length
}, 'Name cannot be blank')

UserSchema.path('lastname').validate(function (lastname) {
    return lastname.length
}, 'Name cannot be blank')

UserSchema.path('email').validate(function (email) {
  return email.length
}, 'Email cannot be blank')

UserSchema.path('username').validate(function (username) {
  return username.length
}, 'Username cannot be blank')

UserSchema.path('hashed_password').validate(function (hashed_password) {
  return hashed_password.length
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.password))
    next(new Error('Invalid password'))
  else
    next()
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function(password) {
    if (!password) return ''
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
  },


  getCredits: function(credits) {
      //Load Credits model
      var Credit = mongoose.model('Credit');
      Credit.aggregate([
          { $group: {
              _id: '$owner',
              currentCredits: { $sum: '$amount'}
          }}
      ], function (err, results) {
              credits(results[0].currentCredits)
          }
      );
  }

}
mongoose.model('User', UserSchema)
