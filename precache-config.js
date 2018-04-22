//https://github.com/goldhand/sw-precache-webpack-plugin
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback: '/index.html',
    stripPrefix: 'dist',
    root: 'dist/',
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'adminpro',
            filename: 'service-worker.js',
            staticFileGlobs: [
                'dist/index.html',
                'dist/**.js',
                'dist/**.css'
            ],
            stripPrefix: 'dist/assets/',
            mergeStaticsConfig: true // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
        }),
    ]
};
