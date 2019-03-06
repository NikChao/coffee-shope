import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import bundleSize from 'rollup-plugin-bundle-size';

module.exports = {
  input: 'src/index.js',
  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'button',
    exports: 'named',
    globals: {
      React: 'React',
      '@emotion/styled': 'styled',
      react: 'React'
    }
  },
  external: [
    'react'
  ],
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
