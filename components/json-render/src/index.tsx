import React, { useState } from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  padding: 2px;
`;

interface Props {
  json?: object | string;
  children?: object | string;
}

function isValidJSON (json: string) {
  return /^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@')
    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
}

function validate (json?: string) {
 if (!json || !isValidJSON(json)) {
   throw new Error('Invalid JSON string');
 }

 return json;
}

function makePrettyJson(json: string) {
  let currentIndent = '';
  let currentRow = '';
  const rows = [] as React.ReactNode[];

  function pushRow () {
    rows.push(<pre>{currentRow}</pre>)
    currentRow = '';
  } 

  for (const char of json) {
    let hasAdded = false;
    if (char === '{') {
      currentRow += char;
      hasAdded = true;
      currentIndent += '    ';
      pushRow();
      currentRow += currentIndent;
    }
    if (char === ',') {
      currentRow += char;
      hasAdded = true;
      pushRow();
      currentRow += currentIndent;
    }
    if (char === '}') {
      currentIndent = currentIndent.slice(0, currentIndent.length - 4);
      pushRow();
      currentRow += currentIndent;
    }
    if (!hasAdded) {
      currentRow += char;
    }

    if (char === ':') {
      currentRow += ' '; 
    }
  }

  rows.push(currentRow);
  return rows;
}

const JsonRender = (props: Props) => {
  const initial = props.children || props.json || '';

  const json = typeof initial === 'object'
    ? JSON.stringify(initial)
    : validate(initial);

  const prettyJson = makePrettyJson(json);

  return (
    <StyledDiv>
      {prettyJson}
    </StyledDiv>
  );
}

export { JsonRender };