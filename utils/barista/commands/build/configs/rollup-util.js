const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const bundleSize = require('rollup-plugin-bundle-size');
const babelConfig = require('./babel.config');

const reactExports = [
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
];

module.exports = function (name, config) {
  const { typescript: ts , organisation_name, rollup_patcher } = config;

  const componentName = typeof organisation_name === 'string'
    ? name.replace(organisation_name, '')
    : name;

  const plugins = [
    resolve(),
    ...(ts ? [typescript()] : []),
    ...(!ts ? [babelConfig('util')] : []),
    commonjs({
      include: /node_modules/,
    }),
    terser(),
    bundleSize()
  ]

  const inputPath = './src/' + ts ? 'index.ts' : 'index.js';

  const patcher = typeof rollup_patcher === 'function'
    ? rollup_patcher
    : x => x;

  return patcher({
    input: inputPath,
    plugins
  });
};
