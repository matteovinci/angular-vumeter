/**
 * Gulp settings
 */
var gulp = require('gulp');

/* Karma test runner configuration */
gulp.task('default', function(done) {
    var Server = require('karma').Server;
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        autoWatch: true,
        browsers : ['Chrome']
    }, done).start();
});
