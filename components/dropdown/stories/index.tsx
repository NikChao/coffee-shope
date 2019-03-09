import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { Dropdown } from '../src/index';

const Container = styled.div`
  width: 370px;
`;

const fruit = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]

function select (e) {
  alert(`You picked ${e.value}`);
}

storiesOf('Dropdown', module)
  .add('default', () => (
    <Container>
      <Dropdown
        options={fruit}
        onSelect={select}
      />
    </Container>
  ));
