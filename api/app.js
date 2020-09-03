var express = require('express');
var app = express();

var db = require('./db');

var AnswerController = require('./controllers/AnswerController');
app.use('/answer', AnswerController);

var AdminController = require('./controllers/AdminController');
app.use('/adminPuzzle', AdminController);

module.exports = app;
