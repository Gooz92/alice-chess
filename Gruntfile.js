'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        colors: false
      },

      all: {
        src: ['src/**/*.spec.js'],
      },

      attacks: {
        src: 'src/model/spec/attacks.spec.js'
      }
    },

    jshint: {
      all: {
        src: 'src/**/*.js',
        options: {
          jshintrc: true
        }
      }
    },

    browserify: {
      dist: {
        files: {
          'dist/app.chess.js': 'src/browser/app.js'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.chess.min.js': 'dist/app.chess.js'
        }
      }
    },

    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: ['src/browser/view/*'],
        dest: 'dist/',
      }
    },

    clean: {
      dist: {
        src: 'dist'
      }
    }
  });

  grunt.registerTask('test', [
    'mochaTest',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'test',
    'clean',
    'browserify',
    'uglify',
    'copy'
  ]);
};
