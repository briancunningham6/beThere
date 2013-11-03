
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')

//exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}

/**
 * Show login form
 */

exports.signin = function (req, res) {
  res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  })
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}

/**
 * Logout
 */

exports.signout = function (req, res) {
  req.logout()
  res.redirect('/')
}

/**
 * Session
 */

exports.session = function (req, res) {
  res.redirect('/')
}

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      return res.render('users/signup', { errors: err.errors, user: user })
    }
    req.logIn(user, function(err) {


    // This section sets up an intial player, team, credits and sends out a confirmation email when done.
    //Create an initial Team
    var Credit = mongoose.model('Credit');
    var credit = new Credit({
        'reason': 'Initial credits',
        'amount': 50,
        'owner': user._id
    });
    credit.save(function(){});

    //Create an initial Team
    var Player = mongoose.model('Player');
    var player = new Player({
        'firstname': user.firstname,
        'lastname': user.lastname,
        'phonenumber': user.phonenumber,
        'email': user.email,
        'owner': user._id
    });
    player.save(function(){
          //Create Player
          player.value = true;
          player.owner = player.owner._id;
          var playerArray = new Array(player);
          var Team = mongoose.model('Team');
          var team = new Team({
              'name': 'Default Team',
              'playerlist': JSON.stringify(playerArray),
              'owner': user._id
          });
          team.save(
             //onsole.log('Player and team has been created')
          );
      })
      //Send welcome mail
        var messages = [
            {
                "From": "brianc@kseudo.com",
                "To": user.email,
                "Subject": "Welcome to beThere",
                "TextBody": "Click on this link to activate <a href='http://localhost:3000/users/verifyemail?email="+user.email+"&code=verifyme'>link</a>"
            }
        ];
        //Postmark
        var postmark = require("postmark")("6b64620a-caf4-40cf-85d8-adb3d4b5c683");
//        postmark.batch(messages, function (error, success) {
//            if (error) {
//                console.log("Unable to send via postmark: " + error.message);
//                return;
//            }
//            console.info("Messages sent to postmark");
//        });

      return res.redirect('/')
    })
  })
}

/**
 *  Show profile
 */

exports.show = function(req, res){
    res.jsonp(req.user);
}

exports.me = function (req, res) {
  res.jsonp(req.user || null);
}

exports.verifyemail = function (req, res){
    //TODO: implement basic email verification
    //Get the emailaddress/code from the parms.
    userMail=req.query.email;
    userCode=req.query.code;
    console.log(userMail + " and " + userCode);
    User
        .findOne({ email : userMail })
        .exec(function (err, user) {
            if (err) return next(err)
            if (!user) return next(new Error('Failed to load User email' + userMail))
            if (user.emailverificationcode == userCode)
            {
                user.emailverified = true;
                user.save(console.log(userMail + ' ' + 'verified'));
            }
            return res.redirect('/')
        })
}

exports.verifyphone = function (req, res){
    //TODO: Not loading yet for some reason
    //Show screen with input box
    //Check if code matches value for user
    //update user so that the phone is verified
    //send user to profile page
    User
        .findOne({ _id : req.user._id })
        .exec(function (err, user) {
            if (err) return next(err)
            if (!user) return next(new Error('Failed to load User'))
            if (user.phoneverificationcode == req.code)
            {
                user.phoneverified = true;
                user.save(console.log(phonenumber + ' ' + 'verified'));
            }
            return res.redirect('/')
        })

}

//Update user profile
exports.update = function(req, res){
    var user = req.user
    var temp = mongoose.model('User', User);

    User.findOne({_id:user._id})
        .exec(function (err, user) {
            var credits = user.getCredits(function(result){
                user.credits = result;
                user.save();
            });

    });

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.emailname = req.body.emailname;
    user.phonenumber = req.body.phonenumber;
    user.username = req.body.username;

    //user = _.extend(user, req.body)

    user.save(function(err) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(1);
        }
    })
}
/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}