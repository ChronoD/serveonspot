import axios from "axios";
import {
  Appointment,
  AppointmentInfo,
  LoginDetails,
  Specialist,
  UserInfo,
} from "../state/dataTypes";
import { EventSourcePolyfill } from "event-source-polyfill";

export function initializeSpecialistsSource(
  onSuccess: (specialists: Specialist[]) => void,
  onError: (error: Error) => void
): EventSource {
  const specialistsSource = new EventSource(
    "http://127.0.0.1:8080/specialists"
  );
  specialistsSource.onerror = () => {
    onError(new Error("Nepavyko gauti specialistų"));
    if (specialistsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  specialistsSource.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log(data);

    onSuccess(data);
  };
  return specialistsSource;
}

export function registerAppointment(
  specialistId: number,
  onSuccess: (appointmentInfo: AppointmentInfo) => void,
  onError: (error: Error) => void
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
      // console.log(res);
      const data = res.data;
      onSuccess(data);
    })
    .catch((error) => {
      // console.log(error);
      onError(error);
    });
}

export function initializeWatchedAppointmentSource(
  appointmentId: number,
  onSuccess: (appointmentInfo: AppointmentInfo) => void
): EventSource {
  const appointmentsSource = new EventSource(
    `http://127.0.0.1:8080/appointments/${appointmentId}`
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initializeWatchedAppointmentSource, 300);
    }
  };
  appointmentsSource.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log("appointment", data);

    onSuccess(data);
  };
  return appointmentsSource;
}

export function unregisterAppointment(
  appointmentId: number,
  onSuccess: () => void,
  onError: (error: Error) => void
) {
  return axios
    .patch(
      `http://localhost:8080/appointments/${appointmentId}`,
      { status: "UNREGISTERED" },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    )
    .then((res) => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
}

export function authenticateStaffMember(
  loginDetais: LoginDetails,
  setAuthHeader: (userInfo: UserInfo, header: string) => void
) {
  const authToken = createBasicAuthToken(loginDetais);
  console.log(authToken);
  return axios
    .get(`http://localhost:8080/user`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: authToken,
      },
    })
    .then((res) => {
      const data = res.data;
      console.log(data);

      setAuthHeader(data, authToken);
      // setupAxiosInterceptors(authToken);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function initializeAppointmentsSource(
  setCustomers: (appointments: Appointment[]) => void,
  authToken?: string
): EventSource {
  const appointmentsSource = new EventSourcePolyfill(
    "http://127.0.0.1:8080/appointments",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: `${authToken}`,
      },
    }
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initializeAppointmentsSource, 300);
    }
  };
  appointmentsSource.onmessage = (message: any) => {
    const data = JSON.parse(message.data);
    setCustomers(data);
  };
  return appointmentsSource;
}

export function updateAppointmentStatus(
  appointmentId: number,
  appointmentStatus: string,
  authToken: string,
  onSuccess: (appointment: Appointment) => void,
  onError: (error: Error) => void
) {
  return axios
    .patch(
      `http://localhost:8080/appointments/${appointmentId}`,
      { status: appointmentStatus },
      {
        headers: {
          authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    )
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((error) => {
      onError(error);
    });
}

function createBasicAuthToken(loginDetails: LoginDetails) {
  const { username, password } = loginDetails;
  const unencodedDetails = username + ":" + password;
  return "Basic " + Buffer.from(unencodedDetails).toString("base64");
}
