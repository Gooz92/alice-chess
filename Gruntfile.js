'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        colors: false
      },

      model: {
        src: ['src/model/**/spec/*.spec.js']
      },

      commonUtils: {
        src: ['src/utils/common-utils/spec/*.spec.js']
      },

      chessUtils: {
        src: ['src/utils/chess-utils/spec/*.spec.js']
      },

      fenParser: {
        src: ['src/utils/fen-parser/**/spec/*.spec.js']
      },

      // perft5: {
      //   src: ['src/model/spec/perft/*.spec.js']
      // }
    },

    jshint: {
      all: {
        src: 'src/**/*.js',
        options: {
          jshintrc: true
        }
      }
    },

    htmlbuild: {
      dist: {
        src: 'dist/index.tpl.html',
        dest: 'dist/index.html',
        options: {
          scripts: {
            chessApp: 'dist/app.chess.min.js'
          },
          styles: {
            style: "dist/style.css"
          }
        }
      }
    },

    jsdoc: {
      dist: {
        src: 'src/**/*.js',
        options: {
          destination: 'doc'
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
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'test',
    'clean',
    'browserify',
    'uglify',
    'copy',
    'htmlbuild'
  ]);
};
