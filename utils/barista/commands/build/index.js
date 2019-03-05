const rollup = require('rollup');
const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');

/**
 * @param {'component' | 'util'} moduleType 
 * @param {string} name 
 * @param {Object} config 
 */
async function build (moduleType, config) {
  const { name } = config;
  const rollupInputOptions = moduleType === 'util'
    ? require('./configs/rollup-util')(name, config)
    : require('./configs/rollup-component')(name, config);

  console.log(chalk.green('Creating bundle'));
  const bundle = await rollup.rollup(rollupInputOptions);

  const { organisation_name } = config;
  const componentName = typeof organisation_name === 'string'
    ? name.replace(organisation_name, '')
    : name;

  const rollupOutputOptions = {
    file: './lib/index.js',
    format: 'umd',
    name: componentName ? componentName : configuredName
  };

  console.log(chalk.green('Writing bundle'));
  await bundle.write(rollupOutputOptions);

  if (!config.postBuild) {
    return;
  }

  console.log(chalk.gree('running post bundle script'));
  if (typeof config.postBuild === 'function') {
    return config.postBuild();
  }

  try {
    if (typeof config.postBuild === 'string') {
      shelljs(path.resolve() + '/' + config.postBuild);
    }
  } catch (err) {
    console.log(chalk.yellow('Post build script failed!'));
    console.error(err.message);
  }
}

module.exports = build;