import React from 'react';

export interface Props {
  span: number;
  children: React.ComponentType;
}

export default function Column ({ children }: Props) {
  return (
    <div style={{ height: '100%' }}>{children}</div>
  );
}