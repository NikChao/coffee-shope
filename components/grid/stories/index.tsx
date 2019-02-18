import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Column } from '../index.tsx';

function Padded({ bg }: { bg: string }) {
  return <div style={{ height: '100px', backgroundColor: bg }} />
}

storiesOf('Grid', module)
  .add('default', () => (
    <Grid cols={12}>
      <Column span={6}>
        <Padded bg='coral' />
      </Column>
      <Column span={6}>
        <Padded bg='lavender' />
      </Column>
      <Column span={3}>
        <Padded bg='aquamarine' />        
      </Column>
      <Column span={6}>
        <Padded bg='magenta' />      
      </Column>
      <Column span={3}>
        <Padded bg='cyan' />
      </Column>
      <Column span={4}>
        <Padded bg='goldenrod' />
      </Column>
      <Column span={8}>
        <Padded bg='lightseagreen' />
      </Column>
    </Grid>
  ));