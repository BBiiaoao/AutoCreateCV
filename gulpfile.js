const gulp = require('gulp');
const sass = require('gulp-sass');

const sassBuild = function () {
  return gulp.src('static/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
};

const jsCopy = function() {
  return gulp.src('static/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
};

gulp.task('sass:build', sassBuild);

gulp.task('js:copy', jsCopy);

gulp.task('static:build', gulp.series(sassBuild, jsCopy));

gulp.task('static:watch', function () {
  gulp.watch('static/css/**/*.scss', sassBuild);
  gulp.watch('static/js/**/*.js', jsCopy);
});
