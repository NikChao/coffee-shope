import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { Animator } from '../index';
import { Float } from '@coffee-shope/float';

class Example extends PureComponent {

  constructor (props) {
    super(props);
    this.next = this.next.bind(this);
  }

  messages = ['hey', 'ho', 'lets', 'go'];

  state = {
    step: 0
  }

  next() {
    const step = this.state.step >= (this.messages.length - 1)
      ? 0
      : this.state.step + 1;

    this.setState({
      step
    });
  }

  render () {
    const components = this.messages
      .filter((msg, index) => index === this.state.step)
      .map(msg => <Float onClick={this.next} text={msg} />);

    return (
      <Animator>
        {components}
      </Animator>
    );
  }
}

storiesOf('Animator', module)
  .add('default', () => {
    return <Example />
  });