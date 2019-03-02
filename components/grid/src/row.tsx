import React from 'react';
import { Consumer } from './grid-context';

export interface Props {
  justifyContent?: string;
  children: React.ReactElement | React.ReactElement[];
}

export default function Row ({ children, justifyContent }: Props) {
  justifyContent = justifyContent || 'flex-start';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent, width: '100%' }}>
      {children}
    </div>
  );
}