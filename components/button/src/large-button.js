import React from 'react';
import styles from './styles.scss';

function LargeButton ({ children, disabled, positive, small, onClick, ...restProps }) {
  const styleArray = [
    styles.LargeButton,
    !positive && styles.negative,
    small && styles.sml
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

export default LargeButton;