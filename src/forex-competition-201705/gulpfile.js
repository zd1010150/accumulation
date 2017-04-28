//gulp compile and minify less just for landingpages develop
"use strict"
var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');

var path = require('path');

//landingpage path
var LANDING_PATH = "./landingpage/forex-competition-201705/";

//less的配置路径
var LESS_FILE_IMPORT_PATHES = LANDING_PATH+"src/less/*.less";
var LESS_FILE_EXPORT_PATHES =  LANDING_PATH+"dist/css/";

// var LESS_FILE_IMPORT_PATHES = "./resources/assets/less/lib/*.less";
// var LESS_FILE_EXPORT_PATHES = "./public/css/lib";
//js的配置路径
var JS_FILE_IMPORT_PATHES = LANDING_PATH+"src/js/**/*.js";
var JS_FILE_EXPORT_PATHES =  LANDING_PATH+"dist/js/";
var EXCLUDE_JS_FILE_IMPORT_PATHES = LANDING_PATH+"src/js/**/*.min.js";

gulp.task('less', function () {
    return gulp.src(LESS_FILE_IMPORT_PATHES)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(LESS_FILE_EXPORT_PATHES));
});


/**=---上线压缩版本--**/
gulp.task('compress-online-js', function() {
  gulp.src([JS_FILE_IMPORT_PATHES,"!"+EXCLUDE_JS_FILE_IMPORT_PATHES])
      .on('error',function(err){
          console.log(err);
      })
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(JS_FILE_EXPORT_PATHES));
});
gulp.task('compress-min-js', function() {
    gulp.src(EXCLUDE_JS_FILE_IMPORT_PATHES)
        .pipe(gulp.dest(JS_FILE_EXPORT_PATHES));
});
gulp.task('compress-js', function() {
    gulp.src([JS_FILE_IMPORT_PATHES,"!"+EXCLUDE_JS_FILE_IMPORT_PATHES])
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(JS_FILE_EXPORT_PATHES));
});
gulp.task('default',['less','compress-js','compress-min-js'], function() {
    gulp.watch(LESS_FILE_IMPORT_PATHES, ['less']);  // Watch all the .less files, then run the less task
    gulp.watch(JS_FILE_IMPORT_PATHES,['compress-js']);//WATCH ALL THE .JS FILE
    gulp.watch(EXCLUDE_JS_FILE_IMPORT_PATHES,['compress-min-js']);//WATCH ALL THE min.JS FILE
});
gulp.task('release',['less','compress-online-js','compress-min-js']);

var WEBTHEME_PATH = "./wp-content/themes/AKD/assets/css/pages/**";
var WEBTHEME_BUNDLEPATH = "./wp-content/themes/AKD/assets/css/bundle/**";
gulp.task('compress-web-js',function(){
	gulp.src([WEBTHEME_PATH , WEBTHEME_BUNDLEPATH])
	.pipe(concatCss('style.min.css'))
	.pipe(cleanCSS())
    .pipe(gulp.dest("./wp-content/themes/AKD/assets/css/"));	
});
