import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import svg from 'rollup-plugin-svg';

const reactNamedExports = [
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
  'isValidElementType',
  'useState'
];

module.exports = {
  input: 'src/index.js',
  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'button'
  },
  plugins: [
    resolve(),
    postcss({
      modules: true,
      extract: true
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        '../../node_modules/react/index.js': reactNamedExports,
        '/node_modules/react/index.js': reactNamedExports
      }
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    svg()
  ]
}
