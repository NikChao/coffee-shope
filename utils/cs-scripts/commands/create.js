const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const copyDir = require('copy-dir');
const changeCase = require('change-case');

const clog = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function replaceTemplates ({ files=[], name }) {
  files.forEach(file => {
    fs.readFile(file, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      const component = changeCase.pascalCase(name);
      const module = changeCase.camelCase(name);

      const result = data
        .replace(/{{TEMPLATE_NAME}}/g, name)
        .replace(/{{COMPONENT_NAME}}/g, component)
        .replace(/{{MODULE_NAME}}/g, module);
  
      fs.writeFile(file, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });
}

function addToStorybook(name, extension='js') {
  const storybookConfig = path.resolve() + `/.storybook/config.js`;

  if (!fs.existsSync(storybookConfig)) {
    clog('Storybook config does not exist', chalk.yellow);
    return;
  }

  fs.readFile(storybookConfig, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    const statement = `require('../components/${name}/stories/index.${extension}');`

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

function createComponent(name, config) {
  if (!name) {
    clog('No component name provided.', chalk.red);
    return;
  }

  name = changeCase.paramCase(name);

  const typescript = config.typescript

  clog(`Creating ${name} component...`, chalk.blue);
  
  try {
    const src = __dirname + (typescript ? '/../templates/component-ts' : '/../templates/component');
    const dest = path.resolve() + `/components/${name}`;
    copyDir.sync(src, dest);
    
    clog(`Created template!`, chalk.blue);
    
    const files = typescript
    ? [ '__tests__/index.tsx', 'stories/index.tsx', 'index.tsx' ]
    : [ '__tests__/index.js', 'stories/index.js', 'index.js' ];

    replaceTemplates({
      files: ['package.json', ...files].map(f => `${dest}/${f}`),
      name
    });

    clog(`Adding to storybook!`, chalk.blue);

    addToStorybook(name, typescript ? 'tsx' : 'ts')

    clog(`Created ${name}!`, chalk.green);
  } catch (err) {
    clog(`Failed to create ${name}`, chalk.red);
    console.log(err);
  }
}

function createUtil (name, config) {
  clog(`Creating ${name} util...`, chalk.blue);

  const typescript = config.typescript;

  try {
    const src = __dirname + (typescript ? '/../templates/util-ts' : '/../templates/util');
    const dest = path.resolve() + `/utils/${name}`;

    copyDir.sync(src, dest);

    clog(`Created template!`, chalk.blue);

    const files = typescript
      ? [ '__tests__/index.ts', 'index.ts' ]
      : [ '__tests__/index.js', 'index.js' ];

    replaceTemplates({
      files: [...files, 'package.json'].map(f => `${dest}/${f}`),
      name
    });

    clog(`Created ${name}`, chalk.green);
  } catch (err) {
    clog(`Failed to create ${name}`, chalk.red);
    console.log(err);
  }
}

function create (moduleType, name, config) {
  switch (moduleType) {
    case 'component':
      return createComponent(name, config);
    case 'util':
      return createUtil(name, config);
    default:
      clog('invalid module type provided', chalk.red);
      return;
  }
}

module.exports = create;
