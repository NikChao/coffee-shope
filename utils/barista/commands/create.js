const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const copyDir = require('copy-dir');
const changeCase = require('change-case');
const shelljs = require('shelljs');

const log = (msg, chalkfn) => console.log(chalkfn ? chalkfn(msg) : msg);

function replaceTemplates ({ files=[], names }) {
  const { name, org } = names;

  files.forEach(file => {
    fs.readFile(file, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      const component = changeCase.pascalCase(name);
      const module = changeCase.camelCase(name);
      const packageName = org ? org + '/' + name : name;

      const result = data
        .replace(/{{TEMPLATE_NAME}}/g, name)
        .replace(/{{COMPONENT_NAME}}/g, component)
        .replace(/{{PACKAGE_NAME}}/g, packageName)
        .replace(/{{MODULE_NAME}}/g, module)
        .replace(/{{ORGANISATION_NAME}}/g, org);
  
      fs.writeFile(file, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });
}

function addToStorybook(name, config, extension='js') {
  if (config.storybook === false) {
    log('Not adding to storybook', chalk.yellow);
    return;
  }

  const storybookConfig = path.resolve() + `/.storybook/config.js`;

  if (!fs.existsSync(storybookConfig)) {
    log('Storybook config does not exist', chalk.yellow);
    return;
  }

  fs.readFile(storybookConfig, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    const statement = `require('../${getRootDir(config)}components/${name}/stories/index.${extension}');`

    if (data.includes(statement)) {
      log('Story already exists for this component', chalk.yellow);
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

function getRootDir (config) {
  return config.packages_dir
    ? `${config.packages_dir}/`
    : '';
}

function createComponent(name, config) {
  if (!name) {
    log('ERR: No component name provided.', chalk.red);
    return;
  }

  const organisationName = config.organisation_name;
  if (!organisationName) {
    log(`WARN: No organisation name provided`, chalk.yellow);
  }

  if (organisationName && organisationName[0] !== '@') {
    log('ERR: Organisation name must begin with an "@"');
    return;
  }

  name = changeCase.paramCase(name);
  
  const typescript = config.typescript
  const packageRootDir = getRootDir(config);

  log(`Creating ${name} component...`, chalk.blue);
  
  try {
    const src = __dirname + (typescript ? '/../templates/component-ts' : '/../templates/component');
    const dest = path.resolve() + `/${packageRootDir}components/${name}`;

    copyDir.sync(src, dest);
    
    log(`Created template!`, chalk.blue);
    
    const files = typescript
      ? [ '__tests__/index.tsx', 'stories/index.tsx', 'src/index.tsx' ]
    : [ '__tests__/index.js', 'stories/index.js', 'src/index.js' ];

    replaceTemplates({
      files: [...files, 'package.json', '.baristarc.js'].map(f => `${dest}/${f}`),
      names: { name, org: organisationName }
    });

    log(`Adding to storybook!`, chalk.blue);

    addToStorybook(name, config, typescript ? 'tsx' : 'js');

    log(`Created ${name}!`, chalk.green);
  } catch (err) {
    log(`Failed to create ${name}`, chalk.red);
    console.log(err);
  }
}

function createUtil (name, config) {
  log(`Creating ${name} util...`, chalk.blue);

  const typescript = config.typescript;
  const packageRootDir = getRootDir(config);

  try {
    const src = __dirname + (typescript ? '/../templates/util-ts' : '/../templates/util');
    const dest = path.resolve() + `/${packageRootDir}utils/${name}`;

    copyDir.sync(src, dest);

    log(`Created template!`, chalk.blue);

    const files = typescript
      ? [ '__tests__/index.ts', 'src/index.ts' ]
      : [ '__tests__/index.js', 'src/index.js' ];

    replaceTemplates({
      files: [...files, 'package.json', '.baristarc.js'].map(f => `${dest}/${f}`),
      names: { name, org: config.organisation_name }
    });

    log(`Created ${name}`, chalk.green);

    if (!config.postCreate) {
      return;
    }

    log(`Running postCreate script...`, chalk.green);
    
    // if it's a function
    if (typeof config.postCreate === 'function') {
      config.postCreate({
        dest
      });
    }
    
    // if it's a shell script
    if (typeof config.postCreate === 'string') {
      try {
        shelljs(path.resolve() + '/' + config.postCreate);
      } catch (err) {
        log('Post create script failed');
        console.error(err.message);
      }
    }
  } catch (err) {
    log(`Failed to create ${name}`, chalk.red);
    console.error(err.message);
  }
}

function create (moduleType, name, config) {
  switch (moduleType) {
    case 'component':
      return createComponent(name, config);
    case 'util':
      return createUtil(name, config);
    default:
      log('invalid module type provided', chalk.red);
      return;
  }
}

module.exports = create;
