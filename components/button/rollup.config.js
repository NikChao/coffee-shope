import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import autoprefixer from 'autoprefixer';

import pkg from './package.json';

const cssExportMap = {};

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'button',
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'button',
    },
    {
      file: pkg.module,
      format: 'es',
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
