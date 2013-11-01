var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    , config = require('../../config/config')[env]
    , Schema = mongoose.Schema;

var MessageSchema = new Schema({
    response: String,
    player: {type: Schema.ObjectId, ref: 'Player'},
    event: {type: Schema.ObjectId, ref: 'Event'},
    eventinstance: {type: Schema.ObjectId, ref: 'Eventinstance'},
    type: String,
    confirmed: {type:Boolean, default:false},
    owner: {type: Schema.ObjectId, ref: 'User'}
});

mongoose.model('Message',MessageSchema);