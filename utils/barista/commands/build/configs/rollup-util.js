const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const bundleSize = require('rollup-plugin-bundle-size');
const babelConfig = require('./babel.config');

module.exports = function (name, config) {
  const { typescript: ts , rollup_patcher } = config;

  const plugins = [
    resolve({
      jail: './src',
    }),
    ...(ts ? [typescript()] : []),
    ...(!ts ? [babelConfig('util')] : []),
    commonjs({
      include: /node_modules/,
    }),
    terser(),
    bundleSize()
  ]

  const inputPath = 'src/' + (ts ? 'index.ts' : 'index.js');
  const patcher = typeof rollup_patcher === 'function'
    ? rollup_patcher
    : x => x;

  return patcher({
    input: inputPath,
    plugins
  });
};
