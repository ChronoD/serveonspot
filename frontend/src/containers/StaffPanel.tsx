import { Col } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StaffAppointments } from "../components/staff/AppointmentsList";
import { StaffLogIn } from "../components/staff/LogInForm";
import { StaffUserInfo } from "../components/staff/UserInfo";
import { initStaffAppointmentsSource } from "../functions/apiSourceFunctions";
import {
  AppointmentInfo,
  AppointmentStatus,
  LoginDetails,
} from "../state/dataTypes";
import { useAppSelector } from "../state/hooks";
import {
  setStaffAppointments,
  logout,
  setAppointmentStatusApi,
  loginApi,
  resetLoginError,
  resetUpdatingError,
  setStaffAppointmentsError,
} from "../state/sliceStaff";

interface Props {}

export function StaffPanel({}: Props) {
  const {
    authHeader,
    userInfo,
    userInfoError,
    updatingAppointment,
    updatingAppointmentId,
    updatingAppointmentError,
    appointments,
    appointmentsError,
  } = useAppSelector((state) => state.staff);

  const dispatch = useDispatch();

  function login(values: LoginDetails) {
    dispatch(loginApi(values));
  }

  function closeLoginError() {
    dispatch(resetLoginError());
  }

  const updateAppointment = (status: AppointmentStatus) => (
    appointmentId: number
  ) => {
    dispatch(setAppointmentStatusApi({ appointmentId, status }));
  };

  function closeUpdatingAppointmentError() {
    dispatch(resetUpdatingError());
  }

  function watchAppointmentsSuccess(appointments: AppointmentInfo[]) {
    dispatch(setStaffAppointments(appointments));
  }

  function watchAppointmentsError(error: Error) {
    dispatch(setStaffAppointmentsError(error));
  }

  function logOut(): void {
    dispatch(logout());
  }

  let source: EventSource | null = null;
  useEffect(() => {
    if (userInfo && authHeader) {
      source = initStaffAppointmentsSource(
        authHeader,
        watchAppointmentsSuccess,
        watchAppointmentsError
      );
    }
    return () => {
      source && source.close();
    };
  }, [userInfo]);

  return (
    <>
      {!authHeader && (
        <StaffLogIn
          onSubmit={login}
          loginError={userInfoError}
          closeLoginError={closeLoginError}
        />
      )}
      {!!authHeader && (
        <Col span={24}>
          <Col span={24}>
            {userInfo && <StaffUserInfo userInfo={userInfo} logout={logOut} />}
          </Col>
          {userInfo && (
            <StaffAppointments
              userInfo={userInfo}
              appointments={appointments}
              appointmentsError={appointmentsError}
              startAppointment={updateAppointment("STARTED")}
              endAppointment={updateAppointment("FINISHED")}
              cancelAppointment={updateAppointment("CANCELLED")}
              updating={updatingAppointment}
              updatingAppointmentId={updatingAppointmentId}
              updatingError={updatingAppointmentError}
              closeUpdatingError={closeUpdatingAppointmentError}
            />
          )}
        </Col>
      )}
    </>
  );
}
