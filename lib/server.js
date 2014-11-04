'use strict';

var fs = require('fs');

var express = require('express');
var app = express();
var session = require('express-session');

var controllers = require('./controllers');

var secrets = JSON.parse(fs.readFileSync('./config/secrets.json', 'utf8'));

app.use(require('./logger')());

app.use(session({
  secret: secrets.sessionSecret,
  resave: true,
  saveUninitialized: true
}));

app.get('/preview', controllers.preview.get);

app.use(express.static(__dirname + '/../public'));

module.exports = app;
