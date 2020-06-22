import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Api from 'Utils/api';
import { formatDate, getlastDateAfterDays } from 'Utils/utilities';

import Filters from '../components/Filters';

const Container = styled.div`
  width: 100%;
`;

const FilteredCalendar = (props) => {
  const { setIsLoading = null } = props;
  const defaultData = {
    psychologistId: 1,
    startDate: formatDate(new Date()),
    endDate: formatDate(getlastDateAfterDays(7)),
  }
  const [filters, setFilters] = useState(defaultData);
  const [appointments, setAppointments] = useState([]);

  const getPsychologistAppointments = () => {
    setIsLoading(true);
    const serviceURL = `/appointments/psy/${filters.psychologistId}?start_time=${filters.startDate}&end_time=${filters.endDate}`;
    console.log('serviceURL-->', serviceURL);
    
    Api.apiGet(serviceURL, (json) => {
      if (json.message !== 'appointments listed') {
        console.log('getPsychologistAppointments error');
      } else {
        console.log('json', json);
        setAppointments(json.data);
        setIsLoading(false);
      }
    }, () => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getPsychologistAppointments();
  }, [filters]);

  return (
    <Container>
      <Filters defaultData={defaultData} setFilters={setFilters} />
    </Container>
  );
};

export default FilteredCalendar;
