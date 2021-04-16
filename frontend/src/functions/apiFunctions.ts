import axios from "axios";
import { LoginDetails } from "../containers/StaffPanel";
import { Appointment, AppointmentInfo, Specialist } from "../state/dataTypes";

export function registerAppointment(
  specialistId: number,
  setAppointment: (appointment: Appointment) => void
) {
  return axios
    .post(
      `http://localhost:8080/appointments`,
      { specialistId: specialistId },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    )
    .then((res) => {
      console.log(res);
      const data = res.data;
      console.log(data);
      setAppointment(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function unregisterAppointment(
  appointmentId: number,
  removeAppointment: () => void
) {
  return axios
    .patch(
      `http://localhost:8080/appointments/${appointmentId}`,
      { status: "unregister" },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    )
    .then((res) => {
      const data = res.data;
      removeAppointment();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function authenticateStaffMember(
  loginDetais: LoginDetails,
  setSpecialist: (s: Specialist) => void
) {
  return axios
    .get(`http://localhost:8080/authorities`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: createBasicAuthToken(loginDetais),
      },
    })
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function initializeTrackedAppointmentSource(
  appointmentId: number,
  setAppointmentInfo: (appointmentInfo: AppointmentInfo) => void
): EventSource {
  const appointmentsSource = new EventSource(
    `http://127.0.0.1:8080/appointments/${appointmentId}`
  );

  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  appointmentsSource.onmessage = (message) => {
    console.log(message);

    const data = JSON.parse(message.data);
    setAppointmentInfo(data);
  };
  return appointmentsSource;
}

export function initializeAppointmentsSource(
  setCustomers: (appointments: Appointment[]) => void
): EventSource {
  const appointmentsSource = new EventSource(
    "http://127.0.0.1:8080/appointments"
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  appointmentsSource.onmessage = (message) => {
    // console.log(message);

    const data = JSON.parse(message.data);
    setCustomers(data);
  };
  return appointmentsSource;
}

export function initializeSpecialistsSource(
  setSpecialists: (specialists: Specialist[]) => void
): EventSource {
  const specialistsSource = new EventSource(
    "http://127.0.0.1:8080/specialists"
  );
  specialistsSource.onerror = () => {
    if (specialistsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  specialistsSource.onmessage = (message) => {
    // console.log(message);
    const data = JSON.parse(message.data);
    setSpecialists(data);
  };
  return specialistsSource;
}

function createBasicAuthToken(loginDetails: LoginDetails) {
  const { username, password } = loginDetails;
  const unencodedDetails = username + ":" + password;
  return "Basic " + Buffer.from(unencodedDetails).toString("base64");
}
