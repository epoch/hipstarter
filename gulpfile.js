/*eslint-env node*/
var gulp = require('gulp');
var path = require('path');
var runSeq = require('run-sequence');

const PORT = 3000;
const PLUGINS = {};

PLUGINS.util = require('gulp-util');
PLUGINS.server = require('browser-sync').create();
PLUGINS.rename = require('gulp-rename');
PLUGINS.sass = require('gulp-sass');
PLUGINS.autoprefixer = require('gulp-autoprefixer');
PLUGINS.eslint = require('gulp-eslint');
PLUGINS.webpack = require('webpack');

gulp.task('styles', styles);
gulp.task('lint', lint);
gulp.task('serve', serve);
gulp.task('watch', watch);
gulp.task('webpack', webpack);
gulp.task('build', ['styles', 'webpack']);
gulp.task('default', ['build'], function() {
  runSeq('serve', 'watch');
})

function watch() {
  gulp.watch('js/**/*.js', ['webpack', 'lint']);
  gulp.watch('bundle/*.js', PLUGINS.server.reload);
  gulp.watch('scss/**/*.scss', function() {
    runSeq('styles', PLUGINS.server.stream);
  });
  gulp.watch('./index.html').on('change', PLUGINS.server.reload);
}

function webpack() {
  var loaders = {
    babel: {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.join(__dirname, 'js')],
      query: {
        presets: ['es2015'],
        compact: false
      }
    }
  }

  var settings = {
    entry: './js/index.js',
    output: {
      path: path.join(__dirname, 'bundle'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [loaders.babel]
    }
  }

  PLUGINS.webpack(settings, function(err, stats) {
    if (err) throw new PLUGINS.util.PluginError("webpack", err);
    if (stats.hasErrors()) {
      PLUGINS.util.log("[webpack]", stats.toJson().errors.toString());
    }
  });
}

function serve() {
  PLUGINS.server.init({
    port: PORT,
    server: './',
    open: false
  });
}

function styles() {
  gulp.src('./scss/main.scss')
  .pipe( PLUGINS.sass().on('error', PLUGINS.sass.logError) )
  .pipe( PLUGINS.autoprefixer() )
  .pipe( PLUGINS.rename('bundle.css') )
  .pipe( gulp.dest('bundle') )
  .pipe( PLUGINS.server.stream() );
}

function lint() {
  gulp.src(['./js/**/*.js', './gulpfile'])
    .pipe( PLUGINS.eslint() )
    .pipe( PLUGINS.eslint.format() );
}
