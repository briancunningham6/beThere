var mongoose = require('mongoose')
  , async = require('async')
  , Purchase = mongoose.model('Purchase')
  , _ = require('underscore')


exports.show = function(req, res){
  res.jsonp(req.purchase);
}

exports.purchase = function(req, res, next, id){
  var Purchase = mongoose.model('Purchase')
  Purchase.load(id, function (err, purchase) {
    if (err) return next(err)
    if (!purchase) return next(new Error('Failed to load purchases ' + id))
    req.purchase = purchase
    next()
  })
}

exports.all = function(req, res){
 Purchase.find({ owner: req.user._id}).populate('owner').populate('event').exec(function(err, purchases) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(purchases);
   }
 });
}

exports.update = function(req, res){
  var purchase = req.purchase
  purchase = _.extend(purchase, req.body)
  purchase.save(function(err) {
    res.jsonp(purchase)
  })
}


exports.buy = function(req, res){
    //This is where the credit card transaction gets posted stripe
    var stripe = require('stripe')('sk_test_4GkQMF9ANIOi1uM3NAkay5pb');

    stripe.setApiKey("sk_test_4GkQMF9ANIOi1uM3NAkay5pb");

    // Get the credit card details submitted by the form
    var stripeToken = req.body.stripeToken;

    var charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "eur",
        card: stripeToken,
        description: "payinguser@example.com"
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            // The card has been declined
            res.jsonp('payment did not work')
        }
        else{
            res.jsonp('payment worked')
        }
    });

}

exports.confirm = function(req, res){
    //This is the webhook for stripe
    //Check if the purchase has been confirmed
    //If so create purchase

    response = req.body;
    purchase = new Purchase({
        'reason': 'Credit purchase',
        'transactionid': response.id,
        'amount': response.data.amount,
        'paid': response.data.paid,
        'response': response
    })
    purchase.save();
    res.jsonp('payment confirmed')
    //Create credit values.
}

exports.destroy = function(req, res){
  var purchase = req.purchase
  purchase.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    } else {
      res.jsonp(1);
    }
  })
}