import React from 'react';

function hello () {
  console.log('Hello');
}

function Button ({ text }) {
  return <button onClick={hello}>{text || 'Button'}</button>
}

export { Button };