import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { CoffeeShopeThemeProvider } from '@coffee-shope/theme-provider';
import { Field } from '../src';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SmallForm() {
  const [email, setEmailState] = useState('');
  const [hasBlurred, blur] = useState(false);
  const [password, setPassword] = useState('');

  const emailErrorMessage = hasBlurred && !!email && !emailRegex.test(email) && 'Invalid email.';

  function setEmail(e) {
    setEmailState(e.target.value);
    if (!e.target.value.length) {
      blur(false);
    }
  }

  return (
    <CoffeeShopeThemeProvider>
      <div style={{ width: '600px' }}>
        <div style={{ height: '65px' }}>
          <Field
            onBlur={() => blur(true)}
            name="Email"
            darkBorder
            value={email}
            onChange={setEmail}
            errorMessage={emailErrorMessage}
            error={!!emailErrorMessage}
          />
        </div>
        <Field
          darkBorder
          name="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
    </CoffeeShopeThemeProvider>
  );
}

storiesOf('Field', module).add('default', () => <SmallForm />);
