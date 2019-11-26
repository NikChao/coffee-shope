import { configure, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

// Option defaults.
addParameters({
  options: {
    theme: themes.normal,
    height: 'inherit'
  },
 });

function loadStories() {
  require('../components/dropdown/stories/index.tsx');
  require('../components/animator/stories/index.tsx');
  // require('../components/ripple/stories/index.tsx');
  // require('../components/float/stories/index.tsx');
  require('../components/grid/stories/index.tsx');

  require('../components/checkbox/stories/index.js');
  require('../components/field/stories/index.js');
  require('../components/button/stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
