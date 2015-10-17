'use strict';

var _ = require('lodash');
var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var sass = require('gulp-sass');

var config = require('../config');

function buildStyles() {
  return gulp.src(config.paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dest));
}

function buildVendorStyles() {
  return gulp.src(bowerFiles(config.bowerFiles))
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest(config.paths.dest));
}

module.exports = function() {
  return gulp.src(config.paths.index)
    .pipe(inject(buildVendorStyles(), _.merge({ name: 'vendor' }, config.inject)))
    .pipe(inject(buildStyles(), config.inject))
    .pipe(gulp.dest(config.paths.dest))
};
