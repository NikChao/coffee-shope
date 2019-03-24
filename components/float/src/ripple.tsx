import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import mergeEventHandlers from '@coffee-shope/merge-event-handlers';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { any } from 'prop-types';


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

const rippleAnimation = keyframes`
  0% {
    opacity: .5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(50);
  }
`;

const RippleSpan = styled.span<{ left: number, top: number, dark?: boolean }>`
  position: absolute!important;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  animation: ${rippleAnimation} 1.2s ease;
  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};
  background-color: ${props => props.dark ? 'rgba(0,0,0,.5)!important' : '#fff!important'}
`;

@autobind
class Ripple extends Component<Props, State> {
  state: State = {
    ripple: null
  };

  isRippleMounted = false;

  componentDidMount () {
    if (typeof this.props.children !== 'function') {
      throw new Error ('Ripple takes a function as children.');
    }
    this.isRippleMounted = true;
  }

  componentWillUnmount () {
    this.isRippleMounted = false;
  }

  Ripple () {
    const { ripple } = this.state;
    const { dark } = this.props;

    if (!ripple) {
      return null;
    }

    const { id, left, top } = ripple;

    return (
      <span key={id}>
        <RippleSpan dark={dark} left={left} top={top} />
      </span>
    );
  }

  removeRipple (id: number) {

    setTimeout(
      () => {
        const { ripple } = this.state;

        if (!this.isRippleMounted || !ripple ) {
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

export { Ripple }