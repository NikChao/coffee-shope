import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../index.js';

storiesOf('Button', module)
  .add('default', () => (
    <div>
      <Button onClick={window.alert} ></Button>
      <Button onClick={window.alert} disabled ></Button>
    </div>
  ))
  .add('with text', () => (
    <div>
      <Button onClick={window.alert} >Hello, World!</Button>
      <Button onClick={window.alert} disabled >Hello, World!</Button>
    </div>
  ));  