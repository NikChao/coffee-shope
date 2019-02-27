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

function getConfig () {
  const configPath = `${path.resolve()}/.shoperc.json`;

  if (!fs.existsSync(configPath)) {
    return {};
  }

  const contents = fs.readFileSync(configPath, 'utf8');

  try {
    return JSON.parse(contents);
  } catch (err) {
    return {};
  }
}

function run(command, moduleType, name, typescript=false) {
  const config = getConfig();
  config.typescript = typescript;
  console.log(config);

  return;

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

run(command, moduleType, name, !yargs.argv['no-typescript']);
