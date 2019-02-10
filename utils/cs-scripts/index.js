#! /usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');

const create = require('./commands/create');
const build = require('./commands/build');
const stories = require('./commands/stories');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function run(command, moduleType) {
  if (!command) {
    clog('No command specified', chalk.red);
    return;
  }
  if (command === 'create') {
    return create(moduleType);
  }
  if (command === 'build') {
    return build();
  }
  if (command === 'story') {
    return stories();
  }
  clog('No valid command specified', chalk.red);
}

const [ command, moduleType ] = _.get(yargs, 'argv._', ['', '']);

run(command, moduleType);