'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');
var _ = require('lodash');

function run(task) {
  return function () {
    gulp.start(task);
  };
}

module.exports = function () {
  gulp.start('build');
  watch(config.paths.watchApp, run('bundle'));
  watch(config.paths.watchStyles, run('styles'));
  watch(config.paths.watchAssets, run('assets'));
};
