var LazyLoader = require('../../lib/lazyloader');

var a = new LazyLoader({
	debug: false,
	filter: function(file) {
		return true;
	},
	post_fiter: null
});

var getIt = a.fetch();	// array
console.log(getIt.length);
console.log('lib/testdir/a.js FINISHED');

module.exports = LazyLoader;