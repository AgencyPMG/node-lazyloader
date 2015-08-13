var LazyLoader = require('../../lib/lazyloader');

var a = new LazyLoader({
	debug: false,
	filter: null,
	post_fiter: function(obj) {
		if (obj instanceof LazyLoader) {
			return true;
		} else {
			return false;
		}
	}
});

module.exports = LazyLoader;