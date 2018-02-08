const gulp		= require('gulp');
const uglify 	= require('gulp-uglify-es').default;

// Styles
gulp.task('styles', () => {
	console.log('Starting styles task');
});

// Scripts
gulp.task('scripts', () => {
	console.log('Starting Scripts task');
	gulp.src('public/scripts/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
});