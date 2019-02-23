import React, { PureComponent, ReactElement } from 'react';
import styles from './styles.scss';
import { Ripple } from '@coffee-shope/ripple'; 
import { LoadingSpinner } from './loading-circle';

interface Props {
  onClick: (e: any) => any;
  mini?: boolean;
  circular?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  width?: string;
  text?: string;
  bottomRight?: boolean;
}

interface State {

}

class Float extends PureComponent<Props, State> {
  className = [
    styles.float,
    this.props.disabled && styles.disabled,
    this.props.mini && styles.mini,
    this.props.loading && styles.loading,
    this.props.className,
  ].join(' ')

  width = this.props.circular
    ? undefined
    : this.props.width || 'min-content';

  padding = this.props.circular
    ? this.props.loading
    ? '5px'
    : undefined
    : undefined;

  positioning: React.CSSProperties = this.props.bottomRight
    ? { position: 'relative', width: '100%', height: '100%', right: '0', paddingTop: '85%' }
    : {};

  render () {
    const {
      onClick,
      disabled,
      loading,
      text
    } = this.props;

    return (
      <div style={this.positioning}>
      <Ripple>
        {({ ripple, mergeEventHandlers }) => (
          <button
            {...mergeEventHandlers({ onClick })}
            className={this.className} disabled={disabled}
            style={{
              width: this.width,
              padding: this.padding,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {!disabled && !loading && ripple}
            {loading && <LoadingSpinner />}
            {text}
          </button>
        )}
      </Ripple>
      </div>
    );
  }
}

export { Float };