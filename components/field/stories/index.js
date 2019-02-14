import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Field } from '../';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SmallForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailErrorMessage = !!email && !emailRegex.test(email)
    && 'Invalid email.'

  return (
    <div>
      <Field name='Email' value={email} onChange={e => setEmail(e.target.value)} errorMessage={emailErrorMessage} error={!!emailErrorMessage}/>
      <Field name='Password' type="password" value={password} onChange={e => setPassword(e.target.value)}  />
    </div>
  )
}

storiesOf('Field', module)
  .add('default', () => (
    <SmallForm />
  ));