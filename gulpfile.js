const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
//const changed = require('gulp-changed');

gulp.task('clean', function (done) {
  if (fs.existsSync('./dist/')) {
    return gulp.src('./dist/', { read: false })
      .pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSetting = {
  prefix: '@@',
  basepath: '@file',
};

const plumberNotify = (title) => {
return {
  errorHandler: notify.onError({
    title: title,
    message: 'Error <%= error.message %>',
    sound: false,
  }),
};
}


gulp.task('html', function () {
  return gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    //.pipe(changed('./dist/images', {hasChanged: changed.compareContents}))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileIncludeSetting))
    //.pipe(htmlclean())
    .pipe(gulp.dest('./dist/'));
});



gulp.task('sass', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(plumber(plumberNotify('SCSS'))) 
    .pipe(sourceMaps.init()) 
    .pipe(autoprefixer())
    .pipe(sassGlob()) 
    .pipe(sass().on('error', sass.logError)) 
    .pipe(csso())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./dist/css/')) 
    .pipe(browserSync.stream()); 
});


gulp.task('images', function () {
  return gulp.src('./src/img/**/*', {encoding: false})
  .pipe(newer('./dist/img')) 
  .pipe(imagemin({verbose: true}))
  //.pipe(changed('./dist/images'))
    .pipe(gulp.dest('./dist/img/'))
});

gulp.task('fonts', function () {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('files', function () {
  return gulp.src('./src/files/**/*')
    .pipe(gulp.dest('./dist/files/'));
});

gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
  .pipe(plumber(plumberNotify('JS')))
  .pipe(babel())
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
    open: true,
    notify: false,
  });

  gulp.watch('./src/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch('./src/**/*.html', gulp.series('html')).on('change', browserSync.reload);
  gulp.watch('./src/img/**/*', gulp.series('images')).on('change', browserSync.reload);
  gulp.watch('./src/fonts/**/*', gulp.series('fonts')).on('change', browserSync.reload);
  gulp.watch('./src/files/**/*', gulp.series('files')).on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js', gulp.series('js')).on('change', browserSync.reload);
});




gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('html', 'sass', 'images', 'fonts', 'files', 'js'),
  'server' 
));