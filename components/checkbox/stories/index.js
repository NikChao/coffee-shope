import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '../src';

function onChange (e) {
  console.log(
    e.target.value
      ? 'checked'
      : 'not-checked'
  );
}
storiesOf('Checkbox', module)
  .add('default', () => (
    <Checkbox label='Remember me' onChange={onChange} />
  ));