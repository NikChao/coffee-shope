import React from 'react';
import { Provider } from './grid-context';

interface Props {
  width?: string;
  cols?: number
  children: Array<React.ReactElement>
}

export default function Grid ({ cols, width, children }: Props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: width || '100%' }}>
      <Provider value={{ columns: cols || 12 }}>
        {children}
      </Provider>
    </div>
  )
}