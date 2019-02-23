import React from 'react';
import { storiesOf } from '@storybook/react';
import { Float } from '../index';

function click () {
  console.log('click');
}

function lotsOfText () {
  return [...Array(128)].map(() => 'asdf').join(' ');
}

storiesOf('Float', module)
  .add('default', () => (
    <Float width="200px" onClick={click} text="This is a floating button" />
  ))
  .add('circular', () => (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{ padding: '20px' }}>
        <Float circular onClick={click} text="+" />    
      </div>
      <div style={{ padding: '20px' }}>
        <Float circular loading onClick={click}/>    
      </div>
      <div style={{ padding: '20px' }}>
        <Float circular disabled onClick={click} text="+" />    
      </div>
    </div>
  ))
  .add('absolute', () => (
    <div style={{ width: '200px', height: '300px', position: 'absolute' }}>
      <div style={{ position: 'absolute', height: '100%', width: '100%', overflow: 'auto' }}>
        <span style={{ position: 'absolute', width: '100%', display: 'flex', flexWrap: 'wrap', overflow: 'scroll' }}>
          {lotsOfText()}
        </span>
      </div>
      <Float bottomRight circular onClick={click} text="+" />
    </div>
  ))
  .add('disabled', () => (
    <Float onClick={click} text="nuh-uh" disabled />
  ));