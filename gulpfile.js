// include gulp and plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

// gulp styles task
gulp.task('styles', function() {
    return sass('src/sass/main.scss', { sourcemap: false }) 
        .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/styles'))
    .pipe(notify({ message: 'Styles task completed' }));
});

// gulp scripts task
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts'))
    .pipe(notify({ message: 'Scripts task completed' }));
});

// gulp watch task and livereolad task
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.start('styles', 'scripts');
});

// gulp default task
gulp.task('default', function() {
    gulp.start('styles');
});