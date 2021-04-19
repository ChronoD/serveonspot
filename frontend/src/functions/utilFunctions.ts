import { AppointmentStatus, LoginDetails } from "../state/dataTypes";

export function createBasicAuthToken(loginDetails: LoginDetails) {
  const { username, password } = loginDetails;
  const unencodedDetails = username + ":" + password;
  return "Basic " + Buffer.from(unencodedDetails).toString("base64");
}
export function colorByAppointmentStatus(status: AppointmentStatus): string {
  switch (status) {
    case "REGISTERED":
      return "black";
    case "UNREGISTERED":
      return "grey";
    case "CANCELLED":
      return "red";
    case "FINISHED":
      return "blue";
    case "STARTED":
      return "green";
  }
}
