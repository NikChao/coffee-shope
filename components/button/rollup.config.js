import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: 'src/index.js',
  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'button',
    exports: 'named',
    globals: {
      React: 'React'
    }
  },
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    babel({
      runtimeHelpers: true,
      exclude: /node_modules/
    }),
    terser()
  ]
}
