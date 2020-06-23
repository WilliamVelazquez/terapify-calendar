describe('Cash Opening', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(4000);
  });

  it('Fetching initial data', () => {
    cy.contains('.rbc-event-content', 'Cita de pareja-10').should('be.visible');
		cy.screenshot('fetching-initial-data');
  });
  
  it('Switching views', () => {
    cy.contains('.rbc-active', 'Mes').should('be.visible');
    cy.contains('button', 'Semana').click();
    cy.contains('.rbc-active', 'Semana').should('be.visible');
    cy.contains('button', 'Día').click();
    cy.contains('.rbc-active', 'Día').should('be.visible');
    cy.contains('button', 'Agenda').click();
    cy.contains('.rbc-active', 'Agenda').should('be.visible');
		cy.screenshot('switching-views');
  });

  it('Requesting for other Psychologist Data', () => {
    cy.get('#psychologistId').select('2');
    cy.contains('button', 'Buscar Información').click();
    cy.wait(3000);
		cy.screenshot('requesting-psychologist-data');
  });

  it('Show Modal with Appointment Information', () => {
    cy.contains('.rbc-event-content', 'Cita de pareja-10').should('be.visible');
    cy.contains('.rbc-event-content', 'Cita de pareja-10').click();
    cy.contains('h2','Cita de pareja-10').should('be.visible');
		cy.screenshot('show-modal-appointment-data');
  });
});
