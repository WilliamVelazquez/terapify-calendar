/* eslint-disable react/jsx-indent-props */
import React from 'react';
import styled from 'styled-components';
import EyeIcon from './EyeIcon';
import useToggle from '../hooks/useToggle';
import { errorInputShadow } from '../styled/mixins';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  margin-bottom: 4px;
  font-size: 14px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
`;

const Input = styled.input`
  width: 100%;
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

const CustomEyeIcon = styled(EyeIcon)`
  cursor: pointer;
  margin: 5px -30px;
`;

const LabelInput = ({ id = null, label = '', name, type = null, value = '', autoComplete = null, pattern = null, placeholder = '', onChange = null, required = null, disabled = null, withError = null, blocked = true }) => {
  const [isBlocked, toggleIsBlocked] = useToggle(blocked);
  if (!label) return null;
  return (
    <MainContainer>
      <Label htmlFor={id || name || label}>{label}</Label>
      <InputContainer>
        <Input
          id={id || name || label}
          name={name || label}
          type={type === 'password' ? isBlocked ? type : null : type}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
          disabled={disabled}
          onChange={onChange}
          withError={withError}
        />
        {
          type === 'password' &&
          <CustomEyeIcon onClick={toggleIsBlocked} isBlocked={isBlocked} />
        }
      </InputContainer>
    </MainContainer>
  );
};

export default LabelInput;
