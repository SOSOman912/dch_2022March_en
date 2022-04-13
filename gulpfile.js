const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');

gulp.task('minify', done => {
    gulp.series('process-js')
    gulp.src('./css/app.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./css/'));

    gulp.src('./js/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));

    done();
})

gulp.task('process-sass', done => {
    gulp.src([
        './sass/swiper.min.css',
        './sass/jquery.fancybox.css',
        './sass/app.scss',
    ])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(cssnano())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(livereload());

    done();
});

gulp.task('process-js', done => {
    gulp.src([
        './js/jquery-1.11.2.min.js',
        './js/jquery.fancybox.min.js',
        './js/swiper.min.js',
        './js/init.js',
    ])
    .pipe(sourcemaps.init())   
    // .pipe(cssnano()) 
    .pipe(sourcemaps.write())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(livereload());

    done();
});


gulp.task('default', () => {
    livereload.listen();
    gulp.watch(
        ['./sass/*.scss'],
        { ignoreInitial: false },
        gulp.series('process-sass')
    )
    gulp.watch(
        ['./js/init.js'],
        { ignoreInitial: false },
        gulp.series('process-js')
    )
})