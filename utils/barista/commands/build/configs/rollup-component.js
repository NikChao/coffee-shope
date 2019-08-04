const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const bundleSize = require('rollup-plugin-bundle-size');
const reactSvg = require('rollup-plugin-react-svg');
const babelConfig = require('./babel.config');

module.exports = function(name, config) {
  const { typescript: ts, rollup_patcher: rollupPatcher } = config;
  const plugins = [
    resolve({
      jail: './src',
    }),
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
    ...(ts ? [typescript()] : []),
    ...(!ts ? [babelConfig('component')] : []),
    commonjs({
      include: [/node_modules/],
    }),
    terser(),
    bundleSize(),
  ];

  const inputFile = ts ? 'index.tsx' : 'index.js';
  const inputPath = 'src/' + inputFile;

  const patcher = typeof rollupPatcher === 'function' ? rollupPatcher : x => x;

  return patcher({
    input: inputPath,
    external: ['react', 'react-dom'],
    plugins,
  });
};
