const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', (callBack) => {
    let running = false;
    return nodemon({
        script: 'index.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    }).on('start', () => {
        if (!running) {
            running = true;
            callBack();
        }
    });
});

gulp.task('browser-sync', gulp.series('nodemon', () => {
    browserSync.init({
        proxy: "http://localhost:3000",
        files: ['views/*.pug'],
        port: 5000,
        notify: true
    });
}));

gulp.task('default', gulp.series('browser-sync', () => {}));
