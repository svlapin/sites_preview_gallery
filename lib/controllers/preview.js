'use strict';

var path = require('path');

var phantom = require('../phantom');

exports.get = get;

var TIMEOUT = 1000 * 5;

/**
 * GET /preview
 * @param  {ClientRequest}  req
 * @param  {ServerResponse} res
 * @return {undefined}      undefined
 */
function get(req, res) {
  var resSent = false;

  setTimeout(function() {
    if (!resSent) {
      res.status(500).json({
        error: 'Request timed out'
      });
      resSent = true;
    }
  }, TIMEOUT);

  phantom.createPreview(req.query.url, function(err, fileName) {
    if (err) {
      console.log(err.stack);
      if (!resSent) {
        resSent = true;
        return res.status(500).json({
          error: 'Phantom error'
        });
      }
    }

    if (!resSent) {
      resSent = true;
      res.json({
        path: path.relative('./public', fileName),
        url: req.query.url
      });

      console.log('+INF:', 'file', fileName, ' sent');
    }
  });
}
