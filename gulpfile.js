var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function() {
	gulp.src(['./game/js/*.js','./game/js/**/*.js'])
		        .pipe(concat('game.js'))
		        .pipe(gulp.dest('game/min'))
})
gulp.task('watch', function(){
  gulp.watch('./game/js/*', ['js']);
  gulp.watch('./game/js/**/*', ['js']);
  gulp.watch('./game/js/**/**/*', ['js']);
  gulp.watch('./game/js/**/**/**/*', ['js']);
})
