import React, { PureComponent } from 'react';
import styles from './styles.scss';

interface Props {

}

interface State {

}

class Grid extends PureComponent<Props, State> {
  render () {
    return <span className={styles.container}>Hello, grid</span>;
  }
}

export { Grid };