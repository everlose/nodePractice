var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    seajsCombo = require('gulp-seajs-combo'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

//逻辑代码打包
(function () {
    var biz = {
        index: {
            js: 'static/src/biz/index/index.js',
            css: 'static/src/biz/index/index.less'
        },
        home: {
            js: 'static/src/biz/home/home.js',
            css: 'static/src/biz/home/home.less'
        }

    };

    var allBizTask = [],
        allBizCssTask = [],
        allBizJsTask = [];

    var prop = '';

    for (prop in biz) {

        //md，用立即执行函数来解决闭包变量prop。
        /*(function(param){
            gulp.task(param, function() {
                return gulp.src(biz[param].js)
                    .pipe(concat(param + '.js'))
                    .pipe(gulp.dest('static/development'))
                    .pipe(uglify())
                    .pipe(concat(param + '.min.js'))
                    .pipe(gulp.dest('static/production'));
            });
        })(prop);*/
        (function(param){
            gulp.task(param + '_js', function() {
                return gulp.src(biz[param].js)
                    .pipe(seajsCombo())
                    .pipe(gulp.dest('static/build'))
                    .pipe(rename({ suffix: '.min' }))
                    .pipe(uglify())
                    .pipe(seajsCombo())
                    .pipe(gulp.dest('static/build'));
            });
            gulp.task(param + '_css', function() {
                return gulp.src(biz[param].css)
                    .pipe(less())
                    .pipe(concatCss(param + '.css'))
                    .pipe(gulp.dest('static/build'))
                    .pipe(rename({ suffix: '.min' }))
                    .pipe(minifyCSS())
                    .pipe(gulp.dest('static/build'));
            });
            
        })(prop);
        gulp.task(prop, [prop + '_css', prop + '_js']);
        allBizCssTask.push(prop + '_css');
        allBizJsTask.push(prop + '_js');
        allBizTask.push(prop);
    }

    gulp.task('biz', allBizTask);
    gulp.task('biz_css', allBizCssTask);
    gulp.task('biz_js', allBizJsTask);
})();

//公用js和css打包
(function () {
    

    var base = {
        js: [
            'bower/seajs/dist/sea.js',
            'bower/jquery/dist/jquery.js',
            'bower/bootstrap/dist/js/bootstrap.js'
        ],
        css: [
            'bower/bootstrap/dist/css/bootstrap.css',
            'bower/bootstrap/dist/css/bootstrap-theme.css'

        ]
    };

    gulp.task('minify-lib-scripts', function() {
        // Minify and copy all JavaScript (except vendor scripts)
        // with sourcemaps all the way down
        return gulp.src(base.js)
            .pipe(concat('base.js'))
            .pipe(gulp.dest('static/build'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('static/build'))
    });

    gulp.task('minify-lib-css', function() {
        return gulp.src(base.css)
            .pipe(concatCss('base.css'))
            .pipe(gulp.dest('static/build'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifyCSS())
            .pipe(gulp.dest('static/build'))
    });

    // The default task (called when you run `gulp` from cli)
    gulp.task('base', ['minify-lib-scripts', 'minify-lib-css']);
})();

//监听文件变化
gulp.task('watch_css',function(){
  // 监听.less文件,一旦有变化,立刻调用build-less任务执行
  gulp.watch('static/src/biz/*/*.less', ['biz_css']);
});
gulp.task('watch_js',function(){
  gulp.watch('static/src/biz/*/*.js', ['biz_js']);
});
gulp.task('watch', ['watch_css', 'watch_js']);
