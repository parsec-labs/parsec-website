const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const livereload = require('gulp-livereload');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const wrap = require('gulp-wrap');
const globalDefs = require('./gulp-global-svg-defs-plugin');

const files = {
  js: [
    'src/js/plugins.js',
    'src/js/cosmos.js',
    'src/js/main.js',
  ],
  css: 'src/scss/*.scss',
  svg: 'src/svg/*.svg',
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

gulp.task('svg', () => (
  gulp.src(files.svg)
      .pipe(
        svgSprite({
          mode: {
            symbol: true
          },
          svg: {
            xmlDeclaration: false
          }
        })
      )
      .pipe(globalDefs())
      .pipe(
        wrap("document.getElementById('svg-sprite').innerHTML = '<%= contents %>';")
      )
      .pipe(rename('sprite.svg.js'))
      .pipe(gulp.dest('js')))
      .pipe(livereload())
);

gulp.task('html', () => (
  gulp.src(files.html)
      .pipe(plumber())
      .pipe(livereload())
));

gulp.task('dev', ['css', 'js', 'svg'], () => {
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
    files.svg,
    batch((events, done) => gulp.start('svg', done))
  );
  watch(
    files.html,
    batch((events, done) => gulp.start('html', done))
  );
});

gulp.task('default', ['css', 'js', 'svg']);
