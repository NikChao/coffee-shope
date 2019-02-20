import React, { PureComponent, ReactElement } from 'react';
import styles from './styles.scss';
const { Ripple } = require('@coffee-shope/ripple');

interface Props {
  onClick: (e: any) => any;
  mini?: boolean;
  circular?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  text?: string;
}

interface State {

}

class Float extends PureComponent<Props, State> {
  className = [
    styles.float,
    this.props.disabled && styles.disabled,
    this.props.mini && styles.mini,
    this.props.loading && styles.loading,
    this.props.circular && styles.circular,
    this.props.className,
  ].join(' ')

  render () {
    const {
      onClick,
      className,
      disabled,
      text
    } = this.props;

    return (
      <Ripple>
        {({ ripple, mergeEventHandlers }) => (
          <button {...mergeEventHandlers({ onClick })} className={this.className} disabled={disabled}>
            {!disabled && ripple}
            {text}
          </button>
        )}
      </Ripple>
    );
  }
}

export { Float };