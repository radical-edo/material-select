'use strict';

var gulp = require('gulp');

var config = require('../config');


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


module.exports = function () {
  moveAssets();
  moveBowerFonts();
};
