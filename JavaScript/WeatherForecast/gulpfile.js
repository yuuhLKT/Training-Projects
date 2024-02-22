const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');

function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())  
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
}

function minifyJS() {
    return gulp.src('./src/*.js')
        .pipe(sourcemaps.init())  
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
}

exports.default = gulp.series(styles, minifyJS);
exports.watch = function () {
    gulp.watch('./src/styles/*.scss', gulp.series(styles));
    gulp.watch('./src/*.js', gulp.series(minifyJS));
};
