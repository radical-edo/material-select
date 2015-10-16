var dest = 'build';

module.exports = {
  inject: {
    ignorePath: dest,
    addRootSlash: false
  },
  bowerFiles: {
    paths: {
      bowerDirectory: "node_modules",
      bowerJson: "package.json"
    }
  },
  paths: {
    jsx: 'source/app/app.jsx',
    watchJsx: 'source/app/**/*.jsx',
    watchScss: 'source/styles/**/*.(scss|css)',
    index: 'source/index.html',
    dest: dest,
    scss: 'source/styles/app.scss',
    assets: 'source/assets/**/*.*',
  },
};
