import axios from "axios";
import { Appointment, Specialist } from "../state/dataTypes";

export function registerAppointment(specialistId: number) {
  return axios
    .post(
      `/appointments`,
      { specialistId: specialistId },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    )
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    });
}

export function unregisterAppointment(appointmentId: number) {
  return axios
    .patch(
      `http://localhost:8080/appointments/${appointmentId}`,
      { status: "unregister" },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    )
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    });
}

export function initializeAppointmentsSource(
  setCustomers: (appointments: Appointment[]) => void
) {
  const appointmentsSource = new EventSource(
    "http://127.0.0.1:8080/appointments"
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  appointmentsSource.onmessage = (message) => {
    console.log(message);

    const data = JSON.parse(message.data);
    setCustomers(data);
  };
}

export function initializeSpecialistsSource(
  setSpecialists: (specialists: Specialist[]) => void
) {
  const specialistsSource = new EventSource(
    "http://127.0.0.1:8080/specialists"
  );
  specialistsSource.onerror = () => {
    if (specialistsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  specialistsSource.onmessage = (message) => {
    console.log(message);

    const data = JSON.parse(message.data);
    setSpecialists(data);
  };
}
