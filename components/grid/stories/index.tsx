import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid } from '../index.tsx';

storiesOf('Grid', module)
  .add('default', () => (
    <Grid />
  ));