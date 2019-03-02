import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

const cssExportMap = {};

module.exports = {
  input: 'src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'cjs',
    name: 'button'
  },
  plugins: [
    resolve(),
    typescript(),
    commonjs({
      include: /node_modules/,
    }),
    terser(),
    bundleSize()
  ]
}
