import React from 'react';
// import styles from './styles.scss';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import ErrorIcon from './error-icon.svg';
const styles = {};

const Container = styled.div`
    padding-left: 5px;
    display: flex;
    justify-content: inline-flex;
    align-items: center;
    font-size: 14px;
    height: 15px;
    margin-bottom: 5px;
    animation-name: drop-in-status;
    animation-duration: .5s;
    animation-timing-function: ease;
`;

function FieldStatus ({ children, className, error }) {
  return (
    <div className={styles.fieldStatusContainer}>
      <span className={styles.errorCrossIcon}>
        <ErrorIcon className={styles.errorCrossIconSvg} />
      </span>
      {children}
    </div>
  )
}

export default FieldStatus;