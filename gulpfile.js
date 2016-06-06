'use strict';

/**
 * Dependencias
 */
const gulp = require('gulp'),
      // imagemin = require('gulp-imagemin'),
      plumber = require('gulp-plumber'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      bless = require('gulp-bless'),
      sass = require('gulp-sass'),
      jade = require('gulp-jade'),
      babel = require('gulp-babel'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      browserSync = require('browser-sync').create();

/**
 * Variable de entorno.
 * En la terminal se puede definir de manera opcional el puerto para cualquiera
 * de las tareas watch, un ejemplo de uso sería:
 * PORT=8080 gulp watch:all
 */
const PORT = process.env.PORT || 7070;


/**
 * Compila los archivos sass hijos directos de la carpeta `scss/`.
 * Agrega los prefijos propietarios de los navegadores.
 * Los archivos CSS generados se guardan en la carpeta `css/`.
 */
gulp.task('sass', () => {
    const processors = [
        autoprefixer({browsers: ['last 2 versions']})
    ];

    return gulp.src('dev/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed', includePaths: ["node_modules"]}).on('error', sass.logError))
        .pipe(postcss(processors))
        // .pipe(bless())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

/**
 * Compila los archivos jade hijos directos de la carpeta `jade/`.
 * Los archivos HTML generados se guardan en la carpeta raíz del proyecto.
 */
gulp.task('jade', () => {
    return gulp.src('dev/jade/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('babel', () => {
  return gulp.src('dev/es6/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

// pendiente de instalar
// 
// gulp.task('imagemin', () =>{
//     gulp.src('dev/img/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('public/img'))
// });


/**
 * Recarga el HTML en el navegador.
 * Creado para quienes no usen Jade.
 */
gulp.task('html', () => {
    browserSync.reload();
});


/**
 * Crea un servidor local
 * http://localhost:7070
 */
gulp.task('browser-sync', () => {
    browserSync.init({
        port: PORT,
        server: {
            baseDir: "./public"
        },
        ui: {
            port: PORT + 1
        }
    });
});


/**
 * Ejecuta la tarea sass y queda escuchando los cambios de todos
 * los archivos Sass de la carpeta `scss/` y subcarpetas.
 */
gulp.task('watch:sass', () => {
  gulp.watch('dev/sass/**/*.scss', ['sass']);

});


/**
 * Ejecuta la tarea jade y queda escuchando los cambios de todos
 * los archivos jade de la carpeta `jade/` y subcarpetas.
 */
gulp.task('watch:jade', () => {
  gulp.watch('dev/jade/**/*.jade', ['jade']);

});


gulp.task('watch:babel', () => {
  gulp.watch('dev/es6/**/*.js', ['babel']);

});

// pendiente de instalar
// gulp.task('watch:imagemin', () => {
//   gulp.watch('dev/img/', ['imagemin']);

// });


/**
 * Ejecuta la tarea html y queda escuchando los cambios de todos
 * los archivos HTML de la carpeta raíz del proyecto.
 * Creado para quienes no usen Jade.
 */
gulp.task('watch:html', () => {
    browserSync.watch('public/index.html').on('change', () => {
        gulp.start('html');
    });
});

/**
 * Ejecuta las tareas browser-sync, watch:sass, watch:jade y watch:js.
 */
gulp.task('watch:html-sass', ['browser-sync', 'watch:sass', 'watch:babel','watch:html',]);

/**
 * Ejecuta las tareas browser-sync, watch:sass, watch:jade y watch:js.
 */
gulp.task('watch:all', ['browser-sync', 'watch:sass', 'watch:jade', 'watch:babel']);

