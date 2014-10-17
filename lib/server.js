'use strict';

var express = require('express');
var app = express();

var controllers = require('./controllers');

app.use(require('./logger')());

app.get('/preview', controllers.preview.get);

app.use(express.static(__dirname + '/../public'));

module.exports = app;
