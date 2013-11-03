var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  firstname: {type : String},
  lastname: {type : String},
  nickname: {type : String},
  phonenumber: {type : Number},
  email: {type : String},
  team: {type : String},
  owner: {type: Schema.ObjectId, ref: 'User'}

});

 PlayerSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).exec(cb);
   }
 };

mongoose.model('Player', PlayerSchema);