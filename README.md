[![Build Status](https://travis-ci.org/AgencyPMG/node-lazyloader.svg?branch=master)](https://travis-ci.org/AgencyPMG/node-lazyloader)
[![Coverage Status](https://coveralls.io/repos/AgencyPMG/node-lazyloader/badge.svg)](https://coveralls.io/r/AgencyPMG/node-lazyloader)
[![npm version](https://badge.fury.io/js/node-lazyloader.svg)](http://badge.fury.io/js/node-lazyloader)


# node-lazyloader
A dynamic file loader for NodeJS, loads files (via require) if they are in a directory

## Install
```
npm install lazyloader
```

## How to Use
```js
var LazyLoader = require('node-lazyloader');

var lazy = new LazyLoader({
    debug: true, //gives you more verbose output
    filter: function(file) {
        //compare a file to block out
        if ('donotincludefile.js' === file) {
            return false;
        }
        return true;
    }
});

var allFiles = lazy.fetch('/path/to/node/files');
```
