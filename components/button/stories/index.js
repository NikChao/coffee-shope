import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../index.js';

storiesOf('Button', module)
  .add('default', () => (
    <Button></Button>
  ))
  .add('with text', () => (
    <Button text="Hello, World!"></Button>
  ));  