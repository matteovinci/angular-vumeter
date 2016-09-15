/**
 * Gulp settings
 */
var gulp = require('gulp');
var fs = require('fs');
var packageJsonObj = JSON.parse(fs.readFileSync("./package.json", "utf8"));

/* Karma test runner configuration */
gulp.task('default', function(done) {
    var Server = require('karma').Server;
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        autoWatch: false,
        browsers : ['PhantomJS']
    }, done).start();
});

var shell = require('gulp-shell');
gulp.task('generate-doc', shell.task([
    'node_modules/jsdoc/jsdoc.js ' +
    '-c docs/config.json ' +   // config file
    '-t docs/jsdoc-template ' +   // template file
    '-d docs/build ' +                            // output directory
    './README.md ' +                            // to include README.md as index contents
    '-r dist'                   // source code directory
]));
