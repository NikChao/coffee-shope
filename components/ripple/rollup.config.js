import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

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

const cssExportMap = {};

module.exports = {
  input: 'src/index.tsx',
  output: {
    file: './lib/index.js',
    format: 'cjs',
    name: 'button'
  },
  plugins: [
    resolve(),
    typescript(),
    postcss({
      plugins: [
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      getExportNamed: false,
      getExport (id) {
        return cssExportMap[id];
      },
      extract: 'lib/styles.css'
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react/index.js': reactExports,
        '../../node_modules/react/index.js': reactExports
      }
    }),
    terser(),
    bundleSize()
  ]
}
