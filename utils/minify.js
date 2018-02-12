const UglifyJS = require('uglify-es');
// minify HTML markup
const htmlMinifier = require('html-minifier');
// minify JS, CSS, SVG assets
const minify = require('express-minify');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {
  // the default view cache has unminified markup in it, so it is of no use
  // so we disable it and use our own caching object
  app.set('view cache', false);

  const uglifyOptions = {
    mangle: true,
    compress: {
      drop_console: true,
    }
  };
  const assetCacheDir = path.join(__dirname, 'cache');

  app.use(function(req, res, next) {
    res.minifyOptions = res.minifyOptions || {};
    // prevent sharing same object across multiple instances
    res.minifyOptions.js = Object.assign({}, uglifyOptions);
    next();
  });

  if (!fs.existsSync(assetCacheDir)){
    fs.mkdirSync(assetCacheDir);
  }
  app.use(minify({
    uglifyJsModule: UglifyJS,
    // cache assets in the filesystem, as they can quickly gobble up memory
    cache: assetCacheDir,
  }));
  // use our own view cache that we store our minified markup in
  // TODO: use cloudflare nginx caching instead
  const viewCache = {};
  app.use(function(req, res, next) {
    res.innerRender = res.render;
    res.render = function(view, options) {
      const cached = viewCache[view];
      if (cached !== undefined) {
        res.send(cached);
      } else {
        this.innerRender(view, options, (err, html) => {
          if (err) throw err;
          const minifiedHtml = htmlMinifier.minify(html, {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            sortAttributes: true,
            sortClassName: true,
            minifyJS: text => UglifyJS.minify(text,
              Object.assign({}, uglifyOptions)).code,
            minifyCSS: true,
            minifyURLs: true,
          });
          viewCache[view] = minifiedHtml;
          res.send(minifiedHtml);
        });
      }
    };
    next();
  });
};
