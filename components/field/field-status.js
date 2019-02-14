import React from 'react';
import styles from './styles.scss';
import ErrorIcon from './error-icon.svg';

function FieldStatus ({ children, className, error }) {
  return (
    <div className={styles.fieldStatusContainer}>
      <span className={styles.errorCrossIcon}>
        <ErrorIcon />
      </span>
      {children}
    </div>
  )
}

export default FieldStatus;