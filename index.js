'use strict';

var server = require('./lib/server');

server.listen(process.env.PORT || 3000, function() {
  console.log('+INF:', 'Listening on', process.NODE_ENV || 3000);
});
