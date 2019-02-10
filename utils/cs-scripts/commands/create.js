const chalk = require('chalk');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function create (moduleType) {
  switch (moduleType) {
    case 'component':
      clog('creating component', chalk.green)
      return;
    case 'module':
      clog('creating module', chalk.green)
      return;
    default:
      clog('invalid module type provided', chalk.red);
      return;
  }
}

module.exports = create;