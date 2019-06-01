const isTest = String(process.env.NODE_ENV) === 'test';
module.exports = {
  presets: [['@babel/preset-env', { modules: isTest ? 'commonjs' : false }]],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
};
