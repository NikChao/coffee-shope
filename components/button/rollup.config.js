import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';

module.exports = {
  input: './index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs'
  },
  plugins: [
    scss(),
    postcss({
      modules: true,
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]    
}
