import React from 'react';
import { storiesOf } from '@storybook/react';
import { Float } from '../';

function click () {
  console.log('click');
}

function lotsOfText () {
  return `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;
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
      <Float bottomRight circular onClick={click} text="+" />      
      <div style={{ position: 'absolute', height: '100%', width: '100%', overflow: 'auto' }}>
        <span style={{ position: 'absolute', width: '100%', display: 'flex', flexWrap: 'wrap', overflow: 'scroll' }}>
          {lotsOfText()}
        </span>
      </div>
    </div>
  ))
  .add('disabled', () => (
    <Float onClick={click} text="nuh-uh" disabled />
  ));
