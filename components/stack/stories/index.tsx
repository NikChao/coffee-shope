import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoffeeShopeThemeProvider } from '@coffee-shope/theme-provider';
import { Stack } from '../src/index';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('Stack', module).add('default', () => {
  const padding = text('padding');
  return (
    <CoffeeShopeThemeProvider>
      <Stack padding={padding}>
        <span>First item</span>
        <span>Second item</span>
        <span>Third item</span>
      </Stack>
    </CoffeeShopeThemeProvider>
  );
});
