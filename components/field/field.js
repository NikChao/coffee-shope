import React, { PureComponent } from 'react';
import styles from './styles.scss';
import { autobind } from 'core-decorators';
import { FieldStatus } from '.';
import Error from './error.svg';

@autobind
class Field extends PureComponent {
  Input () {
    const { type, error, value, onChange, onBlur, onFocus, required, name } = this.props;


    const inputStyles = [
      styles.inputText,
      error ? styles.redInputBorder : styles.defaultInputBorder
    ].join(' ');

    const floatingLabelStyles = [
      styles.floatingLabel,
      value.length && styles.invisible
    ].join(' ');

    return (
      <div className={styles.container}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={inputStyles}
          required={required}
        />
        <span className={floatingLabelStyles}>{name}</span>
        <span
          className={styles.floatingLabelFocus}
          style={{ opacity: value.length ? 1 : undefined }}
        >
          {name}</span>
        {error && (
          <span className={styles.errorInputIcon}>
            <Error />
          </span>
        )}
      </div>
    );
  }

  ErrorStatus () {
    const { errorMessage } = this.props;
    console.log('here', typeof errorMessage)

    return !!errorMessage
      ? typeof errorMessage === 'string'
        ? <FieldStatus error={true}>{errorMessage}</FieldStatus>
        : <span>errorMessage</span>
      : null;
  }

  render () {
    const {
      children,
      className,
      customFieldStatus,
      defaultValue,
      displayStatus,
      error,
      errorMessage,
    } = this.props;

    const { Input, ErrorStatus } = this;
    console.log(styles);
    return (
      <div className={styles.container}>
        <Input />
        <ErrorStatus />
      </div>
    );
  }
}

export default Field;