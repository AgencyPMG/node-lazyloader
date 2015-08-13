/*
 * Class to get all of the files as required, returns as an array
 * @author Chris Alvares <mail@chrisalvares.com>
 */
var fs = require('fs');
var _ = require('underscore');
var path = require('path');

var LazyLoader = function(opts) {
    this.options = _.extend({}, this.defaultOptions, opts);
    // log variable used for debugging and to ensure error logging during tests
    var log = [];
};

/*
 * Fetches the files lazily
 * @access public
 * @return Array
 */
LazyLoader.prototype.fetch = function(dir) {
    dir = dir || __dirname;
    var jobs = [];
    this.fetchFilesLazy(dir, jobs);
    return jobs;
};

/*
 * Fetches the files recursively
 * @access protected
 * @return Array
 */
LazyLoader.prototype.fetchFilesLazy = function(directory, jobs, log) {
    try {
        var files = fs.readdirSync(directory);
        var jobcreator = this;
        _.each(files, function(file) {
            var action = jobcreator.getActionOfFile(directory, file);
            if (action === false) {
                return;
            } else if (action === 'directory') {
                jobcreator.fetchFilesLazy(directory + '/' + file, jobs);
                return;
            } else {
                jobs.push(action);
            }
        });
    } catch (e) {
        this.log('LazyLoader#fetchFilesLazy: ' + e);
        return log.push(e);
    }
    return jobs;
};

/*
 * Logic to figure out what to do with a file or directory
 * @access protected
 * @param directorypath {string} a directory path
 * @param file {string} a filename
 * @return mixed
 */
LazyLoader.prototype.getActionOfFile = function(directorypath, file) {
    var full_path_file = path.join(directorypath, file);

    try {
        if (fs.statSync(full_path_file).isDirectory()) {
            return 'directory';
        }

        if (this.isBlacklistedFile(file)) {
            return false;
        }

        var obj = require(full_path_file);
        if (this.options.post_filter && !this.options.post_filter(obj)) {
            return false;
        }

        return obj;
    } catch (e) {
        this.log('LazyLoader#getAction', e);
    }
    return false;
};

/*
 * These are files to specifically not include, this can be overriden as a option
 * @access protected
 * @param file {string} a filename to determine if it should blacklist
 * @return boolean
 */
LazyLoader.prototype.isBlacklistedFile = function(file) {
    if (this.options.filter) {
        return !this.options.filter(file);
    } else if ('.js' === path.extname(file) || 'index.js' === file) {
        return true;
    }
    return false;
};

/**
 * Logs out if debug is enabled
 * @param {string|Error}
 * @access private
 */
LazyLoader.prototype.log = function(string, log) {
    if (this.options.debug) {
        console.log('LazyLoader#log', string);
        return log.push(string);
    }
};

LazyLoader.prototype.defaultOptions = {
    filter: null,
    post_filter: null,
    debug: false
};


module.exports = LazyLoader;