'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var concat = require('gulp-concat');
var _ = require('lodash');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var util = require('gulp-util');

var onError = require('../utils/on_error');
var config = require('../config');

var bundler;

function initBundler() {
  var b = browserify({
    entries: config.paths.jsx,
    extensions: ['.jsx'],
    debug: true,
    fullPaths: true,
    cache: {},
    packageCache: {}
  })
  if (!config.env.production) {
    b = watchify(b);
  }
  return b;
}

function buildApp () {
  bundler = bundler || initBundler();
  return bundler
    .bundle()
    .on('error', onError)
    .pipe(source('app.js'))
    .pipe(config.env.production && buffer() || util.noop())
    .pipe(config.env.production && uglify() || util.noop())
    .pipe(gulp.dest(config.paths.dest));
}

module.exports = function bundle() {
  return gulp.src(config.paths.index)
    .pipe(inject(buildApp(), config.inject))
    .pipe(gulp.dest(config.paths.dest));
};

