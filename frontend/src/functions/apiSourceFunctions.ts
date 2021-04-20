import { AppointmentInfo, SpecialistInfo } from "../state/dataTypes";
import { EventSourcePolyfill } from "event-source-polyfill";

export function initializeCustomerSpecialistsSource(
  onSuccess: (specialists: SpecialistInfo[]) => void
  // onError: (error: Error) => void
): EventSource {
  const specialistsSource = new EventSource(
    "http://127.0.0.1:8080/api/specialists"
  );
  specialistsSource.onerror = () => {
    // onError(new Error("Nepavyko gauti specialistų duomenų"));
    if (specialistsSource.readyState === 2) {
      setTimeout(initializeCustomerSpecialistsSource, 300);
    }
  };
  specialistsSource.onmessage = (message) => {
    const data = JSON.parse(message.data);
    onSuccess(data);
  };
  return specialistsSource;
}

export function initCustomerAppointmentSource(
  appointmentId: number,
  onSuccess: (appointmentInfo: AppointmentInfo) => void
): EventSource {
  const appointmentsSource = new EventSource(
    `http://127.0.0.1:8080/api/appointments/${appointmentId}`
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initCustomerAppointmentSource, 300);
    }
  };
  appointmentsSource.onmessage = (message) => {
    const data = JSON.parse(message.data);
    onSuccess(data);
  };
  return appointmentsSource;
}

export function initStaffAppointmentsSource(
  authHeader: string,
  onSuccess: (appointmentInfo: AppointmentInfo[]) => void,
  onError: (error: Error) => void
): EventSource {
  const appointmentsSource = new EventSourcePolyfill(
    `http://127.0.0.1:8080/api/appointments`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: authHeader,
      },
    }
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initStaffAppointmentsSource, 300);
      return onError(new Error("Nepavyko gauti vizitų duomenų"));
    }
  };
  appointmentsSource.onmessage = (message: any) => {
    const data = JSON.parse(message.data);
    onSuccess(data);
  };
  return appointmentsSource;
}
