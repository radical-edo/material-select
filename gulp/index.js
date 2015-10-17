'use strict';

var path = require('path');
var fs = require('fs');

var gulp = require('gulp');
var scripts = require('./utils/scripts');

var tasks = fs.readdirSync(path.resolve(__dirname, 'tasks')).filter(scripts.filter).map(scripts.name);

module.exports = function () {
  tasks.forEach(function (task) {
    gulp.task(task, require(path.resolve(__dirname, 'tasks', task)));
  });
};
