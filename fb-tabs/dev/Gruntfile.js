module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      options: {
        sassDir: 'public/css/sass',
        cssDir: 'public/css',
        imagesDir: 'public/img',
        javascriptDir: 'public/js',
        fontsDir: 'public/fonts'
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        }
      },
      production: {
        options: {
          outputStyle: 'compressed'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'public',
          baseUrl: 'js/',
          dir: 'publicbuild',
          mainConfigFile: 'public/js/main.js',
          modules: [{
            name: 'main'
          }],
          locale: '<%= pkg.locale %>',
          optimizeCss: 'standard'
        }
      }
    },
    watch: {
      compass: {
        files: ['public/css/sass/*.scss'],
        tasks: ['compass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['compass:production', 'requirejs']);

};