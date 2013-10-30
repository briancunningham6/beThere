var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    , config = require('../../config/config')[env]
    , Schema = mongoose.Schema;

var JobSchema = new Schema({
    job: String,
    dueDate: Date,
    completed: Boolean
});

JobSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id }).populate('commissioner').exec(cb);
    }
};

mongoose.model('Job',JobSchema);