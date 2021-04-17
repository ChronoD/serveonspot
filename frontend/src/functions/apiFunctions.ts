import axios from "axios";
import { LoginDetails } from "../containers/StaffPanel";
import { Appointment, AppointmentInfo, Specialist } from "../state/dataTypes";

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

export function initializeTrackedAppointmentSource(
  appointmentId: number,
  onSuccess: (appointmentInfo: AppointmentInfo) => void
): EventSource {
  const appointmentsSource = new EventSource(
    `http://127.0.0.1:8080/appointments/${appointmentId}`
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initializeTrackedAppointmentSource, 300);
    }
  };
  appointmentsSource.onmessage = (message) => {
    console.log("appointment", message);

    const data = JSON.parse(message.data);
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
      { status: "unregister" },
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
  setAuthHeader: (header: string, authority: string) => void
) {
  const authToken = createBasicAuthToken(loginDetais);
  return axios
    .get(`http://localhost:8080/authorities`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: authToken,
      },
    })
    .then((res) => {
      const data = res.data;
      console.log(data);

      setAuthHeader(authToken, data[0].authority);
      setupAxiosInterceptors(authToken);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function initializeAppointmentsSource(
  setCustomers: (appointments: Appointment[]) => void
): EventSource {
  const appointmentsSource = new EventSource(
    "http://127.0.0.1:8080/appointments"
  );
  appointmentsSource.onerror = () => {
    if (appointmentsSource.readyState === 2) {
      setTimeout(initializeAppointmentsSource, 300);
    }
  };
  appointmentsSource.onmessage = (message) => {
    const data = JSON.parse(message.data);
    setCustomers(data);
  };
  return appointmentsSource;
}

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
    // console.log(message);
    const data = JSON.parse(message.data);
    onSuccess(data);
  };
  return specialistsSource;
}

function createBasicAuthToken(loginDetails: LoginDetails) {
  const { username, password } = loginDetails;
  const unencodedDetails = username + ":" + password;
  return "Basic " + Buffer.from(unencodedDetails).toString("base64");
}

function setupAxiosInterceptors(header: string) {
  // const { userAuthority, authenticationHeader } = appState;
  axios.interceptors.request.use((request) => {
    // if (userAuthority && authenticationHeader) {
    request.headers.authorization = header;
    // }
    return request;
  });
}

export function cancelAxiosInterceptors() {
  // const { userAuthority, authenticationHeader } = appState;
  axios.interceptors.request.use((request) => {
    // if (userAuthority && authenticationHeader) {
    request.headers.authorization = null;
    // }
    return request;
  });
}
