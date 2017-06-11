const gulp   = require('gulp');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
 
gulp.task('lint', function() {
  return gulp.src(['./routes/**/*.js','./models/**/*.js','./public/javascripts/**/*.js','./app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});