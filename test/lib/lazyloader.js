/*
 * Test cases for hte Lazy Job Creator
 * @author Chris Alvares <mail@chrisalvares.com>
 */

var LazyLoader = require('../../');
var assert = require('assert');

describe('LazyLoader', function() {
   var lazy = new LazyLoader();

   describe('#fetch', function() {
       var jobs = lazy.fetch();

       it('should return a non-empty array', function() {
           assert.equal(true, jobs instanceof Array);
       });
   });

   describe('#getActionOfFile', function() {
       it('should return directory', function() {
           assert.equal(true, lazy.getActionOfFile(__dirname, '') == 'directory');
       });

       it('should return false for a blacklisted file', function() {
           assert.equal(false, lazy.getActionOfFile(__dirname, 'index.js'));
       });
   });


});
