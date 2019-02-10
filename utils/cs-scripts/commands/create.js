const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function createComponent(name) {
  if (!name) {
    clog('No component name provided.', chalk.red);
    return;
  }

  const dir = path.resolve() + `/components/${name}`;
  fs.mkdir(dir);
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