'use strict';

var path = require('path');

module.exports = {
  filter: function (fileName) {
    return /\.(js)$/i.test(path.extname(fileName));
  },
  name: function (fileName) {
    return path.basename(fileName, '.js');
  }
};
