#! /usr/bin/env node

// for proper module resolution
require('module-alias/register');

const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const create = require('./commands/create');
const build = require('./commands/build');
const stories = require('./commands/stories');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function readRuntimeConfigFile () {
  const configPath = `${path.resolve()}/.baristarc.js`;

  if (!fs.fileExistsSync(configPath)) {
    return null;
  }

  return require(configPath);
}

function getConfig (argv) {
  const flagConfig = {
    typescript: argv['no-typescript'] !== undefined ? !argv['no-typescript'] : undefined,
    storybook: argv['no-storybook'] !== undefined ? !argv['no-storybook'] : undefined,
    organisation_name: argv['organisation-name'],
    packages_dir: argv['packages-dir']
  };

  const config = readRuntimeConfigFile();

  if (!config) {
    return flagConfig;
  }

  try {
    const config = JSON.parse(contents);

    // Override config with manual flags
    for (const key of Object.keys(flagConfig)) {
      if (flagConfig[key] === undefined) {
        continue;
      }
      config[key] = flagConfig[key];
    }

    if (config.typescript === undefined) {
      config.typescript = true;
    }

    if (config.storybook === undefined) {
      config.storybook = true;
    }

    return config;
  } catch (err) {
    return flagConfig;
  }
}

function run(command, moduleType, name, argv) {
  const config = getConfig(argv);

  if (!command) {
    clog('No command specified', chalk.red);
    return;
  }
  if (command === 'create') {
    return create(moduleType, name, config);
  }
  if (command === 'build') {
    return build(moduleType, name, config);
  }
  if (command === 'story') {
    return stories();
  }
  clog('No valid command specified', chalk.red);
}

const [ command, moduleType, name ] = _.get(yargs, 'argv._', ['', '']);

run(command, moduleType, name, yargs.argv);
