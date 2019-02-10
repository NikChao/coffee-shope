const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const copyDir = require('copy-dir');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function componentName(name) {
  return name
    .split('-')
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join('');
}

function replaceTemplates ({ files=[], name }) {
  files.forEach(file => {
    fs.readFile(file, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      const component = componentName(name);

      const result = data
        .replace(/{{TEMPLATE_NAME}}/g, name)
        .replace(/{{COMPONENT_NAME}}/g, component);
  
      fs.writeFile(file, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });
}

function addToStorybook(name) {
  const storybookConfig = path.resolve() + `/.storybook/config.js`;
  console.log('here');

  if (!fs.existsSync(storybookConfig)) {
    clog('Storybook config does not exist', chalk.yellow);
    return;
  }

  console.log('here');
  fs.readFile(storybookConfig, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    const statement = `require('../components/${name}/stories/index.js');`

    if (data.includes(statement)) {
      clog('story already exists for this component', chalk.yellow);
      return;
    }

    const result = data
      .replace(
        'function loadStories() {\n',
        `function loadStories() {\n  ${statement}\n`
      );

    fs.writeFile(storybookConfig, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
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
    
    clog(`Created template!`, chalk.blue);
    
    replaceTemplates({
      files: ['package.json', 'index.js', 'stories/index.js'].map(f => `${dest}/${f}`),
      name
    });

    clog(`Adding to storybook!`, chalk.blue);

    addToStorybook(name)

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