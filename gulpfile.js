const gulp			= require('gulp');
const uglify 		= require('gulp-uglify-es').default;
const livereload 	= require('gulp-livereload');
const concat		= require('gulp-concat');
const minifyCss		= require('gulp-minify-css');
const autoprefixer	= require('gulp-autoprefixer');
const plumber		= require('gulp-plumber');
const sourcemaps 	= require('gulp-sourcemaps');


// File psths
let DIST_PATH	= 'public/dist';
let SCRITS_PATH = 'public/scripts/**/*.js';
let STYLES_PATH = 'public/css/**/*.css';
let HTMLS_PATH	= 'public/*.html';

// Styles
gulp.task('styles', () => {
	gulp.src(['public/css/reset.css', STYLES_PATH])
		.pipe(plumber((err) => {
			console.log('Styles task error');
			console.log(err);
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(concat('styles.css'))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Copy HTML to dist
gulp.task('copyHtml', () => {
	console.log('Copying HTML files...');
	gulp.src(HTMLS_PATH)
	.pipe(gulp.dest(DIST_PATH));
});

// Scripts
gulp.task('scripts', () => {
	console.log('Starting Scripts task');
	gulp.src('public/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest(DIST_PATH))
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