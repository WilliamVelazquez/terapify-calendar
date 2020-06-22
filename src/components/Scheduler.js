import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TERAPIFY_ICON from '../assets/images/terapifyIcon.svg';

import Modal from './Modal'
import { statusColors } from 'Constants/app';
import useToggle from '../hooks/useToggle'
import psychologists from '../utils/mocks/psychologists';

const Container = styled.div`
  width: 92%;
  margin: 0 auto;
  margin-top: 20px;
  @media (min-width: 768px) {
    width: 90%;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  color: #0085ff;
  font-size: 2em;
  text-align: center;
`;

const Line = styled.p`
  margin: 10px 0px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

const Status = styled.span`
  color: ${(props) => props.color || '#0085ff' }
`;

const Image = styled.img`
  width: 100%;
  padding-top: 10px;
`;

moment.locale('es');
const localizer = momentLocalizer(moment);



const Scheduler = ({ appointments = [] }) => {
  const [isOpen, toggleModal, setIsOpen] = useToggle(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  return (
    <Container>
      <Calendar
        popup
        localizer={localizer}
        events={appointments}
        style={{ height: 650 }}
        startAccessor="start"
        endAccessor="end"
        defaultView='month'
        onSelectEvent={(event)=>{
          console.log('event', event);
          if(event){
            setSelectedAppointment(event);
            setIsOpen(true);
          }
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
      />
      <Modal
        isOpen={isOpen}
        close={toggleModal}
      >
        {
          selectedAppointment &&
          <ModalContent>
            <ModalTitle>{selectedAppointment.title}</ModalTitle>
            <Line>
              Estatus: <Status color={statusColors[selectedAppointment.status]}>{selectedAppointment.status}</Status>
            </Line>
            <Line>
              Paciente: No disponible
            </Line>
            <Line>
              Psícologo: { psychologists.find((psy) => (psy.psyId === selectedAppointment.psy)).name || 'No disponible' }
            </Line>
            <Image src={TERAPIFY_ICON} alt='Terapify Logo' />
          </ModalContent>
        }
      </Modal>
    </Container>
  )
}
export default Scheduler;
