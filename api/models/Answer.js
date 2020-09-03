var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema  = new mongoose.Schema({
    key: String,
    name: String
});

mongoose.model('answers', AnswerSchema);
module.exports = mongoose.model('answers');
