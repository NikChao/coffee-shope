import React, { PureComponent } from 'react';
import styles from './styles.scss';

class {{COMPONENT_NAME}} extends PureComponent {
  render () {
    return <span className={styles.container}>Hello, {{TEMPLATE_NAME}}</span>;
  }
}

export { {{COMPONENT_NAME}} };