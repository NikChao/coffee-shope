import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Animator } from '../src/index';
const { Button } = require('@coffee-shope/button/src');

const BigBox = ({ children }) => (
  <div style={{ height: '300px', width: '100%' }}>
    {children}
  </div>
);

function FadeIn () {
  const [ isOn, setIsOn ] = useState(false);

  const toggle = () => setIsOn(!isOn);
  return (
    <div>
      <button onClick={toggle} type="button">show/hide</button>
      <Animator isOn={isOn} onMount="fade-in" onUnmount="fade-out">
        <p>Hey</p>
      </Animator>
    </div>
  );
}

function SlideIn () {
  const [ isOn, setIsOn ] = useState(false);

  const toggle = () => setIsOn(!isOn);
  return (
    <BigBox>
      <button onClick={toggle} type="button">show/hide</button>
      <Animator isOn={isOn} onMount="slide-in" onUnmount="slide-out">
        <p>Slide</p>
      </Animator>
    </BigBox>
  );
}

storiesOf('Animator', module)
  .add('fade-in-out', () => (
    <FadeIn />
  ))
  .add('slide-down-up', () => (
    <SlideIn />
  ));
