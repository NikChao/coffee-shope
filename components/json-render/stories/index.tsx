import React from 'react';
import { storiesOf } from '@storybook/react';
import { JsonRender } from '../src/index';

storiesOf('JsonRender', module)
  .add('default', () => (
    <JsonRender json={{ color: 'red', fontWidth: 600, deeply: { nested: 'value' } }} />
  ));
