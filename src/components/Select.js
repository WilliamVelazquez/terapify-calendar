/* eslint-disable react/jsx-indent-props */
import React from 'react';
import styled from 'styled-components';
import { errorInputShadow } from '../styled/mixins';

const MainContainer = styled.div`
  /* width: 100%; */
  display: flex;
  margin-left: 5px;
  flex-direction: column;
  justify-content: center;
`;

const SelectContainer = styled.div`
  /* width: 100%; */
  display: flex;
  position: relative;
  flex-direction: row;
`;

const InputSelect = styled.select`
  /* width: 100%; */
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  padding-top: 3px;
  padding-bottom: 2px;
  border-bottom: 2px solid #041B2D;
  ${(props) => props.withError && errorInputShadow}
  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
  &:disabled {
    cursor: not-allowed;
    border-radius: 6px 6px 0px 0px;
    background-color: rgba(0, 133, 255, 0.15);
  }
`;

const Option = styled.option`
  font-size: 12px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

const Select = (props) => {
  const { id = null, name, type = 'select', value = '', placeholder = '', onChange = null, required = null, disabled = null, withError = null, data = [], dataId = 'id', dataText = 'text' } = props;
  return (
    <MainContainer>
      <SelectContainer>
        <InputSelect
          id={id || name}
          name={name}
          type={type}
          value={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          withError={withError}
        >
          {
            placeholder ? (
            <Option
              value=''
              disabled
              defaultValue
            >
              { placeholder }
            </Option>
            ) : (
              <Option value='' disabled defaultValue>
                -- Seleccione --
              </Option>
            )
          }
          {
            data &&
            data.map(item => {
              return (
                <Option key={item[dataId]} value={item[dataId]}>
                  {item[dataText] ? item[dataText] : ''}
                </Option>
              );
            })
          }
        </InputSelect>
      </SelectContainer>
    </MainContainer>
  );
};

export default Select;
