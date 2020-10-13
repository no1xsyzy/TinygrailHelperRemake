import metablock from 'rollup-plugin-userscript-metablock'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

const pkg = require( './package.json' );

const metab = metablock( {
  file: './src/meta.json',
  override: {
    version: pkg.version,
    description: pkg.description,
    homepage: pkg.homepage,
    author: pkg.author,
  },
} )

export default [ {
  input: 'src/main.js',
  output: {
    file: 'dist/TinygrailHelperRemake.user.js',
    format: 'iife',
    globals: {
      jquery: '$'
    }
  },
  plugins: [
    metab,
    postcss( {
      plugins: []
    } ),
  ],
  external: [ 'jquery' ]
}, {
  input: 'src/main.js',
  output: {
    file: 'dist/gadgets/script.js',
    format: 'iife',
    globals: {
      jquery: '$'
    }
  },
  plugins: [
    metab,
    postcss( {
      extract: path.resolve( 'dist/gadgets/style.css' )
    } )
  ],
  external: [ 'jquery' ]
} ]
