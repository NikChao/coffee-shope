import { configure } from '@storybook/react';

function loadStories() {
  require('../components/grid/stories/index.tsx');
  require('../components/checkbox/stories/index.js');
  require('../components/field/stories/index.js');
  require('../components/ripple/stories/index.js');
  require('../components/button/stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);