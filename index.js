'use strict';

var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');

var express = require('express');

var app = express();
var appCache = new Cache();

function logGetRequest (req, res, next) {
  if (req.method === 'GET') {
    console.log('+INF: GET %s', req.url);
  }

  next();
}

app.use(logGetRequest);

app.get('/preview', function(req, res) {
  var fileName = appCache.get(req.query.url);

  if (fileName) {
    // found in cache
    return serveFile(fileName);
  }

  createPreview(req.query.url, function(err, fileName) {
    if (err) {
      console.log(err.stack);
      return res.status(500).json({
        error: 'Phantom error'
      });
    }

    serveFile(fileName);

  });

  function serveFile(filePathToSend) {
    res.json({
      path: path.relative('./public', filePathToSend)
    });

    console.log('+INF:', 'file', filePathToSend, ' sent');
  }
});

function createPreview(url, cb) {
  var fileName = tempFile();

  var cbCalled = false;

  var imgProcess = childProcess.spawn(
    'phantomjs',
    ['rasterize.js', url, fileName, '800px*600px']
  );

  imgProcess.stdout.on('close', function() {
    appCache.push(url, fileName);

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

function Cache() {
  var collection = [];

  function PreviewItem(url, fileName) {
    this.url = url;
    this.fileName = fileName;
    this.createdAt = Date.now();
  }

  this.push = function(url, fileName) {
    collection.push(new PreviewItem(url, fileName));
  };

  this.get = function(url) {
    for (var i = 0, l = collection.length; i < l; i++) {
      if (collection[i].url === url) {
        return collection[i].fileName;
      }
    }
  };
}
