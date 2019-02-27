import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, LargeButton } from '../index.js';

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
  ))
  .add('large button', () => (
    <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <LargeButton onClick={click} positive textOnly>Large Clicky Boi</LargeButton>
      <LargeButton onClick={click} positive small textOnly>Large Clicky Boi</LargeButton>
      <LargeButton onClick={click} textOnly>Large Clicky Boi</LargeButton>
      <LargeButton onClick={click} small textOnly>Large Clicky Boi</LargeButton>
    </div>
  ));