var 	gulp     = require('gulp'),
	uglify       = require('gulp-uglify'),
	jade         = require('gulp-jade'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	nodemon      = require('gulp-nodemon'),
	browserSync  = require('browser-sync'),
	reload       = browserSync.reload,
	sourcemaps   = require('gulp-sourcemaps'),
	imagemin     = require('gulp-imagemin');
	pngquant     = require('imagemin-pngquant');
	rename       = require('gulp-rename');

// Scripts Task
gulp.task('scripts', function(){
	gulp.src(['public/javascripts/*.js', '!public/javascripts/*.min.js'])
		.pipe(sourcemaps.init())
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/javascripts/'));
});


// Style Task: Development
gulp.task('sass-dev', function(){
	return gulp.src('public/sass/**/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        './bower_components/font-awesome/scss',
        './bower_components/bootstrap-sass/assets/stylesheets'
      ]
    }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(reload({ stream: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/stylesheets/'))
});

// Style Task: Production
gulp.task('sass-prod', function(){
	gulp.src('public/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ 
			style: 'compressed',
			includePaths: [
        'bower_components/font-awesome',
				'bower_components/susy/sass',
				'bower_components/breakpoint-sass/stylesheets'
		  	]
		 }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(reload({ stream: true }))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/stylesheets/'))
});

gulp.task('browser-sync', function(){
	browserSync.init(null, {
		proxy: 'http://localhost:3000',
				port: 7000,
	});
});


gulp.task('nodemon', function (cb) {
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
			cb();
	});
});

// Template Task
gulp.task('templates', function(){
	gulp.src('views/**/*.jade')
		.pipe(reload({ stream: true }))
});

// Template Task For Angular
gulp.task('templates:angular', function(){
	gulp.src('public/app/**/*.jade')
		.pipe(jade())
		.pipe(reload({ stream: true }))
    .pipe(gulp.dest('public/app/'))
});


//Image Optimisation
gulp.task('images', function(){
	return gulp.src('public/images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/images/'));
});


// Watch Task
gulp.task('watch', function(){
	gulp.watch('public/javascripts/**/*.js', ['scripts']);
	gulp.watch('public/sass/**/*.scss', ['sass-dev']);
	// gulp.watch('public/images/**/*', ['images']);
	gulp.watch('views/**/*.jade', ['templates']);
	gulp.watch('public/app/**/*.jade', ['templates:angular']);
});


gulp.task('default', ['browser-sync', 'watch']); 

