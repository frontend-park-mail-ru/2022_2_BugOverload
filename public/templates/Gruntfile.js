module.exports = function (grunt) {
};
module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['*.tpl.js'],
                dest: '../all_templates.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', 'concat');
};
