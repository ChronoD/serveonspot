import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StaffAppointments } from "../components/StaffAppointments";
import { StaffLogIn } from "../components/StaffLogIn";
import { StaffUserInfo } from "../components/StaffUserInfo";
import {
  authenticateStaffMember,
  cancelAxiosInterceptors,
  initializeAppointmentsSource,
  unregisterAppointment,
  updateAppointmentStatus,
} from "../functions/apiFunctions";
import { Appointment, LoginDetails, UserInfo } from "../state/dataTypes";
import { useAppSelector } from "../state/hooks";
import {
  selectAuthenticationHeader,
  setAppointments,
  setUserInfoAndAuthenticationHeader,
  resetStaffState,
  updateAppointmentError,
  updateAppointmentSuccess,
} from "../state/sliceStaff";

interface Props {}

export function StaffPanel({}: Props) {
  const isAuthenticated = !!useSelector(selectAuthenticationHeader);

  const {
    authenticationHeader,
    userInfo,
    updatingAppointment,
    updatingAppointmentError,
    updatedAppointment,
    appointments,
    appointmentsError,
  } = useAppSelector((state) => state.staff);

  const dispatch = useDispatch();

  const setHeaderAndUserInfo = (userInfo: UserInfo, header: string) =>
    dispatch(setUserInfoAndAuthenticationHeader({ userInfo, header }));

  const logIn = (values: LoginDetails) => {
    authenticateStaffMember(values, setHeaderAndUserInfo);
  };

  const updateAppointment = (status: string) => (appointmentId: number) => {
    updateAppointmentStatus(
      appointmentId,
      status,
      (appointment: Appointment) =>
        dispatch(updateAppointmentSuccess(appointment)),
      (error: Error) => dispatch(updateAppointmentError(error))
    );
  };

  function logOut(): void {
    cancelAxiosInterceptors();
    dispatch(resetStaffState());
  }

  let source: EventSource | null = null;
  useEffect(() => {
    if (userInfo) {
      source = initializeAppointmentsSource(
        (appointments: Appointment[]) =>
          dispatch(setAppointments(appointments)),
        authenticationHeader
      );
    }
    return () => {
      console.log("closing appmt");

      source && source.close();
    };
  }, [userInfo]);

  return (
    <div>
      <Row justify="center">
        {!isAuthenticated && <StaffLogIn onSubmit={logIn} />}
      </Row>
      {isAuthenticated && (
        <Row justify="center">
          {userInfo && <StaffUserInfo userInfo={userInfo} logout={logOut} />}
          {userInfo && (
            <StaffAppointments
              userInfo={userInfo}
              appointments={appointments}
              appointmentsError={appointmentsError}
              startAppointment={updateAppointment("STARTED")}
              endAppointment={updateAppointment("FINISHED")}
              cancelAppointment={updateAppointment("CANCELLED")}
              updating={updatingAppointment}
              updatingError={appointmentsError}
            />
          )}
        </Row>
      )}
    </div>
  );
}
