var mongoose = require('mongoose')
  , async = require('async')
  , Purchase = mongoose.model('Purchase')
  , Credit = mongoose.model('Credit')
  , User = mongoose.model('User')
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
            //Create purchase with the userid here!
            response = req.body;
            purchase = new Purchase({
                'reason': 'Credit purchase',
                'transactionid': charge.id,
                'amount': charge.amount,
                'status': 'pending',
                'response': charge,
                'owner':req.user._id
            })
            purchase.save(function(err){
                //Purchase initiated waiting for response from Stripe

                return res.redirect('/')
            })

        }
    });

}

exports.confirm = function(req, next){
    //This is the webhook for stripe
    //Check if the purchase has been confirmed
    //If so create purchase

    response = req.body;

    Purchase.findOne({'transactionid':response.data.object.id})
        .exec(function(err, next, purchase){
            if (err) return next(err)
            if (!purchase) return "hello stripe!"

            purchase.status = 'confirmed';
            purchase.save(function(err,purchase){
                //Create credit values.
                var credit = new Credit({
                    'reason': 'Credit purchase',
                    'amount': (purchase.amount / 5),
                    'owner': purchase.owner
                });
                //Recalculate users credits
                credit.save(function(err,credit){
                    User.findOne({_id:credit.owner})
                        .exec(function (err, user) {
                            var credits = user.getCredits(function(result){
                                user.credits = result;
                                user.save(function(err){
                                    return "Purchase complete"
                                });
                            });
                        });
                });
                return "fail"
            })
            return "fail"
        })
    return "fail"
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