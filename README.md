# node-lazyloader
A dynamic file loader for NodeJS, loads files (via require) if they are in a directory

## Install
```
npm install lazyloader
```

## How to Use
```js
var LazyLoader = require('lazyloader');

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
