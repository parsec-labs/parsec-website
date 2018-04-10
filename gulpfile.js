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
const noop = require('gulp-noop');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const globalDefs = require('./gulp-global-svg-defs-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const minisite = require('gulp-minisite');

let watching = false;

const files = {
  js: [
    'node_modules/ilyabirman-likely/release/likely.js',
    'src/js/plugins.js',
    'src/js/cosmos.js',
    'src/js/main.js'
  ],
  presaleJs: [
    'src/js/presale/rocket.js',
    'src/js/timer.js',
    'src/js/presale/requestApi.js',
    'src/js/presale/main.js',
  ],
  css: [
    'src/scss/**/*.scss',
    'node_modules/ilyabirman-likely/release/likely.css'
  ],
  svg: 'src/svg/*.svg',
  html: '**/*.html',
  blog: 'src/blog/**/*'
};

const makeJsTask = (input, output) => (
  gulp.src(input)
      .pipe(plumber())
      .pipe(babel({
        presets: [['env', {
          targets: {
            browsers: ['last 2 versions'],
          },
        }]],
      }))
      .pipe(concat(output))
      .pipe(watching ? noop() : uglify())
      .pipe(gulp.dest('js'))
      .pipe(livereload())
);

gulp.task('js', () => makeJsTask(files.js, 'main.js'));
gulp.task('js:presale', () => makeJsTask(files.presaleJs, 'presale.js'));

gulp.task('css', () => (
  gulp.src(files.css)
      .pipe(plumber())
      .pipe(sass())
      .pipe(watching ? noop() : postcss([
        autoprefixer({browsers: ['last 2 version']}),
        cssnano()
      ]))
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

gulp.task('blog', () => {
  return gulp.src('src/blog/content/**/*')
    .pipe(minisite({
      templateEngine: function(tmplName, tmplData) {
        const marked   = require('marked');
        const nunjucks = require('nunjucks');
        const tinytime = require('tinytime');
        const dateFormat = tinytime('{MM} {DD}, {YYYY}')

        const env = new nunjucks.Environment(
          new nunjucks.FileSystemLoader('src/blog/template'),
          { noCache: true }
        );

        env.addFilter('markdown', function(str) {
          if (!str) return str;
          return new nunjucks.runtime.SafeString(marked(str));
        });

        env.addFilter('formatdate', function(date) {
          return dateFormat.render(date);
        });

        env.addFilter('latestFirst', function(collection) {
          return collection.sort(function(a, b) { return b.date - a.date; });
        });

        return env.render(tmplName, tmplData);
      }
    }))
    .pipe(gulp.dest('blog'))
    .pipe(livereload());
});

gulp.task('dev', ['css', 'js', 'js:presale', 'svg', 'blog'], () => {
  watching = true;
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
    files.presaleJs,
    batch((events, done) => gulp.start('js:presale', done))
  );
  watch(
    files.svg,
    batch((events, done) => gulp.start('svg', done))
  );
  watch(
    files.html,
    batch((events, done) => gulp.start('html', done))
  );
  watch(
    files.blog,
    batch((events, done) => gulp.start('blog', done))
  );
});

gulp.task('default', ['css', 'js', 'js:presale', 'svg', 'blog']);
