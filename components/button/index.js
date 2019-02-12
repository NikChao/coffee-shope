import React from 'react';
import styles from './styles.scss';

function hello () {
  console.log('Hello');
  console.log(styles);
  console.log(styles.Button);
}

function Button ({ children, disabled, positive, textOnly, ...restProps }) {

  const styleArray = [
    styles.Button,
    positive ? styles.positive : null,
    textOnly ? styles.textOnly : null
  ];

  const styleClass = styleArray.join(' ');

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