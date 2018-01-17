var gulp = require('gulp'), // Подключаем Gulp
		sass = require('gulp-sass'), // Подключаем Sass пакет
		browserSync = require('browser-sync'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() { // Создаем таск "sass"
	return gulp.src(['sass/**/*.sass', 'sass/**/*.scss']) // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest('css')) // Выгружаем результата в папку css
		.pipe(browserSync.reload({stream: true}))
	});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false
	})
});
	
	
gulp.task('watch',['browser-sync'], function() {
	gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);