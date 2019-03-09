import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import Downshift from 'downshift'

const Li = styled.li`
  cursor; pointer;
  decoration: none;
`;

const Ul = styled.ul`
  list-style-type: none;
  cursor: pointer;
  padding-left: 0;
  margin-top: 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const slideIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`;

interface Option {
  value: any;
  [key: string]: any;
}

interface Props {
  options: Option[];
  onSelect: (e: any) => any;
  label?: string;
}

const Dropdown = (props: Props) => {
  const { options, onSelect, label } = props;

  return (
    <Downshift
      onChange={onSelect}
      itemToString={item => (item ? item.value : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
          <div style-={{ width: '100%' }}>
            {label && <label {...getLabelProps()}>{label}</label>}
            <Input {...getInputProps()} />
            <Ul {...getMenuProps()}>
              {isOpen
                ? options
                  .filter(item => !inputValue || item.value.includes(inputValue))
                  .map((item, index) => (
                    <Li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.value}
                    </Li>
                  ))
                : null}
            </Ul>
          </div>
        )}
    </Downshift>
  );
}

export { Dropdown };