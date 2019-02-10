const chalk = require('chalk');
const path = require('path');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function createComponent() {
  const dir = path.resolve();
  console.log(path);
  console.log(dir);
}

function create (moduleType) {
  switch (moduleType) {
    case 'component':
      return createComponent();
    case 'module':
      clog('creating module', chalk.green)
      return;
    default:
      clog('invalid module type provided', chalk.red);
      return;
  }
}

module.exports = create;