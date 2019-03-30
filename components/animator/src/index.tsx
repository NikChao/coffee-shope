import React, { useState, Fragment } from 'react';
import { useTransition, animated } from 'react-spring'
import { getSpringConfig } from './keyframes';

interface Props {
  isOn: boolean;
  onMount?: string;
  onUnmount?: string;
  children: JSX.Element | JSX.Element[]
}

function Animator ({ onMount, onUnmount, children, isOn }: Props) {
  const transitions = useTransition(isOn, null, getSpringConfig({ onMount, onUnmount }))

  return transitions.map(({ item, key, props }) =>
    item ? <animated.div key={key} style={props}>{children}</animated.div> : <Fragment />
  );
}

export { Animator };