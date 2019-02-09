import React from 'react';

function Button ({ text, onClick }) {
  return (
  <button onClick={onClick}>
    {text || 'Button'}
  </button>
}

export { Button };