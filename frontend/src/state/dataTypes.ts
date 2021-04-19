// export interface Appointment {
//   appointmentId: number;
//   specialist: Specialist;
//   status: AppointmentStatus;
// }

export type AppointmentStatus =
  | "REGISTERED"
  | "UNREGISTERED"
  | "STARTED"
  | "FINISHED"
  | "CANCELLED";

export interface Specialist {
  specialistId: number;
  specialistType: string;
  specialistInfo: string;
  working: boolean;
}

export interface AppointmentInfo {
  appointmentId: number;
  status: AppointmentStatus;
  specialist: Specialist;
  positionOnTheList: number;
  approximateTimeLeft: string;
  message: string;
}

export interface LoginDetails {
  username: string;
  password: string;
}

export interface UserInfo {
  userId: string;
  username: string;
  password: string;
  authority: string;
  specialist: Specialist;
}
