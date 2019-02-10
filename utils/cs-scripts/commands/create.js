const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const copyDir = require('copy-dir');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function replaceTemplates ({ files=[], name }) {
  files.forEach(file => {
    fs.readFile(file, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      const componentName =
        name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('')

      const result = data
        .replace(/{{TEMPLATE_NAME}}/g, name)
        .replace(/{{COMPONENT_NAME}}/g, componentName);
  
      fs.writeFile(file, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  })
}

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

    replaceTemplates({
      files: ['package.json', 'index.js', '.stories/index.js'].map(f => `${dest}/${f}`),
      name
    });

    clog(`Created template!`)
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