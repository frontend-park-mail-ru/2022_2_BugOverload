module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ['../../public/pre_compile_templates/*.tpl.js'],
                dest: 'all_templates.js'
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['*.handlebars'],
                tasks: ['newer:concat'],
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer')

    grunt.registerTask('default', 'concat', 'watch');
};

