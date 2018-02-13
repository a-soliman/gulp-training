const gulp			= require('gulp');
const uglify 		= require('gulp-uglify-es').default;
const livereload 	= require('gulp-livereload');
const concat		= require('gulp-concat');
const minifyCss		= require('gulp-minify-css');
const autoprefixer	= require('gulp-autoprefixer');
const plumber		= require('gulp-plumber');
const sourcemaps 	= require('gulp-sourcemaps');
const sass 			= require('gulp-sass');
const babel			= require('gulp-babel');
const del 			= require('del');
const zip 			= require('gulp-zip');

// handlebars
const handlebars 	= require('gulp-handlebars');
const handlebarsLib	= require('handlebars');
const declare		= require('gulp-declare');
const wrap			= require('gulp-wrap');

// Image compresssion
const imagemin					= require('gulp-imagemin');
const imageminPngquant			= require('imagemin-pngquant');
const imageminJpegRecompress	= require('imagemin-jpeg-recompress');


// File psths
let DIST_PATH		= 'public/dist';
let SCRITS_PATH 	= 'public/scripts/**/*.js';
let STYLES_PATH 	= 'public/css/**/*.css';
let HTMLS_PATH		= 'public/*.html';
let SASS_PATH		= 'public/sass/**/*.scss';
let TEMPLATES_PATH	= 'templates/**/*.hbs';
let IMAGES_PATH		= 'public/images/**/*.{png,jpg,jpeg,svg,gif}'


// CLEAN
gulp.task('clean', () => {
	return del.sync([
			DIST_PATH
		]);
});

// IMAGES
gulp.task('images', () => {
	return gulp.src(IMAGES_PATH)
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngquant(),
				imageminJpegRecompress()
			]
		))
		.pipe(gulp.dest(DIST_PATH + '/images'))
});
// // Styles
// gulp.task('styles', () => {
// 	gulp.src(['public/css/reset.css', STYLES_PATH])
// 		.pipe(plumber((err) => {
// 			console.log('Styles task error');
// 			console.log(err);
// 		}))
// 		.pipe(sourcemaps.init())
// 		.pipe(autoprefixer())
// 		.pipe(concat('styles.css'))
// 		.pipe(minifyCss())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(DIST_PATH))
// 		.pipe(livereload());
// });

// SASS
gulp.task('sass', () => {
	gulp.src('public/sass/styles.scss')
		.pipe(plumber((err) => {
			console.log('Styles task error');
			console.log(err);
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
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
	gulp.src(SCRITS_PATH)
		.pipe(plumber((err) => {
			console.log('Scripts task error');
			console.log(err);
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// handlebars
gulp.task('templates', () => {
	return gulp.src(TEMPLATES_PATH)
		.pipe(handlebars({
			handlebars: handlebarsLib
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'templates',
			noRedeclare: true
		}))
		.pipe(concat('template.js'))
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task('default', ['clean', 'images', 'sass', 'copyHtml', 'scripts'], () => {

});

gulp.task('export', () => {
	return gulp.src('public/**/*')
		.pipe(zip('website.zip'))
		.pipe(gulp.dest('./'))
});

gulp.task('watch', ['default'], () => {
	console.log('Watch task started');

	require('./server.js');
	livereload.listen();
	gulp.watch(SASS_PATH, ['sass']);
	gulp.watch(STYLES_PATH, ['styles']);
	gulp.watch(HTMLS_PATH, ['copyHtml']);
	gulp.watch(SCRITS_PATH, ['scripts']);
	gulp.watch(TEMPLATES_PATH, ['templates']);
});

gulp.task('build', ['copyHtml', 'scripts', 'sass']);