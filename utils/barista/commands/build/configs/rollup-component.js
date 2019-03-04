const postcss = require('rollup-plugin-postcss');
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
    ...(!ts ? [babelConfig('component')] : []),
    postcss({
      modules: true,
      extract: true
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react/index.js': reactExports
      }
    }),
    terser(),
    bundleSize()
  ]

  const patcher = typeof rollup_patcher === 'function'
    ? rollup_patcher
    : x => x;

  return patcher({
    input: 'src/index.tsx',
    output: {
      file: './lib/index.js',
      format: 'umd',
      name: componentName
    },
    plugins
  });
};
