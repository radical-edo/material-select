'use strict';

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var _ = require('lodash');

var scripts = require('./utils/scripts');

var tasks = fs.readdirSync(path.resolve(__dirname, 'tasks')).filter(scripts.filter).map(scripts.name);

module.exports = function () {
  gulp.task('build', _.without(tasks, 'watch'));
  tasks.forEach(function (task) {
    var fn = require(path.resolve(__dirname, 'tasks', task));
    gulp.task(task, fn);
  });
};
