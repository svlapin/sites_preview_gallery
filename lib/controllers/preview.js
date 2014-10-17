'use strict';

var path = require('path');

var phantom = require('../phantom');

exports.get = get;

/**
 * GET /preview
 * @param  {ClientRequest}  req
 * @param  {ServerResponse} res
 * @return {undefined}      undefined
 */
function get(req, res) {
  phantom.createPreview(req.query.url, function(err, fileName) {
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
}
