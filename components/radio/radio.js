import React from 'react';
import styles from './styles.scss';

function Radio ({ label, onChange, value }) {
  return (
    <span onClick={e => onChange && onChange({ target: { value: true }})} className={styles.container}>
      <span className={styles.radio}>
        {!!value && <span className={styles.filled} />}
      </span>
      <span className={styles.radioLabel}>{label}</span>
    </span>
  );
}

export { Radio };