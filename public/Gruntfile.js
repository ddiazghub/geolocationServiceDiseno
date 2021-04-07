module.exports = function( grunt ) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/leaflet.SliderControl.min.js': 'dist/leaflet.SliderControl.min.js'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'src/SliderControl.js'
                ],
                dest: 'dist/leaflet.SliderControl.min.js'
            }
        },
        watch: {
            css: {
                files: ['./src/*.scss'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['./src/*.js'],
                tasks: ['default']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat', 'uglify']);
};