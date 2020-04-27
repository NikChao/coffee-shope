import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoffeeShopeThemeProvider } from '@coffee-shope/theme-provider';
import { ControlledCheckbox, UncontrolledCheckbox } from '../src';

function onChange(e) {
  console.log(e.target.value ? 'checked' : 'not-checked');
}
storiesOf('Checkbox', module).add('default', () => (
  <CoffeeShopeThemeProvider>
    <UncontrolledCheckbox label="Remember me" onChange={onChange} />
  </CoffeeShopeThemeProvider>
));
