// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const imagemin = require('gulp-imagemin');
// File paths
const files = {
  cssPath: './app/css/style.css',
  jsPath: './app/js/script.js',
  htmlPath: './app/index.html',
  imgPath: './app/images/**/*.+(png|jpg|jpeg|gif|svg)',
  faviconPath: './app/favicon.ico'
}

function cssTask() {
  return src(files.cssPath)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css'))
}

function jsTask() {
  return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
}

function htmlTask() {
  return src(files.htmlPath)
    .pipe(useref())
    .pipe(gulpif('*.html', htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(dest('./dist'))
}

function imgTask() {
  return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('./dist/images'))
}

function copyIconTask() {
  return src(files.faviconPath)
    .pipe(dest('./dist'))
}

function watchTask() {
  watch(
    [files.cssPath, files.jsPath, files.htmlPath],
    series(
      parallel(cssTask, jsTask),
      htmlTask
    )
  )
}

exports.default = series(
  parallel(cssTask, jsTask),
  htmlTask,
  watchTask
);

exports.clean = del.bind(null, ['dist']);

exports.build = series(
  parallel(cssTask, jsTask, imgTask, copyIconTask),
  htmlTask
);
