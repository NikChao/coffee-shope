import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoffeeShopeThemeProvider } from '@coffee-shope/theme-provider';
import { {{COMPONENT_NAME}} } from '../src';

storiesOf('{{COMPONENT_NAME}}', module)
  .add('default', () => (
    <CoffeeShopeThemeProvider>
      <{{COMPONENT_NAME}} />
    </CoffeeShopeThemeProvider>
  ));
