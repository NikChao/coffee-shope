import React from 'react';
import types from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import ErrorIcon from './error-icon.svg';
import THEME from '@coffee-shope/theme';
const styles = {};

const dropInStatus = keyframes`
  0% { transform: translateY(-8px); opacity: 0; }
  100% { transform: translateY(0px); opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  justify-content: inline-flex;
  align-items: center;
  font-size: 14px;
  height: 15px;
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: -3px;
  animation-name: ${dropInStatus};
  animation-duration: 0.5s;
  animation-timing-function: ease;
`;

const ErrorCrossIcon = styled.span`
  padding: 0px;
  margin: 0px;
  height: min-content;
  width: min-content;
  fill: ${THEME.COLORS.colorRed};
  margin-bottom: -4px;
  padding-right: 5px;
  animation-name: field-status-icon-fade-in;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
`;

function FieldStatus({ children }) {
  return (
    <Container>
      <ErrorCrossIcon>
        <ErrorIcon className={styles.errorCrossIconSvg} />
      </ErrorCrossIcon>
      {children}
    </Container>
  );
}

FieldStatus.propTypes = {
  children: types.any,
  className: types.string,
  error: types.any,
};

export default FieldStatus;
