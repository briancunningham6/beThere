var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var CreditSchema = new Schema({
	reason: {type: String},
    amount: {type: Number},
    owner: {type: Schema.ObjectId, ref: 'User'},
    created: { type : Date, default: Date.now }
});


mongoose.model('Credit', CreditSchema);