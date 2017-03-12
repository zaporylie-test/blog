var gulp = require('gulp');
var livereload = require('gulp-livereload');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('styles', function() {
    gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(plumber())
        .pipe(sourcemaps.write())
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['css/**']).on('change', function() {
        var args = arguments;
        setTimeout(function() {
            livereload.changed.apply(this, args);
        }, 200);
    });
    gulp.watch(['sass/**/*'], ['styles']);
});
