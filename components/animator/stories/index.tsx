import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Animator } from '../src/index';
import { Button } from '@coffee-shope/button';

function Wizard () {
  const [ step, setStep ] = useState(0);
  const next = () => setStep(step === 3
    ? 0
    : step + 1);

  const components = ['Hey', 'Ho', 'Lets', 'Go']
    .map(msg => <Button onClick={next}>{msg}</Button>)[step];
  return (
    <Animator>
      {components}
    </Animator>
  )
}

storiesOf('Animator', module)
  .add('default', () => (
    <Wizard />
  ));
