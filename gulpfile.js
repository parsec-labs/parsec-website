const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');

const files = {
  js: [
    'src/js/plugins.js',
    'src/js/cosmos.js',
    'src/js/main.js',
  ],
  css: 'src/scss/*.scss',
  html: 'index.html',
};

gulp.task('js', () => (
  gulp.src(files.js)
      .pipe(plumber())
      .pipe(babel({
        presets: [['env', {
          targets: {
            browsers: ['last 2 versions'],
          },
        }]],
      }))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('js'))
      .pipe(livereload())
));

gulp.task('css', () => (
  gulp.src(files.css)
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('css'))
      .pipe(livereload())
));

gulp.task('html', () => (
  gulp.src(files.html)
      .pipe(plumber())
      .pipe(livereload())
));

gulp.task('dev', ['css', 'js'], () => {
  livereload.listen();

  watch(
    files.css,
    batch((events, done) => gulp.start('css', done))
  );
  watch(
    files.js,
    batch((events, done) => gulp.start('js', done))
  );
  watch(
    files.html,
    batch((events, done) => gulp.start('html', done))
  );
});

gulp.task('default', ['css', 'js']);
