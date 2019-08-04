const babel = require('rollup-plugin-babel');

module.exports = function (moduleType) {
  const presets = [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "false",
        "exclude": ["es6.promise"]
      }
    ]
  ];

  const plugins = [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-syntax-import-meta",
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        "corejs": 2,
        "regenerators": true
      }
    ],
    "@babel/plugin-syntax-dynamic-import"
  ];

  if (moduleType === 'component') {
    presets.push("@babel/preset-react")
  }

  return babel({
    runtimeHelpers: true,
    exclude: /node_modules/,
    presets,
    plugins
  })
}