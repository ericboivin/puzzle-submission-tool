var express = require('express');
var app = express();

var db = require('./db');

var AnswerController = require('./controllers/AnswerController');
app.use('/answer', AnswerController);

var AdminController = require('./controllers/AdminController');
app.use('/adminPuzzle', AdminController);
/*
var StickerController = require('./sticker/StickerController');
app.use('/sticker', StickerController);

var ReservationController = require('./reservation/ReservationController');
app.use('/reservation', ReservationController);

var StudentController = require('./student/StudentController');
app.use('/student', StudentController);
*/

module.exports = app;
