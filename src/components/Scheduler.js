import React from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { statusColors } from 'Constants/app';

const Container = styled.div`
  width: 92%;
  margin: 0 auto;
  margin-top: 20px;
  @media (min-width: 768px) {
    width: 90%;
  }
`;

moment.locale('es');
const localizer = momentLocalizer(moment);



const Scheduler = ({ appointments = [] }) => (
  <Container>
    <Calendar
      popup
      localizer={localizer}
      events={appointments}
      style={{ height: 600 }}
      startAccessor="start"
      endAccessor="end"
      defaultView='month'
      onSelectEvent={(e,f)=>{
        console.log('e', e);
        // console.log('f', f)
      }}
      eventPropGetter={
        (event) => { 
          return { style: { backgroundColor: statusColors[event.status] } };
        }
      }
      messages={
        {
          today: 'Hoy',
          previous: '<',
          next: '>',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          // agenda: 'Lista'
          showMore: (total) => (
            <div
              style={{ cursor: 'pointer' }}
              onMouseOver={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >{`+${total} más`}
            </div>
          ),
        }
      }
      //Calendar.Views ('month'|'week'|'work_week'|'day'|'agenda')
      // components={{
      //   timeSlotWrapper: ColoredDateCellWrapper,
      // }}
    />
  </Container>
)

export default Scheduler;
