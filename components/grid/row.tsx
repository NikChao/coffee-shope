import React from 'react';
import { Consumer } from './grid-context';

export interface Props {
  children: React.ComponentType;
}

export default function Row ({ children }: Props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {children}
    </div>
  );
}