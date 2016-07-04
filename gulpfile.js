var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');

var env = process.env.NODE_ENV || 'development';
var outputDir;
var sassStyle;

if(env === 'development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
  gutil.log('dev env');
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
  gutil.log('prod env');
}

gutil.log('style: ' + sassStyle);

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
]

var sassSources = ['components/sass/style.scss'];
var htmlSources = [outputDir + '*.html'];
var jsonSources = ['bulids/development/js/*.json'];

gulp.task('log', function() {
    gutil.log('Workflows are awesome');
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
    .on('eror', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src(jsonSources)
  .pipe(connect.reload())
});
