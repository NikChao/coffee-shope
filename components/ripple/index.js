import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import mergeEventHandlers from '@coffee-shope/merge-event-handlers';
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