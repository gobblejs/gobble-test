# gobble-test

This is a simple utility for testing gobble plugins.

## Installation

```bash
npm i -D gobble-test
```

## Usage

(Note: these instructions are guidelines only. Feel free to adapt to your circumstances.)

In your plugin repo, create a `test` directory. Inside that folder create two subdirectories - `src` and `expected` - and an `index.js` file, so that your plugin repo looks something like this:

```
gobble-myplugin
|- test
   |- src
   |- expected
   |- index.js
|- package.json
|- index.js
|- README.md
```

In the `src` directory, create some source files. In the `expected` directory, create a directory of output files for each test. Your `index.js` file should look something like this:

```js
var gobble = require( 'gobble' ),
    test = require( 'gobble-test' ),
    path = require( 'path' ),
    myPlugin = require( '../' );

test([
  {
    name: 'myplugin without options',
    definition: gobble( path.join( __dirname, 'src' ) ).transform( myplugin ),
    expected: path.join( __dirname, 'expected/no-options' )
  },
  {
    name: 'myplugin with some options',
    definition: gobble( path.join( __dirname, 'src' ) ).transform( myplugin, {
      foo: 'bar'
    }),
    expected: path.join( __dirname, 'expected/with-options' )
  }
]);
```

Run `node test` from the root of your plugin repo. gobble-test will take each test in turn, build the definition to `gobble-test-result`, and compare it with the contents of `expected`. If they differ, it will abort the run of tests, leaving `gobble-test-result` so that you can inspect it and figure out what went wrong.


## License

MIT