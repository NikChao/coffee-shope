const rollup = require('rollup');
const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { hashElement } = require('folder-hash');

async function checkHash () {
  const prevBuildHashPath = path.resolve() + '/lib/.build-hash';

  const hash = (await hashElement(path.resolve() + '/src/')).hash;

  if (!fs.existsSync(prevBuildHashPath)) {
    return hash;
  }

  const prevBuildHash = fs.readFileSync(prevBuildHashPath, 'utf8');

  if (prevBuildHash !== hash) {
    return hash;
  }

  return false;
}

/**
 * @param {'component' | 'util'} moduleType 
 * @param {string} name 
 * @param {Object} config 
 */
async function build (moduleType, config) {
  const { name } = config;
  const newHash = await checkHash();

  if (!newHash) {
    console.log(chalk.green(`Hash matches previous build, skipping build for ${name}`))
    return;
  }

  const rollupInputOptions = moduleType === 'util'
    ? require('./configs/rollup-util')(name, config)
    : require('./configs/rollup-component')(name, config);

  console.log(chalk.green('Creating bundle'));
  const bundle = await rollup.rollup(rollupInputOptions);

  const { organisation_name } = config;
  const componentName = typeof organisation_name === 'string'
    ? name.replace(organisation_name, '')
    : name;

  const rollupOutputOptions = require('./configs/rollup-output')(name);
  console.log(chalk.green('Writing bundle'));
  await bundle.write(rollupOutputOptions);

  fs.writeFileSync(path.resolve() + '/lib/.build-hash', newHash);

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