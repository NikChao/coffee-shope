#! /usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const create = require('./commands/create');
const build = require('./commands/build');
const stories = require('./commands/stories');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function getConfig (argv) {
  const flagConfig = {
    typescript: !argv['no-typescript'],
    storybook: !argv['no-storybook'],
    organisation_name: argv['organisation-name'],
    packages_dir: argv['packages-dir']
  };

  const configPath = `${path.resolve()}/.shoperc.json`;

  if (!fs.existsSync(configPath)) {
    return flagConfig;
  }

  const contents = fs.readFileSync(configPath, 'utf8');

  try {
    const config = JSON.parse(contents);

    // Override config with manual flags
    for (const key of Object.keys(flagConfig)) {
      if (flagConfig[key] === undefined) {
        continue;
      }
      config[key] = flagConfig[key];
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
    return build();
  }
  if (command === 'story') {
    return stories();
  }
  clog('No valid command specified', chalk.red);
}

const [ command, moduleType, name ] = _.get(yargs, 'argv._', ['', '']);

run(command, moduleType, name, yargs.argv);
