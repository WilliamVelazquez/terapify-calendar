import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Api from 'Utils/api';
import useNotification from '../hooks/useNotification';
import { formatDate, getlastDateAfterDays, getCurrentTime } from 'Utils/utilities';

import Filters from '../components/Filters';
import Notification from '../components/Notification';
import Scheduler from '../components/Scheduler';

const Container = styled.div`
  width: 100%;
`;

const FilteredCalendar = (props) => {
  const { setIsLoading = null } = props;
  const defaultData = {
    psychologistId: 1,
    startDate: formatDate(new Date()),
    endDate: formatDate(getlastDateAfterDays(6)),
    currentDate: getCurrentTime(),
  }
  const [filters, setFilters] = useState(defaultData);
  const [appointments, setAppointments] = useState([]);
  const [message, showMessage, closeMessage, isNotifying] = useNotification();

  const getPsychologistAppointments = () => {
    setIsLoading(true);
    const serviceURL = `/appointments/psy/${filters.psychologistId}?start_time=${filters.startDate}&end_time=${filters.endDate}&current_time=${filters.currentDate}`;
    console.log('serviceURL-->', serviceURL);
    
    Api.apiGet(serviceURL, (json) => {
      if (json.message !== 'appointments listed') {
        console.log('getPsychologistAppointments error');
        showMessage('Error al obtener citas programadas.');
      } else {
        console.log('json', json);
        setAppointments(json.data);
        setIsLoading(false);
      }
    }, () => {
      setIsLoading(false);
      showMessage('Error al obtener citas.');
    });
  }

  useEffect(() => {
    getPsychologistAppointments();
  }, [filters]);

  return (
    <Container>
      <Filters defaultData={defaultData} setFilters={setFilters} />
      <Scheduler 
        appointments={appointments.map((appointment)=>{
          return {
            id: appointment._id,
            psyId: appointment.psy,
            title: `${appointment.service}-${appointment.user}`,
            start: new Date(appointment.start_time),
            end: new Date(appointment.end_time),
            allDay: false,
            status: appointment.status,
            payed: appointment.payed,
          }
        })}
      />
      <Notification
        isNotifying={isNotifying}
        close={closeMessage}
        message={message}
      />
    </Container>
  );
};

export default FilteredCalendar;
