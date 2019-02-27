import React, { PureComponent } from 'react';
import styles from './styles.scss';

interface Props {
  children: Array<React.ReactElement>;
}

function Animator(props: Props) {
  return (
    <span className={styles.container}>
      {props.children[0]}
    </span>
  );
}

export { Animator };
