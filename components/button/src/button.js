import React from 'react';
// import styles from './styles.scss';
const styles = {};

function Button ({ children, disabled, positive, textOnly, onClick, ...restProps }) {
  const styleClass = [
    styles.Button,
    positive ? styles.positive : null,
    textOnly ? styles.textOnly : null
  ].join(' ');

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
