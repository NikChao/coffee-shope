import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoffeeShopeThemeProvider } from '@coffee-shope/theme-provider';
import { Button, LargeButton } from '../src';

const click = () => console.log('click!');

storiesOf('Button', module)
  .add('default', () => (
    <CoffeeShopeThemeProvider>
      <Button onClick={click} >Click Me</Button>
      <Button onClick={click} disabled >Click Me</Button>
    </CoffeeShopeThemeProvider>
  ))
  .add('positive', () => (
    <CoffeeShopeThemeProvider>
      <Button onClick={click} positive>Click Me</Button>
      <Button onClick={click} positive disabled >Click Me</Button>
    </CoffeeShopeThemeProvider>
  ))
  .add('text only', () => (
    <CoffeeShopeThemeProvider>
      <Button onClick={click} textOnly>Click Me</Button>
      <Button onClick={click} textOnly disabled >Click Me</Button>
    </CoffeeShopeThemeProvider>
  ))
  .add('large button', () => (
    <CoffeeShopeThemeProvider>
      <div style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <LargeButton onClick={click} positive textOnly>Large Clicky Boi</LargeButton>
        <LargeButton onClick={click} positive small textOnly>Large Clicky Boi</LargeButton>
        <LargeButton onClick={click} textOnly>Large Clicky Boi</LargeButton>
        <LargeButton onClick={click} small textOnly>Large Clicky Boi</LargeButton>
      </div>
    </CoffeeShopeThemeProvider>
  ));