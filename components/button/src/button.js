import React from 'react';
import styles from './styles.scss';

function Button ({ children, disabled, positive, textOnly, onClick, ...restProps }) {
  const styleArray = [
    styles.Button,
    positive ? styles.positive : null,
    textOnly ? styles.textOnly : null
  ];

  const styleClass = styleArray.join(' ');

  return (
    <button 
      onClick={onClick} 
      className={styleClass}
      disabled={disabled}
      {...restProps}
    >
      {children || 'Button'}
    </button>);
}

export default Button;