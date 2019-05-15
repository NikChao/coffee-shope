import React from 'react';

interface ContextT {
  columns: number;
}

const { Provider, Consumer } = React.createContext<ContextT>({ columns: 12 });

export { Provider, Consumer };
