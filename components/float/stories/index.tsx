import React from 'react';
import { storiesOf } from '@storybook/react';
import { Float } from '../index.tsx';

storiesOf('Float', module)
  .add('default', () => (
    <Float />
  ));