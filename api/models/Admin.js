var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema  = new mongoose.Schema({
    nm: String,
    pd: String
});

mongoose.model('puzzleadmins', AdminSchema);
module.exports = mongoose.model('puzzleadmins');
