import React from 'react';
import { Consumer } from './grid-context';

export interface Props {
  span: number;
  children: React.ReactElement;
}

export default function Column ({ span, children }: Props) {
  return (
    <Consumer>
      {({ columns }) => (
        <div style={{ width: `${span/columns * 100}%` }}>
          {children}
        </div>
      )}
    </Consumer>
  );
}