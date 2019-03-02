import React, { ComponentType, PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.scss';

interface Props {

}

const Animator: React.FunctionComponent<Props> =
  ({ children }) => {
    return (
      <div>
        <CSSTransition
          classNames={{
            appearActive: styles['appear-active'],
            enter: styles.enter,
            enterActive: styles['enter-active'],
            exit: styles.exit,
            exitActive: styles['exit-active']
          }}
          unMountOnExist
        >
          {children}
        </CSSTransition>
      </div>
    );
  }

export { Animator };