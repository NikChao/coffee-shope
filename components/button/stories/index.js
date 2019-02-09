import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../index.js';

storiesOf('Button', module)
  .add('default', () => (
    <div>
      <Button onClick={window.alert} >Click Me</Button>
      <Button onClick={window.alert} disabled >Click Me</Button>
    </div>
  ))
  .add('positive', () => (
    <div>
      <Button onClick={window.alert} positive>Click Me</Button>
      <Button onClick={window.alert} positive disabled >Click Me</Button>
    </div>
  ))
  .add('text only', () => (
    <div>
      <Button onClick={window.alert} textOnly>Click Me</Button>
      <Button onClick={window.alert} textOnly disabled >Click Me</Button>
    </div>
  ));