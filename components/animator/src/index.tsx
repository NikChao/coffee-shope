import React, { useState, Fragment } from 'react';
import { useTransition, animated } from 'react-spring'
import { getSpringConfig } from './keyframes';

type InAnimations = 'fade-in' | 'slide-in';
type OutAnimations = 'fade-out' | 'slide-out';

interface Props {
  isOn: boolean;
  onMount?: InAnimations;
  onUnmount?: OutAnimations;
  children: JSX.Element | JSX.Element[]
}

function Animator ({ onMount, onUnmount, children, isOn }: Props) {
  const transitions = useTransition(isOn, null, getSpringConfig({ onMount, onUnmount }))

  return transitions.map(({ item, key, props }) =>
    item ? <animated.div key={key} style={props}>{children}</animated.div> : <Fragment />
  );
}

export { Animator };