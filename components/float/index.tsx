import React, { PureComponent } from 'react';
import styles from './styles.scss';

interface Props {

}

interface State {

}

class Float extends PureComponent<Props, State> {
  render () {
    return <span className={styles.container}>Hello, float</span>;
  }
}

export { Float };