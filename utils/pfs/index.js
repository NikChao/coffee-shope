const log = console.log;

function pfs (config, level=0) {
  const spaces = !!level
    ? (new Array((level - 1) * 4)).join(' ') + '|' + (new Array(4)).join('_')
    : '';

  if (config instanceof Array) {
    for (const file of config) {
      log(spaces + file);
    }
    return;
  }

  const keyCount =   Object.keys(config).length;

  Object
    .keys(config)
    .forEach((key, index) => {
      const child = config[key];
      if (child instanceof Array) {
        log(spaces + key + '/');
        return pfs(child, level + 1);
      }
      if (child instanceof Object) {
        log(spaces + key + '/');
        return pfs(child, level + 1);
      }
      log(spaces + key);
    })
}

pfs({
  'package.json': null,
  'index.js': null,
  src: {
    features: {
      feature_x: [
        'index.js',
        'scoped-styles.scss',
        'components/'
      ],
      feature_y: [
        'index.js',
        'scoped-styles.scss',
        'components/'
      ]
    },
    common: [
      'utils/',
      'components/'
    ]
  }
});

export {
  pfs
};
