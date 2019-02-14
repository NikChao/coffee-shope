import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Field } from '../';

function SmallForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailErrorMessage = true
    && 'Invalid email.'

  return (
    <div>
      <Field name='Email' value={email} onChange={e => setEmail(e.target.value)} errorMessage={emailErrorMessage} error/>
      <Field name='Password' type="password" value={password} onChange={e => setPassword(e.target.value)}  />
    </div>
  )
}

storiesOf('Field', module)
  .add('default', () => (
    <SmallForm />
  ));