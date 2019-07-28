import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import reactSvg from 'rollup-plugin-react-svg';
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
      react: 'React',
    },
  },
  external: ['react'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      runtimeHelpers: true,
      exclude: /node_modules/,
    }),
    terser(),
    reactSvg({
      // svgo options
      svgo: {
        plugins: [], // passed to svgo
        multipass: true,
      },

      // whether to output jsx
      jsx: false,

      // include: string
      include: null,

      // exclude: string
      exclude: null,
    }),
    bundleSize(),
  ],
};
