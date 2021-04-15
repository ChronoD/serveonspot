import axios from "axios";

// const api = axios.create({
//   baseURL: `http://localhost:8080/`,
//   headers: { "Access-Control-Allow-Origin": "*" },
// });

// export function registerAppointment(
//   specialistId: number
//   // setRegisteringStatus: (status: boolean | Error) => void
// ) {
//   // setRegisteringStatus(true);
//   return api
//     .post(`/appointments`, { specialistId: specialistId })
//     .then((res) => {
//       // setRegisteringStatus(false);
//     })
//     .catch((error) => {
//       console.log(error);
//       // setRegisteringStatus(error);
//     });
// }

// export function unregisterAppointment(
//   appointmentId: number
//   // setRegisteringStatus: (status: boolean | Error) => void
// ) {
//   // setRegisteringStatus(true);
//   return api
//     .patch(`http://localhost:8080/appointments/${appointmentId}`, {
//       status: "unregister",
//     })
//     .then((res) => {
//       // setRegisteringStatus(false);
//     })
//     .catch((error) => {
//       console.log(error);
//       // setRegisteringStatus(error);
//     });
// }
