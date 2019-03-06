import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import autoprefixer from 'autoprefixer';

import pkg from './package.json';

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'button',
      globals: {
        React: 'React'
      }
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'button',
      globals: {
        React: 'React'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      globals: {
        React: 'React'
      }
    }
  ],
  external: [
    'react',
  ],  
  plugins: [
    peerDepsExternal(),
    resolve(),
    postcss({ extract: true, plugins: [autoprefixer] }),
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
