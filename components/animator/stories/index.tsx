import React from 'react';
import { storiesOf } from '@storybook/react';
import { Animator } from '../index';

storiesOf('Animator', module)
  .add('default', () => (
    <Animator />
  ));