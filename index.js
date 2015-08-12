var LazyLoader = module.exports = require('./lib/lazyloader');

var lazy = new LazyLoader({
	debug: false,
	filter: function(file) {
		return true;
	},
	post_fiter: null
});


var getIt = lazy.fetch();	// array

console.log('index FINISHED');
console.log(getIt.length);