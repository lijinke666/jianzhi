const gulp = require("gulp")
const path = require('path')
const auto = require('gulp-autoprefixer')
const concat = require("gulp-concat")

//样式加前缀
gulp.task('auto',()=>{
    gulp.src(path.resolve(__dirname,"src/css/sender.css"))
        .pipe(auto({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true
            remove:false //是否去掉不必要的前缀 默认：true 
        }))
        // .pipe(concat("sender.auto.css"))
        .pipe(gulp.dest('src/css'))
})