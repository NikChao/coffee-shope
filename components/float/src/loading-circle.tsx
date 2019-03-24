import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { Props } from './index';

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
50% {
    transform: rotate(270deg);
}
100% {
    transform: rotate(1turn);
}
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
      opacity: 1;
  }
`;

const LoadingSpinner = styled.div<Props>`
  margin: auto;
  border: 3px solid hsla(0,0%,100%,.2);
  border: 2px solid hsla(0,0%,100%,.2);
  border-right: 3px solid #fff;
  border-right: 2px solid #fff;
  width: 75%;
  height: 75%;
  border-radius: 500px;
  width: 50px;
  height: 50px;
  animation-name: ${spin}, ${fade};
  animation-duration: 0.75s, 0.1s;
  animation-timing-function: linear, ease;
  animation-delay: 0s, 0s;
  animation-iteration-count: infinite, 1;
  animation-direction: normal, normal;
  animation-fill-mode: none, none;
  animation-play-state: running, running;
  opacity: ${props => props.loading ? '1' : '0'}
`;

export { LoadingSpinner };