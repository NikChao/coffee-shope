import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

module.exports = {
  input: 'src/index.tsx',
  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'button'
  },
  plugins: [
    resolve(),
    typescript(),
    postcss({
      modules: true,
      extract: true
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PureComponent',
          'PropTypes',
          'createElement',
          'Fragment',
          'cloneElement',
          'StrictMode',
          'createFactory',
          'createRef',
          'createContext',
          'isValidElement',
          'isValidElementType'
        ]
      }
    }),
    terser(),
    bundleSize()
  ]
}
