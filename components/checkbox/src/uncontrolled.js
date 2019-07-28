import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import types from 'prop-types';

import Check from './check.svg';

const Container = styled.span`
  display: flex;
  justify-content: flex-start;
`;

const NoFlexShrink = styled.span``;

const Label = styled.span`
  padding-top: 2px;
  padding-left: 10px;
  font-size: 14px;
  min-width: 0;
`;

const OptionLabelMarker = styled.span`
  border: 1px solid #008248;
  border-radius: 25%;
  color: transparent;
  width: 22px;
  height: 22px;
  display: block !important;
  background-color: ${props => props.check && '#008248'};
`;

const optionLabelMarkerExpansion = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
      transform: scale(1);
  }
`;
const CheckboxAnimator = styled.span`
  position: absolute;
  animation-name: ${optionLabelMarkerExpansion};
  animation-timing-function: cubic-bezier(0.32, 2.32, 0.61, 0.27);
  animation-direction: forwards;
  animation-duration: 0.3s;
  fill: white;
`;

function Checkbox({ label, value, onChange }) {
  function toggle() {
    if (typeof onChange === 'function') {
      const syntheticEvent = {
        target: { value: !value },
      };
      onChange(syntheticEvent);
    }
  }

  return (
    <Container onClick={toggle}>
      <NoFlexShrink>
        <OptionLabelMarker check={value}>
          {value && (
            <CheckboxAnimator>
              <Check />
            </CheckboxAnimator>
          )}
        </OptionLabelMarker>
      </NoFlexShrink>
      {label && <Label>{label}</Label>}
    </Container>
  );
}

Checkbox.propTypes = {
  label: types.string,
  onChange: types.func,
  value: types.bool,
};

export default Checkbox;
