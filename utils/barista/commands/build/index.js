const rollup = require('rollup');
const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');

/**
 * @param {'component' | 'util'} moduleType 
 * @param {string} name 
 * @param {Object} config 
 */
async function build (moduleType, name, config) {
  const rollupConf = moduleType === 'util'
    ? require('./configs/rollup-util')(name, config)
    : require('./configs/rollup-component')(name, config);

  console.log(chalk.green('Creating bundle'));
  const bundle = await rollup.rollup(rollupConf);

  console.log(chalk.green('Writing bundle'));
  await bundle.write(outputOptions);

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