'use strict';

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeDriver: '/usr/local/bin/chromedriver',

  seleniumServerJar: '/home/svl/soft/selenium-server-standalone-2.44.0.jar',

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
