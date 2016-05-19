/*eslint-env node*/
var gulp = require('gulp');
var plugin = {};

plugin.rename = require('gulp-rename');
plugin.sass = require('gulp-sass');
plugin.autoprefixer = require('gulp-autoprefixer');
plugin.eslint = require('gulp-eslint');

gulp.task('sass', sass);
gulp.task('lint', lint);
gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
gulp.task('default', ['watch']);

function sass() {
  gulp.src('./scss/main.scss')
  .pipe( plugin.sass() )
  .pipe( plugin.autoprefixer() )
  .pipe( plugin.rename('bundle.js') )
  .pipe( gulp.dest('bundle') );
}

function lint() {
  gulp.src(['./js/**/*.js', './gulpfile'])
    .pipe( plugin.eslint() )
    .pipe( plugin.eslint.format() );
}
