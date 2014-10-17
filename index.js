'use strict';

var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');

var express = require('express');

var app = express();

var logger = require('./lib/logger');

app.use(logger());

app.get('/preview', function(req, res) {
  createPreview(req.query.url, function(err, fileName) {
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        error: 'Phantom error'
      });
    }

    res.json({
      path: path.relative('./public', fileName)
    });

    console.log('+INF:', 'file', fileName, ' sent');
  });
});

function createPreview(url, cb) {
  var fileName = tempFile();

  var cbCalled = false;

  var imgProcess = childProcess.spawn(
    'phantomjs',
    ['rasterize.js', url, fileName, '800px*600px']
  );

  imgProcess.stdout.on('close', function() {
    if (!cbCalled) {
      cbCalled = true;
      cb(null, fileName);
    }
  });

  imgProcess.stdout.setEncoding('utf8');
  imgProcess.stderr.setEncoding('utf8');

  imgProcess.on('error', onPhantomError);
  imgProcess.stdout.on('data', onPhantomData);
  imgProcess.stderr.on('data', onPhantomData);

  function onPhantomError(err) {
    console.log('Phantom error:', err.stack);

    if (!cbCalled) {
      cbCalled = true;
      cb(err);
    }
  }
}

app.use(express.static('public'));

app.listen(process.NODE_ENV || 3000, function() {
  console.log('+INF:', 'Listening on', process.NODE_ENV || 3000);
});

function onPhantomData(data) {
  console.log('+ Phantom: ', data);
}

function tempFile() {
  return './public/images/' + 'image_' +
    Math.floor(Math.random() * 10000) + '.png';
}
