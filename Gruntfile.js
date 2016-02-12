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
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);
};
