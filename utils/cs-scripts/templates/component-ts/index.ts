import React, { PureComponent } from 'react';
import styles from './styles.scss';

interface Props {

}

interface State {

}

class {{COMPONENT_NAME}} extends PureComponent<Props, State> {
  render () {
    return <span className={styles.container}>Hello, {{TEMPLATE_NAME}}</span>;
  }
}

export { {{COMPONENT_NAME}} };