'use strict';

var childProcess = require('child_process');
var fs = require('fs');

var express = require('express');

var app = express();
var appCache = new Cache();

app.get('/preview', function(req, res) {
  var sent = false;

  var fileName = appCache.get(req.query.url);

  if (fileName) {
    // found in cache
    return serveFile(fileName);
  }

  fileName = tempFile();

  var imgProcess = childProcess.spawn(
    'phantomjs',
    ['rasterize.js', req.query.url, fileName, '800px*600px']
  );

  imgProcess.stdout.on('close', function() {
    if (!sent) {
      appCache.push(req.query.url, fileName);
      serveFile(fileName);
    }
  });

  imgProcess.stdout.setEncoding('utf8');
  imgProcess.stderr.setEncoding('utf8');

  imgProcess.on('error', onPhantomError);
  imgProcess.stdout.on('data', onPhantomData);
  imgProcess.stderr.on('data', onPhantomData);

  function onPhantomError(err) {
    console.log('Phantom error:', err.stack);
    res.status(500).send('Error while running Phantom');
    sent = true;
  }

  function serveFile(filePathToSend) {
    res.sendFile(filePathToSend, function() {
      console.log('+INF:', 'file', filePathToSend, 'sent');
    });
  }
});

app.listen(process.NODE_ENV || 3000, function() {
  console.log('+INF:', 'Listening on', process.NODE_ENV || 3000);
});

function onPhantomData(data) {
  console.log('+ Phantom: ', data);
}

function tempFile() {
  return '/tmp/' + 'image_' + Math.floor(Math.random() * 10000) + '.png';
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
