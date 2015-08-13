/*
 * Test cases for the Lazy Job Creator
 * @author Chris Alvares <mail@chrisalvares.com>
 */
var assert = require('assert');
var LazyLoader = require('../../');

describe('LazyLoader', function() {
  var lazy = new LazyLoader({
    debug: false,
    filter: function(file) {
      return true;
    },
    post_fiter: null
  });

  describe('#fetch', function() {
    var jobs = lazy.fetch();

    it('should return a non-empty array', function() {
      assert.equal(true, jobs instanceof Array);
    });
  });

  describe('#fetchFilesLazy', function() {
    var jobs = [];
    var dir = (__dirname + '/../../test/');

    it('should push action to jobs array when action is file', function() {
      lazy.fetchFilesLazy(dir, jobs);

      assert.strictEqual(3, jobs.length);
    });

    it('should log errors', function() {
      var log = [];
      var deadend = (__dirname + '/../../deadend');
      lazy.fetchFilesLazy(deadend, jobs, log);

      assert.notStrictEqual(0, log.length);
    });

  });

  describe('#getActionOfFile', function() {

    it('should return directory', function() {
      assert.equal(true, lazy.getActionOfFile(__dirname, '') == 'directory');
    });

    it('should return false for a blacklisted file', function() {
      assert.equal(false, lazy.getActionOfFile(__dirname, 'index.js'));
    });

    it("should return false when obj is not instance of parent class", function() {
      var adoptedObj = new LazyLoader();
      var postMod = function(obj) {
        if (obj instanceof LazyLoader) {
          return true;
        }
        return false;
      };

      adoptedObj.options.post_filter = postMod;
      var dir = (__dirname + '/../../test/fixtures/');
      var expected = adoptedObj.getActionOfFile(dir, 'a.js');

      assert.strictEqual(false, expected);
    });

    it('should return obj when action is file', function() {
      var dir = (__dirname + '/../../lib/');
      var jobs = [];
      var expected = lazy.getActionOfFile(dir, 'lazyloader.js');

      assert.strictEqual(true, expected instanceof Object);
    });

  });

  describe('#isBlacklistedFile', function() {
    var dir = (__dirname + '/../../');
    var lazyMod = new LazyLoader();
    lazyMod.options.filter = null;

    it('should return false for file with true filter property', function() {
      var expected = lazy.isBlacklistedFile(dir + 'lib/lazyloader.js');

      assert.strictEqual(false, expected);
    });

    it('should return true for file with null filter option and .js extension or index.js filename', function() {
      var expected = lazyMod.isBlacklistedFile(dir + 'test/fixtures/testdir/b.js');

      assert.strictEqual(true, expected);
    });

    it('should return true for file with null filter option and index.js filename', function() {
      var expected = lazyMod.isBlacklistedFile(dir + 'index.js');

      assert.strictEqual(true, expected);
    });

    it('should return false for file with null filter option and without .js extension or index.js filename', function() {
      var expected = lazyMod.isBlacklistedFile(dir + 'README.md');

      assert.strictEqual(false, expected);
    });
  });

  describe('#log', function() {
    var logger = new LazyLoader();
    logger.options.debug = true;

    it('should log to console when debug option is true', function() {
      var log = [];
      logger.log('logger', log);

      assert.notStrictEqual(0, log.length);

    });

  });
});