module.exports = function ( tests, callback ) {
	var path = require( 'path' ),
		rimraf = require( 'rimraf' ),
		chalk = require( 'chalk' ),
		spelunk = require( 'spelunk' ),
		assert = require( 'assert' );

	next();

	function next () {
		var test, outputdir;

		test = tests.shift();

		if ( !test ) {
			if ( callback ) {
				callback();
			}

			return;
		}

		outputdir = path.resolve( 'gobble-test-result' );

		test.definition.build({
			gobbledir: '.gobble-test',
			dest: outputdir,
			force: true
		}).then( function () {
			return spelunk( outputdir ).then( function ( actual ) {
				return spelunk( test.expected ).then( function ( expected ) {
					var message;

					try {
						assert.deepEqual( actual, expected );
						process.stdout.write( '√' );
					} catch ( err ) {
						message = '\n' + ( test.name ? test.name + ': ' : '' );
						message += 'test result differs from expectations. See ' + chalk.cyan( outputdir ) + ' directory for details';

						console.log( message );
						process.exit( 1 );
					}
					rimraf( outputdir, next );
				});
			});
		}).catch( function ( err ) {
			setTimeout( function () {
				if ( callback ) {
					callback( err );
				} else {
					throw err;
				}
			});
		});
	}
};
