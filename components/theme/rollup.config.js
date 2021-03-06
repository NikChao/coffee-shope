import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import bundleSize from 'rollup-plugin-bundle-size';

module.exports = {
  input: 'index.js',
  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'theme',
    exports: 'named'
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    terser(),
    bundleSize()
  ]
}
