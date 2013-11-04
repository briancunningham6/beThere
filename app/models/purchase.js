var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var PurchaseSchema = new Schema({
	reason: {type: String},
    amount: {type: Number},
    paid: {type: Boolean},
    transactionid: {type: String},
    status:{type: String},
    response: {type: String},
    owner: {type: Schema.ObjectId, ref: 'User'},
    created: { type : Date, default: Date.now },
    modified: { type : Date }
});


mongoose.model('Purchase', PurchaseSchema);