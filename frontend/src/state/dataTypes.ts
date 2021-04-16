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
  specialistInfo: string;
  working: boolean;
}

export interface AppointmentInfo {
  appointmentId: number;
  specialist: Specialist;
  positionOnTheList: number;
  message: string;
}

export interface LoginDetails {
  username: string;
  password: string;
}
