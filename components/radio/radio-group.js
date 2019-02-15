import React, { useState } from 'react';
import styles from './styles.scss';
import { Radio } from './radio';

function RadioGroup ({ children }) {
  const [ values, setValues ] = useState(children.map(c => c.props.value))

  return (
    <div>
      {children}
    </div>
  );
}

export default RadioGroup;