const gulp = require('gulp');
const ghpages = require('gulp-gh-pages');
const imagemin = require('gulp-imagemin');

gulp.task('imgmin', function() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghpages());
});