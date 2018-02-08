const gulp			= require('gulp');
const uglify 		= require('gulp-uglify-es').default;
const livereload 	= require('gulp-livereload');
const concat		= require('gulp-concat');


// File psths
let SCRITS_PATH = 'public/scripts/**/*.js';
let STYLES_PATH = 'public/css/**/*.css';
let HTMLS_PATH	= 'public/*.html';

// Styles
gulp.task('styles', () => {
	gulp.src(STYLES_PATH)
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('public/dist'))
		.pipe(livereload());
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
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'))
		.pipe(livereload());
});

gulp.task('watch', () => {
	console.log('Watch task started');

	require('./server.js');
	livereload.listen();
	gulp.watch(STYLES_PATH, ['styles']);
	gulp.watch(HTMLS_PATH, ['copyHtml']);
	gulp.watch(SCRITS_PATH, ['scripts']);
});