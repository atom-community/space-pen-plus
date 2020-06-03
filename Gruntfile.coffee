module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    coffeelint:
      options:
        no_empty_param_list:
          level: 'error'
        max_line_length:
          level: 'ignore'

      src: ['src/*.coffee']
      test: ['spec/*.coffee']
      gruntfile: ['Gruntfile.coffee']

    shell:
      rollup:
        command: 'npm run build'
        options:
          stdout: true
          stderr: true
          failOnError: true

      test:
        command: 'node spec/headless-spec-runner.js'
        options:
          stdout: true
          stderr: true
          failOnError: true

      'update-atomdoc':
        command: 'npm update grunt-atomdoc'
        options:
          stdout: true
          stderr: true
          failOnError: true

      clean:
        command: 'npm run clean'
        options:
          stdout: true
          stderr: true
          failOnError: true

    connect:
      server:
        options:
          port: 1337
          keepalive: true

  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-coffeelint')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-atomdoc')


  grunt.registerTask('clean', ['shell:clean'])
  grunt.registerTask('lint', ['coffeelint'])
  grunt.registerTask('test', ['default', 'shell:test'])
  grunt.registerTask('start', ['default', 'connect'])
  grunt.registerTask('bower', ['default'])
  grunt.registerTask('prepublish', ['clean', 'shell:rollup', 'lint', 'shell:update-atomdoc', 'atomdoc'])
  grunt.registerTask('default', ['shell:rollup'])
