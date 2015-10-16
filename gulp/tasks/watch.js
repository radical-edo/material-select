'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');
var _ = require('lodash');

function bundle() {
  gulp.start('bundle');
}

function build() {
  gulp.start('build');
}

module.exports = function () {
  build();
  return watch(config.paths.watchJsx, bundle);
};
