import React from 'react';
import styled from 'styled-components';
import { dateYYYYMMDDPattern } from 'Utils/validations';
import useForm from '../hooks/useForm';

import Button from './Button';
import LabelInput from './LabelInput';
import LabelSelect from './LabelSelect';

import psychologists from '../utils/mocks/psychologists';

const Container = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
`;

const Form = styled.form`
  width: 95%;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: 1fr;
  @media (min-width: 568px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 991px) {
    width: 90%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Filters = (props) => {
  const { defaultData, setFilters = null } = props;
  const [data, handleChange, handleData, setData] = useForm(defaultData);
  
  const handleSubmit = async (event) => {
    const formData = handleData(event);
    console.log(formData);
    setFilters(formData);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <LabelSelect 
          value={data.psychologistId}
          onChange={handleChange}
          id='psychologistId'
          label='Psicólogo'
          placeholder='Seleccione un psicólogo'
          data={psychologists}
          dataText='name'
        />
        <LabelInput 
          value={data.startDate}
          onChange={handleChange}
          id='startDate'
          label='Fecha inicio'
          type='date'
          pattern={dateYYYYMMDDPattern}
        />
        <LabelInput 
          value={data.endDate}
          onChange={handleChange}
          id='endDate'
          label='Fecha fin'
          type='date'
          pattern={dateYYYYMMDDPattern}
        />
        <Button text='Actualizar Información' onClick={handleSubmit} />
      </Form>
    </Container>
  );
};

export default Filters;
