module.exports = function (grunt) {
};
module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ['../pre_compile_templates/*.tpl.js'],
                dest: '../all_templates.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', 'concat');
};
