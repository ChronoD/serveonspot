export interface SpecialistInfo {
  specialistId: number;
  specialistType: string;
}

export interface AppointmentInfo {
  appointmentId: number;
  status: AppointmentStatus;
  specialist: SpecialistInfo;
  positionOnTheList: number;
  approximateTimeLeft: string;
}

export type AppointmentStatus =
  | "REGISTERED"
  | "UNREGISTERED"
  | "STARTED"
  | "FINISHED"
  | "CANCELLED";

export interface LoginDetails {
  username: string;
  password: string;
}

export interface UserInfo {
  userId: string;
  username: string;
  password: string;
  authority: string;
  specialist: SpecialistInfo;
}
