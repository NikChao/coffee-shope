import React from 'react';
import { storiesOf } from '@storybook/react';
import { ControlledCheckbox, UncontrolledCheckbox } from '../src';

function onChange(e) {
  console.log(e.target.value ? 'checked' : 'not-checked');
}
storiesOf('Checkbox', module).add('default', () => <UncontrolledCheckbox label="Remember me" onChange={onChange} />);
