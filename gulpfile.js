const gulp		= require('gulp');
const uglify 	= require('gulp-uglify-es').default;

// File psths
let SCRITS_PATH = 'public/scripts/**/*.js';
let STYLES_PATH = 'public/css/**/*.css';
let HTMLS_PATH	= 'public/*.html';

// Styles
gulp.task('styles', () => {
	console.log('Starting styles task');
});

// Copy HTML to dist
gulp.task('copyHtml', () => {
	console.log('Copying HTML files...');
	gulp.src(HTMLS_PATH)
	.pipe(gulp.dest('public/dist'));
});

// Scripts
gulp.task('scripts', () => {
	console.log('Starting Scripts task');
	gulp.src('public/scripts/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('watch', () => {
	console.log('Watch task started');

	require('./server.js');
	gulp.watch(HTMLS_PATH, ['copyHtml']);
	gulp.watch(SCRITS_PATH, ['scripts']);
});