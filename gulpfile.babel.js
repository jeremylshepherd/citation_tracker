"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import sass from "gulp-sass";

gulp.task("build-js", () => {
    
    return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("public/dist"));
});

gulp.task('build-css', () => {
  return gulp.src('src/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('public/dist'));
});

gulp.task("default", ["build-js", "build-css"]);