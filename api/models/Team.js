var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema  = new mongoose.Schema({
    name: String,
    key: String,
    completedQuestions: [{ type: String , unique: true }]
});

mongoose.model('teams', TeamSchema);
module.exports = mongoose.model('teams');
