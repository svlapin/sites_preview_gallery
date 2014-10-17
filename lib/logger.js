'use strict';

module.exports = logGetRequest;

/**
 * HTTP request logger middleware
 * @param  {Object} options Options object (TODO)
 * @return {function} logger middleware function
 */
function logGetRequest (options) {
  // TODO: options such as headers logging, format etc
  return function(req, res, next) {
    if (req.method === 'GET') {
      var start = Date.now();
      req.on('end', function() {
        console.log(
          'HTTP: GET %s: %d %dms',
          req.url, res.statusCode, Date.now() - start
        );
      });
    }

    next();
  };
}
