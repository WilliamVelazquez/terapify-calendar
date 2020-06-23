import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TERAPIFY_ICON from '../assets/images/terapifyIcon.svg';

import Modal from './Modal'
import { statusColors } from 'Constants/app';
import { formatTime } from 'Utils/utilities';
import psychologists from '../utils/mocks/psychologists';
import status from '../utils/mocks/status';
import Select from './Select';
import Button from './Button';

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
  margin: 10px 0px;
  text-align: center;
`;

const Line = styled.p`
  margin: 10px 0px;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  /* display: grid;
  grid-gap: 10px;
  justify-items: end;
  grid-template-columns: 1fr;
  @media (min-width: 568px) {
    grid-template-columns: 1fr 1fr;
  } */
`;

const Colored = styled.span`
  color: ${(props) => props.color || '#0085ff' }
`;

const Image = styled.img`
  width: 100%;
  padding-top: 10px;
`;

moment.locale('es');
const localizer = momentLocalizer(moment);



const Scheduler = ({ appointments = [], handleUpdateStatus = null, isOpen = false, toggleModal = null, setIsOpen = null }) => {
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});

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
          /* console.log('event', event); */
          if(event){
            setSelectedAppointment(event);
            setSelectedStatus(event.status);
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
            date: 'Fecha',
            time: 'Horario',
            event: 'Cita',
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
            <StatusContainer>
              <Line>
                <Colored color={statusColors[selectedAppointment.status]}>
                  Estatus: 
                </Colored>
              </Line>
              <Select 
                value={selectedStatus}
                onChange={(event)=>setSelectedStatus(event.target.value)}
                id='statusId'
                placeholder='- Seleccione -'
                data={status}
                dataId='value'
                dataText='value'
              />
            </StatusContainer>
            <Line>
              Paciente: No disponible
            </Line>
            <Line>
              Hora de Consulta: <Colored color={statusColors[selectedAppointment.status]}>{formatTime(selectedAppointment.start)}hrs</Colored>
            </Line>
            <Line>
              Psícologo: { psychologists.find((psy) => (psy.psyId === selectedAppointment.psy)).name || 'No disponible' }
            </Line>
            {
              (selectedAppointment.status !== selectedStatus) &&
              <Button text='Actualizar estatus' onClick={() => handleUpdateStatus(selectedAppointment.id, selectedStatus)} />
            }
            <Image src={TERAPIFY_ICON} alt='Terapify Logo' />
          </ModalContent>
        }
      </Modal>
    </Container>
  )
}
export default Scheduler;
