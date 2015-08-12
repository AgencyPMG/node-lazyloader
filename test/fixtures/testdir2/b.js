var LazyLoader = require('../../../lib/lazyloader');

        var bandit = new LazyLoader({
          filter: function(file){
             if('.js' == path.extname(file) || 'index.js' == file) {
                return true;
             }
             else {
              return false;
            }
          }
	    });

module.exports = LazyLoader;