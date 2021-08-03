var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var paths = {
  pages: ["src/*.html"],
};
gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});
gulp.task(
  "default",
  gulp.series(gulp.parallel("copy-html"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/main.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .transform("babelify", {
        presets: ["es2015"],
        extensions: [".ts"],
      })
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("dist"));
  })
);
// var gulp = require("gulp");
// var browserify = require("browserify"); // собирает всё вместе
// var source = require("vinyl-source-stream"); // преобразует читаемый поток , который вы получаете от browserify , в поток винила , который ожидает получить gulp.
// var watchify = require("watchify"); // отслеживает изменения
// var tsify = require("tsify");
// var gutil = require("gulp-util");
// var paths = {
//     pages: ['src/*.html']
// }

// var watchedBrowserify = watchify(browserify({
//   basedir: '.',
//   debug: true,
//   entries: ['src/main.ts'],
//   cache: {},
//   packageCache: {}
// }).plugin(tsify));

// gulp.task("copy-html", function () {
//   return gulp.src(paths.pages)
//       .pipe(gulp.dest("dist"));
// });

// function bundle() {
//   return watchedBrowserify
//       .bundle()
//       .pipe(source('main.js'))
//       .pipe(gulp.dest("dist"));
// }

// gulp.task("default", ["copy-html"], bundle);
// watchedBrowserify.on("update", bundle);
// watchedBrowserify.on("log", gutil.log); // выводит в консоль события