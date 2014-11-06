'use strict';

var path = require('path');
var childProcess = require('child_process');
var utils = require('./utils');

exports.createPreview = createPreview;

/**
 * Saves site preview and executes callback with its path
 * @param  {String}   url url to make screenshot from
 * @param  {Function} cb  callback executed with errror {Error}
 *                        occured and a stored fileNmae {String}
 * @return {undefined} undefined
 */
function createPreview(url, cb) {
  var fileName = path.resolve(
    path.join('./public/images', utils.tempFile())
  );

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

  imgProcess.on('error', function(err) {
    console.log('Phantom error:', err.stack);

    if (!cbCalled) {
      cbCalled = true;
      cb(err);
    }
  });

//  imgProcess.stdout.on('data', onPhantomData);
//  imgProcess.stderr.on('data', onPhantomData);
}
