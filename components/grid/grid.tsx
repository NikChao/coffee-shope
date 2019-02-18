import React, { Component } from 'react';
import { Props as ColumnProps } from './column';
import memoize from 'lodash.memoize';

interface Props {
  width?: string;
  cols?: number
  children: Array<React.ReactElement>
}

type Column = React.ReactElement<ColumnProps>;
type RowArray = Column[][];

const getRows = memoize(function (cols, children): RowArray {
  return children.reduce((rows: RowArray, child:   Column) => {
    if (!rows.length) {
      rows.push([ child ]);
    } else if (rows[rows.length - 1].reduce((p: number, c) => p + c.props.span, 0) + child.props.span <= (cols || 12)) {
      rows[rows.length - 1].push(child);
    } else {
      rows.push ([ child ])
    }
    return rows;
  }, []);
})

export default function Grid ({ cols, width, children }: Props) {
  const rows = getRows(cols, children);

  return (
    <div style={{ width: width || '100%' }}>
      {rows.map(row => (
        <div style={{ display: 'flex' }}>
          {row.map(column => (
            <div style={{ width: `${(column.props.span / (cols || 12)) * 100}%` }}>
              {column}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}