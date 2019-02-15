import React from 'react';
import { storiesOf } from '@storybook/react';
import { Radio, RadioGroup } from '../';

storiesOf('Radio', module)
  .add('default', () => (
    <div>
      <Radio label='Radio button' />
    </div>
  ))
  .add('radio group', () => (
    <RadioGroup>
      <Radio label='a' value={false} onChange={_ => _} />
      <Radio label='b' value={false} onChange={_ => _} />
      <Radio label='c' value={false} onChange={_ => _} />
    </RadioGroup>
  ));