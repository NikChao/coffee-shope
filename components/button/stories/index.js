import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../index.js';

const click = () => console.log('click!');

storiesOf('Button', module)
  .add('default', () => (
    <div>
      <Button onClick={click} >Click Me</Button>
      <Button onClick={click} disabled >Click Me</Button>
    </div>
  ))
  .add('positive', () => (
    <div>
      <Button onClick={click} positive>Click Me</Button>
      <Button onClick={click} positive disabled >Click Me</Button>
    </div>
  ))
  .add('text only', () => (
    <div>
      <Button onClick={click} textOnly>Click Me</Button>
      <Button onClick={click} textOnly disabled >Click Me</Button>
    </div>
  ));