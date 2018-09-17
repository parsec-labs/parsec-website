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
const critical = require('critical');
const glob = require('glob');
const nunjucks = require('nunjucks');
const runSequence = require('run-sequence');

const loadBlogPosts = require('./src/gulp/loadBlogPosts');

let watching = false;

const files = {
  js: [
    'src/js/plugins.js',
    'src/js/cosmos.js',
    'src/js/menu.js',
    'src/js/subscribeForm.js',
    'src/js/main.js'
  ],
  blogJs: [
    'src/js/menu.js',
    'src/js/subscribeForm.js',
    'src/js/blog/main.js'
  ],
  presaleJs: [
    'src/js/presale/rocket.js',
    'src/js/timer.js',
    'src/js/presale/requestApi.js',
    'src/js/presale/main.js',
  ],
  faqJs: [
    'src/js/faq/faq.js'
  ],
  css: [
    'src/scss/**/*.scss',
  ],
  svg: 'src/svg/*.svg',
  html: '*/*.html',
  blog: 'src/blog/**/*',
  site: 'src/site/**/*',
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

gulp.task('js:site', () => makeJsTask(files.js, 'main.js'));
gulp.task('js:presale', () => makeJsTask(files.presaleJs, 'presale.js'));
gulp.task('js:faq', () => makeJsTask(files.faqJs, 'faq.js'));
gulp.task('js:blog', () => makeJsTask(files.blogJs, 'blog.js'));

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

process.setMaxListeners(0);
const extractCriticalCSS = file => (
  critical.generate({
    inline: true,
    base: './',
    src: file,
    dest: file,
    width: 1300,
    height: 700,
  })
);

gulp.task('generate:blog', () => {
  return gulp.src('src/blog/content/**/*')
    .pipe(minisite({
      templateEngine(tmplName, tmplData) {
        const marked   = require('marked');
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
          return collection.sort((a, b) => b.date - a.date);
        });


        const authorLink = function(pageData) {
          if (typeof pageData.author === 'string') return '';
          const name = authorName(pageData);
          if (!name) return '';
          const link = pageData.author.twitter
            ? `https://twitter.com/${pageData.author.twitter}`
            : pageData.author.link;
          if (!link) return '';

          return `<a href=\"${link}\">${name}</a>`;
        };

        const authorName = function(pageData) {
          if (!pageData.author) return '';
          return typeof pageData.author === 'string'
            ? pageData.author
            : pageData.author.name;
        };

        if (tmplData.page.template == 'post.html') {
          tmplData.page.authorName = authorName(tmplData.page);
          tmplData.page.authorLink = authorLink(tmplData.page);
        }

        return env.render(tmplName, tmplData);
      }
    }))
    .pipe(gulp.dest('blog'))
    .pipe(livereload());
});

gulp.task('critical:blog', (cb) => {
  setTimeout(() => {
    glob('blog/**/*.html', (err, matches) => {
      Promise.all(matches.map(extractCriticalCSS))
        .then(() => setTimeout(cb, 100));
    });
  }, 100);
});

gulp.task('blog', (cb) => {
  runSequence(['css', 'js:blog', 'generate:blog'], 'critical:blog', cb);
});

let posts;
gulp.task('generate:site', async (cb) => {
  if (!posts) {
    posts = await loadBlogPosts('src/blog/content');
  }
  return gulp.src('src/site/content/**/*')
    .pipe(minisite({
      templateEngine(tmplName, tmplData) {
        const marked   = require('marked');
        const tinytime = require('tinytime');
        const dateFormat = tinytime('{MM} {DD}, {YYYY}');

        const env = new nunjucks.Environment(
          new nunjucks.FileSystemLoader('src/site/template'),
          { noCache: true }
        );

        env.addFilter('formatdate', function(date) {
          return dateFormat.render(date);
        });

        tmplData.posts = posts.sort((a, b) => b.date - a.date).slice(0, 3);

        return env.render(tmplName, tmplData);
      }
    }))
    .pipe(gulp.dest('.'))
    .pipe(livereload());
});

gulp.task('critical:site', (cb) => {
  setTimeout(() => {
    extractCriticalCSS('index.html').then(() => setTimeout(cb, 100));
  }, 100);
});

gulp.task('site', (cb) => {
  runSequence(['css', 'generate:site', 'js:site', 'js:presale'], 'critical:site', cb);
});

gulp.task('dev', ['css', 'js:site', 'js:presale', 'js:faq', 'js:blog', 'svg', 'generate:blog', 'generate:site'], () => {
  watching = true;
  livereload.listen();

  watch(
    files.css,
    batch((events, done) => gulp.start('css', done))
  );
  watch(
    files.js,
    batch((events, done) => gulp.start('js:site', done))
  );
  watch(
    files.presaleJs,
    batch((events, done) => gulp.start('js:presale', done))
  );
  watch(
    files.faqJs,
    batch((events, done) => gulp.start('js:faq', done))
  );
  watch(
    files.blogJs,
    batch((events, done) => gulp.start('js:blog', done))
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
    batch((events, done) => gulp.start('generate:blog', done))
  );
  watch(
    files.site,
    batch((events, done) => gulp.start('generate:site', done))
  );
});

gulp.task('default', ['svg', 'blog', 'site']);
