import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Column } from '../index.tsx';

function Padded({ bg, height }: { bg: string, height?: number }) {
  const h = !!height ? `${height}px` : '100%';
  console.log(h);
  return <div style={{ height: h || '100%', backgroundColor: bg }} />
}

storiesOf('Grid', module)
  .add('default', () => (
    <Grid cols={12}>
      <Column span={6}>
        <Padded height={100} bg='coral' />
      </Column>
      <Column span={6}>
        <Padded bg='lavender' />
      </Column>
      <Column span={3}>
        <Padded height={300} bg='aquamarine' />
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
        <Padded height={200} bg='lightseagreen' />
      </Column>
    </Grid>
  ));