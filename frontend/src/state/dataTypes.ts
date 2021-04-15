export interface Appointment {
  appointmentId: number;
  egisteredAt: string;
  unregisteredAt: string;
  unregistered: boolean;
  startedAt: string;
  started: boolean;
  finishedAt: string;
  finished: boolean;
  specialist: Specialist;
}

export interface Specialist {
  specialistId: number;
  specialistType: string;
  working: boolean;
}
