var gulp = require('gulp'),
    stream = require('stream'),
    compass = require('gulp-compass'),
    order = require('gulp-order'),
    path = require('path'),
    vPaths = require('vinyl-paths'),
    notify = require('gulp-notify'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    source = require('vinyl-source-stream'),
    skipdebug = require('gulp-strip-debug'),
    browserSync = require('browser-sync'),
    del = require('del');

// parent dir
var parent = path.resolve(__dirname, '../');

// Gulp error handler
var onError = function(err) {
  console.log(err);
};

gulp.task('clean', function() {
  return gulp.src(['dist/assets/scripts'])
  .pipe(vPaths(del));
});

gulp.task('copyfonts', function() {
   gulp.src('assets/fonts/**/*.*')
   .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copyimages', function() {
   gulp.src('assets/images/**/*.*')
   .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('copystyles', function() {
  return gulp.src('assets/css/*.*')
    .pipe(gulp.dest('dist/assets/css'));
}); 

gulp.task('6to5ify', ['clean'], function () {
  return browserify('./assets/scripts/app.js', { debug: true })
  .transform('babelify',{presets:['latest','react'], plugins:['transform-regenerator','transform-object-rest-spread','lodash']})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/assets/scripts'))
  .pipe(notify({ message: '6to5ify task complete' }));
});    

gulp.task('compass', function() {
  return gulp.src('assets/sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'dist/assets/css',
      sass: 'assets/sass'
    }))
    .pipe(notify({ message: 'Styles task complete' }));
});
// compile sass for flexbox experiment
gulp.task('sassflex', function() {
  return gulp.src('flexbox/src/assets/sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'flexbox/dist/assets/css',
      sass: 'flexbox/src/assets/sass'
    }))
    .pipe(notify({ message: 'Styles task complete' }));
});

// watch for flexbox sass changes
gulp.task('watch-flexbox', function() {
  gulp.watch('flexbox/src/assets/sass/*.scss', ['sassflex']);
});

// local certs to be created manually on local dev system
// otherwise task will fail, create domain for proxy in nginx
gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'https://rrs.dt.dev',
    port: 3001,
    open: false,
    https: {
      key: path.join( parent + '/localhost-certs/selfsigned.key' ),
      cert: path.join( parent + '/localhost-certs/selfsigned.crt' )
    }
  });
});

gulp.task('default',['copystyles', 'copyfonts', 'copyimages', 'compass'], function(){
  gulp.watch('assets/sass/*.scss', ['compass']);
  gulp.watch('assets/scripts/**/*.js', ['6to5ify', browserSync.reload]);
});

gulp.task('6to5', ['6to5ify']);