require("dotenv").config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose')
const cors = require('cors')

var photosRouter = require('./routes/photos');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors())

// يوجد أثنين من المسارات
app.use('/api/photos', photosRouter);
app.use('/api/auth', usersRouter);

// عمليه الاتصال بقاعده البيانات
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = app;
