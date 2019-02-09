import React from 'react';
import styles from './styles.scss';

function hello () {
  console.log('Hello');
  console.log(styles);
  console.log(styles.Button);
}

function Button ({ text }) {

  return (
    <button 
      onClick={hello} 
      className={styles.Button}
    >
      {text || 'Button'}
    </button>);
}

export { Button };