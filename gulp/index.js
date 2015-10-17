'use strict';

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var _ = require('lodash');

var scripts = require('./utils/scripts');

var tasks = fs.readdirSync(path.resolve(__dirname, 'tasks')).filter(scripts.filter).map(scripts.name);

module.exports = function () {
  tasks.forEach(function (task) {
    var fn = require(path.resolve(__dirname, 'tasks', task));
    if ('build' == task) {
      gulp.task(task, _.without(tasks, 'build', 'watch'), fn)
    } else {
      gulp.task(task, fn);
    }
  });
};
