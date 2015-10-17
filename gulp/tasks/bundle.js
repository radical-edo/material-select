'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var onError = require('../utils/on_error');
var config = require('../config');

var bundler;

function buildApp () {
  bundler = bundler || watchify(browserify({
    entries: config.paths.jsx,
    extensions: ['.jsx'],
    debug: true,
    fullPaths: true,
    cache: {},
    packageCache: {}
  }))
  return bundler
    .bundle()
    .on('error', onError)
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.paths.dest));
}

module.exports = function bundle() {
  return gulp.src(config.paths.index)
    .pipe(inject(buildApp(), config.inject))
    .pipe(gulp.dest(config.paths.dest));
};

