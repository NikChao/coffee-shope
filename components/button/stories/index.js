import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../index.js';

storiesOf('Button', module)
  .add('default', () => (
    <Button onClick={window.alert} />
  ))
  .add('with text', () => (
    <Button text="Hello, World!" onClick={window.alert} />
  ));  