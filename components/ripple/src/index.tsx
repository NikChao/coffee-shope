import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import mergeEventHandlers from '@coffee-shope/merge-event-handlers';

import styles from './styles.scss';

interface RenderProps {
  ripple: React.ReactElement;
  eventHandlers: { onClick: (e: any) => void };
  mergeEventHandlers: (old: object) => object;
}

interface Props {
  dark?: boolean;
  children: ({ ripple, eventHandlers, mergeEventHandlers }: RenderProps) => React.ReactElement;
}

interface State {
  ripple: null | { id: number, left: number, top: number };
}

@autobind
class Ripple extends PureComponent<Props, State> {
  state: State = {
    ripple: null
  };

  isMounted = false;

  cn = `${styles.ripple} ${this.props.dark ? styles.dark : styles.light}`

  componentDidMount () {
    if (typeof this.props.children !== 'function') {
      throw new Error ('Ripple takes a function as children.');
    }
    this.isMounted = true;
  }

  componentWillUnmount () {
    this.isMounted = false;
  }

  Ripple () {
    const { ripple } = this.state;

    if (!ripple) {
      return null;
    }

    const { id, left, top } = ripple;

    return <span style={{ left: `${left}px`, top: `${top}px` }} key={id} className={this.cn} />;
  }

  removeRipple (id: number) {

    setTimeout(
      () => {
        const { ripple } = this.state;

        if (!this.isMounted || !ripple ) {
          return;
        }

        if (ripple.id === id) {
          this.setState({ ripple: null });
        }
      }
      , 1500
    );
  }

  onClick (event: any) {
    const id = Date.now();
    this.setState({
      ripple: {
        id,
        left: event.nativeEvent.offsetX - event.target.offsetLeft,
        top: event.nativeEvent.offsetY - event.target.offsetTop
      }
    }, () => this.removeRipple(id));
  }

  getEventHandlers () {
    return { onClick: this.onClick };
  }


  render () {
    const ripple = <this.Ripple />;
    const eventHandlers = this.getEventHandlers();

    return (
      <div>
        {this.props.children({
          ripple,
          eventHandlers,
          mergeEventHandlers: mergeEventHandlers(eventHandlers)
        })}
      </div>
    );
  }
}

export { Ripple };