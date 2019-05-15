import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import Downshift from 'downshift';

const Label = styled.label`
  padding-top: 10px;
  padding-right: 10px;
`;

const Li = styled.li`
  cursor; pointer;
  decoration: none;
  padding: 10px 10px;
  width: 100%;
  &:hover {
    background-color: whitesmoke;
    transition: 0.25s;
  }
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
  padding: 10px 10px;
  border: none;
  border-bottom: 1px solid green;
  outline: none;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface Option {
  value: any;
  [key: string]: any;
}

interface Props {
  initialOptions: Option[];
  options: Option[];
  onSelect: (e: any) => any;
  label?: string;
  placeholder?: string;
}

function Dropdown(props: Props) {
  let isMounted = false;
  const { options, label, initialOptions, placeholder } = props;
  const [open, setOpen] = useState(false);
  const [hasFiltered, setHasFiltered] = useState(false);

  useEffect(() => {
    isMounted = true;
    return () => {
      isMounted = false;
    };
  });

  function optionFilter(searchTerm: any, item: Option) {
    return !searchTerm || item.value.includes(searchTerm);
  }

  function toggle() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  function onSelect(e: any) {
    toggle();
    props.onSelect(e);
  }

  function onInputChange() {
    setHasFiltered(true);
  }

  return (
    <Downshift onChange={onSelect} itemToString={item => (item ? item.value : '')}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <Container {...getRootProps()} onBlur={close}>
          {label && <Label {...getLabelProps()}>{label}</Label>}
          <div style={{ width: '100%' }}>
            <Input
              placeholder={placeholder}
              onClick={toggle}
              {...getInputProps({
                onChange: onInputChange,
              })}
            />
            <Ul {...getMenuProps()}>
              {!hasFiltered &&
                open &&
                initialOptions.map((item, index) => (
                  <Li
                    {...getItemProps({
                      key: item.value,
                      index: index + options.length,
                      item,
                    })}
                  >
                    {item.value}
                  </Li>
                ))}
              {isOpen
                ? [
                  ...options
                    .concat(initialOptions)
                    .filter(item => optionFilter(inputValue, item))
                    .map((item, index) => (
                      <Li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                        })}
                      >
                        {item.value}
                      </Li>
                    )),
                ]
                : null}
            </Ul>
          </div>
        </Container>
      )}
    </Downshift>
  );
}

export { Dropdown };
