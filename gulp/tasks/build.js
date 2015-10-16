'use strict';

// general dependencies
var gulp = require('gulp');
var config = require('../config');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var _ = require('lodash');
var bowerFiles = require('main-bower-files');

// scss dependencies
var sass = require('gulp-sass');

function moveAssets() {
  return gulp.src(config.paths.assets)
    .pipe(gulp.dest(config.paths.dest));
}

function moveBowerFonts() {
  return gulp.src(['bootstrap', 'font-awesome'].map(function (framework) {
    return 'node_modules/' + framework + '/fonts/*.*';
  }))
  .pipe(gulp.dest(config.paths.dest + '/fonts'));
}

function buildStyles() {
  return gulp.src(config.paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dest));
}

function buildVendorStyles() {
  return gulp.src(bowerFiles(_.merge({
    filter: /.*\.css$/
  }, config.bowerFiles)))
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest(config.paths.dest));
}

module.exports = function() {
  moveAssets();
  moveBowerFonts();
  gulp.start('bundle');
  return gulp.src(config.paths.index)
    .pipe(inject(buildVendorStyles(), _.merge({ name: 'vendor' }, config.inject)))
    .pipe(inject(buildStyles(), config.inject))
    .pipe(gulp.dest(config.paths.dest))
};
