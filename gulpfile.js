var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');

var coffeeSources = ['components/coffee/*.coffee'];

gulp.task('log', function() {
    gutil.log('Workflows are awesome');
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
    .on('eror', gutil.log))
    .pipe(gulp.dest('components/scripts'))
})
