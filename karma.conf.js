/**
 * Karma test runner settings
 * @author Matteo Vinci <mavinci@cisco.com>
 */
module.exports = function (karma) {
    karma.set({
        //From where to look for files, starting with the location of this file
        basePath: '',

        //This is the list of file patterns to load into the browser during testing
        //More info on inclusion expressions matching https://github.com/isaacs/minimatch
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'dist/angular-vumeter.js',
            'dist/angular-vumeter.spec.js'

        ],
        frameworks: [
            'jasmine'
        ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-mocha-reporter'
        ],

        logLevel: 'WARN',

        //How to report, by default
        reporters: ['mocha'],
        /**
         * On which port should the browser connect, on which port is the test runner
         * operating, and what is the URL path for the browser to use
         */
        port: 7019,
        urlRoot: '/',

        /**
         * The list of browsers to launch to test ondest     * default, but other browser names include:
         * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
         *
         * Note that you can also use the executable name of the browser, like "chromium"
         * or "firefox", but that these vary based on your operating system.
         *
         * You may also leave this blank and manually navigate your browser to
         * http://localhost:9018/ when you're running tests. The window/tab can be left
         * open and the tests will automatically occur there during the build. This has
         * the aesthetic advantage of not launching a browser every time you save.
         */
        browsers: [
            // defined by gulp
            //'Chrome',
            //'PhantomJS'

    ]
    });
};
