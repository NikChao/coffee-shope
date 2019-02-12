import React, { Component } from 'react';
import { autobind } from 'core-decorators';

import styles from './styles.scss';

@autobind
class Ripple extends Component {
  state = {
    ripple: null
  }

  cn = `${styles.ripple} ${this.props.dark ? styles.dark : styles.light}`

  componentDidMount () {
    if (typeof this.props.children !== 'function') {
      throw new Error ('Ripple takes a function as children.');
    }
  }

  Ripple () {
    const { ripple } = this.state;
    if (!ripple) {
      return null;
    }

    const { id, left, top } = ripple;

    return <span style={{ left: `${left}px`, top: `${top}px` }} key={id} className={this.cn} />;
  }

  removeRipple (id) { 
    setTimeout(
      () => {
        if (this.state.ripple.id === id) {
          this.setState({ ripple: null })
        }
      }
      , 1500
    );
  }

  onClick (event) {
    const id = Date.now();

    this.setState({
      ripple: {
        id,
        left: event.nativeEvent.offsetX,
        top: event.nativeEvent.offsetY
      }
    }, () => this.removeRipple(id));
  }

  getEventHandlers () {
    return { onClick: this.onClick };
  }

  mergeEventHandlers (eventHandlers) {
    const { onClick, ...rest } = eventHandlers;
    const onClickRipple = this.onClick;

    return {
      ...rest,
      onClick (event) {
        if (typeof onClick === 'function') {
          onClick(event);
        }
        onClickRipple(event);
      }
    }
  }

  render () {
    const eventHandlers = this.getEventHandlers();
    const mergeEventHandlers = this.mergeEventHandlers
    const ripple = <this.Ripple />;

    return (
      <div>
        {this.props.children({ ripple, eventHandlers, mergeEventHandlers })}
      </div>
    );
  }
}

export { Ripple };