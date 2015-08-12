/*
 * Test cases for the Lazy Job Creator
 * @author Chris Alvares <mail@chrisalvares.com>
 */
var assert = require('assert');
var path   = require('path');
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
      var dir  = (__dirname + '/../../test/');

      it('should push action to jobs array when action is file', function() {
          lazy.fetchFilesLazy(dir, jobs);

          assert.strictEqual(3, jobs.length);
      });

      // it('should call function again with path/to/dir/file, and jobs array', function(){
      //     // var expected = lazy.fetchFilesLazy(dir, jobs, 0);
      //     // console.log(expected);

      //     // assert.equal(true, i == 3);


      //   // assert.equal(true, expected ==  )
      // });

   });

   describe('#getActionOfFile', function() {

       it('should return directory', function() {
           assert.equal(true, lazy.getActionOfFile(__dirname, '') == 'directory');
       });

       it('should return false for a blacklisted file', function() {
           assert.equal(false, lazy.getActionOfFile(__dirname, 'index.js'));
       });

       it("should return false when obj's post_filter is not instance of parent class", function() {
          var dir    = (__dirname + '/../../lib/');
          var adopted = new LazyLoader({
            post_filter: function(obj){
              return false;
            }
          });

          assert.strictEqual(false, adopted.getActionOfFile(dir, 'lazyloader.js'));
        });

       it('should return obj when action is file', function() {
          var dir  = (__dirname + '/../../lib/');
          var jobs = [];
          var expected = lazy.getActionOfFile(dir, 'lazyloader.js');

          assert.strictEqual(true, expected instanceof Object);
       });

   });

   describe('#isBlacklistedFile', function() {
        var dir = (__dirname + '/../../');
        var bandit = new LazyLoader({
          filter: function(file){
             if('.js' === path.extname(file) || 'index.js' === file) {
                return true;
             }
             else {
              return false;
            }
          }
        });

        it('should return false for file with true filter property', function() {
            var expected = bandit.isBlacklistedFile(dir + 'lib/lazyloader.js');
            assert.strictEqual(false, expected);
        });

       // it('should return false for file without .js extension or index.js filename', function() {
       //      var expected = bandit.isBlacklistedFile('README.md');

       //      assert.equal(true, expected === false);
       // });
   });

   // describe('#log', function() {

   //     it('should log to console when debug option is true', function() {

   //     });

   //     it('should not log to console when debug option is false', function() {

   //     });
   // });

});
