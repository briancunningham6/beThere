var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var EventinstanceSchema = new Schema({
    startdate: { type : Date, default: Date.now },
    currentattend:{type: Number, default:0},
    event:  {type: Schema.ObjectId, ref: 'Event'},
    owner: {type: Schema.ObjectId, ref: 'User'},
    messages: {type: Schema.Types.ObjectId, ref: 'Message'}
}, { collection: 'eventinstances'});
mongoose.model('Eventinstance', EventinstanceSchema);