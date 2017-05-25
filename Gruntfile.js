module.exports = function(grunt) {
  'use strict';
  //
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright 2010-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
      ' */\n',
    /* clean directories */
    clean: ['dist'],
    /* concat files */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      basic_and_extras: {
        files: {
          'dist/<%= pkg.name %>.js': ['<%= pkg.name %>.js'],
          'dist/<%= pkg.name %>.css': ['<%= pkg.name %>.css']
        },
      },
    },
    /* js file minification */
    uglify: {
      options: {
        preserveComments: false
      },
      build: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },
    /* css file minification */
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
        }
      }
    },
    /* put files not handled in other tasks here */
    copy: {
      test: {
        files: [{
          expand: true,
          dot: true,
          src: ['<%= pkg.name %>.js'],
          dest: 'docs/js/'
        }, {
          expand: true,
          dot: true,
          src: ['<%= pkg.name %>.css'],
          dest: 'docs/css/'
        }]
      }
    },
    /* commit on gh-pages github */
    'gh-pages': {
      options: {
        base: 'docs/',
        message: 'auto-generated commit'
      },
      src: ['**/*']
    },
    /* update bower json */
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitFiles: ['-a'], // all Files
        push: true,
        pushTo: 'origin'
      }
    }
  });
  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }
  // tasks
  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify',
    'cssmin',
    'copy'
  ]);
  grunt.registerTask('deploy', [
    'build',
    'bump',
    'gh-pages'
  ]);
  grunt.registerTask('default', [
    'build'
  ]);
};
