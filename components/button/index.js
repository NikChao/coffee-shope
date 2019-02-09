import React from 'react';
import styles from './styles.scss';

function hello () {
  console.log('Hello');
  console.log(styles);
  console.log(styles.Button);
}

function Button ({ children, disabled, ...restProps }) {

  const styleClass = styles.Button;

  return (
    <button 
      onClick={hello} 
      className={styleClass}
      disabled={disabled}
      {...restProps}
    >
      {children || 'Button'}
    </button>);
}

export { Button };