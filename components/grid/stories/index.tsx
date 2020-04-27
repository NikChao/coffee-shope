import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoffeeShopeThemeProvider } from '@coffee-shope/theme-provider';
import { Grid, Row, Column } from '../src/index';

function Padded({ bg, height }: { bg: string; height?: number }) {
  const h = !!height ? `${height}px` : '100%';
  return <div style={{ height: h || '100%', backgroundColor: bg }} />;
}

storiesOf('Grid', module)
  .add('default', () => (
    <CoffeeShopeThemeProvider>
      <Grid cols={12}>
        <Column span={6}>
          <Padded height={100} bg="coral" />
        </Column>
        <Column span={6}>
          <Padded bg="lavender" />
        </Column>
        <Column span={3}>
          <Padded height={300} bg="aquamarine" />
        </Column>
        <Column span={6}>
          <Padded bg="magenta" />
        </Column>
        <Column span={3}>
          <Padded bg="cyan" />
        </Column>
        <Column span={4}>
          <Padded bg="goldenrod" />
        </Column>
        <Column span={8}>
          <Padded height={200} bg="lightseagreen" />
        </Column>
      </Grid>
    </CoffeeShopeThemeProvider>
  ))
  .add('with rows', () => (
    <CoffeeShopeThemeProvider>
      <Grid cols={12}>
        <Row justifyContent="center">
          <Column span={8}>
            <Padded height={100} bg="coral" />
          </Column>
        </Row>
        <Row>
          <Column span={3}>
            <Padded height={100} bg="crimson" />
          </Column>
          <Column span={6}>
            <Padded height={100} bg="navy" />
          </Column>
          <Column span={3}>
            <Padded height={100} bg="goldenrod" />
          </Column>
        </Row>
      </Grid>
    </CoffeeShopeThemeProvider>
  ));
