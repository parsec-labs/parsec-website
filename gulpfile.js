const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');

const files = {
  js: [
    'src/js/vendor/bootstrap.min.js',
    'src/js/plugins.js',
    'src/js/warp.js',
    'src/js/vendor/procedural/util.js',
    'src/js/vendor/procedural/spheremap.js',
    'src/js/vendor/procedural/planet.js',
    'src/js/vendor/procedural/starbox.js',
    'src/js/vendor/procedural/material.js',
    'src/js/vendor/procedural/procedural.js',
    'src/js/vendor/parallax.min.js',
    'src/js/vendor/in-view.min.js',
    'src/js/main.js',
  ],
  css: 'src/scss/*.scss',
};

gulp.task('js', () => (
  gulp.src(files.js)
      .pipe(plumber())
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

gulp.task('dev', () => {
  livereload.listen();

  watch(
    files.css,
    batch((events, done) => gulp.start('css', done))
  );
  watch(
    files.js,
    batch((events, done) => gulp.start('js', done))
  );
});

gulp.task('default', ['css', 'js']);
