import React from 'react';

export default function Row ({ children }) {
  return <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '20px' }}>{children}</div>;
}

export function Feat ({ children }) {
  return <div style={{ paddingRight: '20px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>{children}</div>
}