module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'public/bower_components/angular/angular.js',
      'public/js/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

  });
};
