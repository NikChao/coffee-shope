const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const copyDir = require('copy-dir');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function createComponent(name) {
  if (!name) {
    clog('No component name provided.', chalk.red);
    return;
  }

  clog(`Creating ${name} component...`, chalk.blue);
  
  try {
    const src = __dirname + '/../templates/component';
    const dest = path.resolve() + `/components/${name}`;
    copyDir.sync(src, dest);
    clog(`Created ${name}!`, chalk.green);
  } catch (err) {
    clog(`Failed to create ${name}`, chalk.red);
    console.log(err);
  }

  // const create = new Promise(resolve => fs.mkdir(dir, resolve));
  // create.then(() => {
  //   console.log();
  // })
}

function create (moduleType, name) {
  switch (moduleType) {
    case 'component':
      return createComponent(name);
    case 'module':
      clog('creating module', chalk.green)
      return;
    default:
      clog('invalid module type provided', chalk.red);
      return;
  }
}

module.exports = create;