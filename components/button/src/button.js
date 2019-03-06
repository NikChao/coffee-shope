import React from 'react';
import styled from '@emotion/styled'
import { COLORS } from '@coffee-shope/theme';

const { colorGreenDarkApron, colorTextWhite, colorGreenApron } = COLORS;

const StyledButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: ${props => props.positive ? colorTextWhite : colorGreenDarkApron};
  font-weight: bold;
  background: ${props => !props.textOnly && 'transparent'};
  background-color: ${props => props.positive ? colorGreenDarkApron : props.textOnly && '#fff'};

  border: none;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.textOnly ? 'transparent' : colorGreenDarkApron};
  border-radius: 48px;
  padding: 7px 19px;
  margin-right: 16px;

  &:hover {
    background-color: ${props => !props.disabled && props.positive ? colorGreenApron : `rgba( ${colorGreenDarkApron}, .1 )`};
    transition: 0.25s;
    border-color: ${props => props.positive && colorGreenApron};
  }

  &:active {
    transform: scale(0.95);
    transition: 0.25s;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
`;

function Button ({ children, disabled, onClick, ...restProps }) {
  return (
    <StyledButton 
      onClick={onClick} 
      disabled={disabled}
      {...restProps}
    >
      {children || 'Button'}
    </StyledButton>);
}

export default Button;