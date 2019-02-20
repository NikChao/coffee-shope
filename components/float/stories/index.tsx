import React from 'react';
import { storiesOf } from '@storybook/react';
import { Float } from '../index';

function click () {
  console.log('click');
}

storiesOf('Float', module)
  .add('default', () => (
    <Float onClick={click} text="This is a floating button" />
  ))
  .add('disabled', () => (
    <Float onClick={click} text="nuh-uh" disabled />
  ));