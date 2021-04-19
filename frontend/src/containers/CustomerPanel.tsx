import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import {
  specialistsSuccess,
  specialistsError,
  resetRegisteringError,
  resetCustomerState,
  registerWithSpecialistThunk,
  unregisterWithSpecialistThunk,
  watchAppointmentSuccess,
  watchAppointmentError,
  resetUnregisteringError,
} from "../state/sliceCustomer";
import {
  initCustomerAppointmentSource,
  initializeCustomerSpecialistsSource,
} from "../functions/apiSourceFunctions";
import { AppointmentInfo, Specialist } from "../state/dataTypes";
import { AppointmentInformation } from "../components/customer/AppointmentInformation";
import { CustomerSpecialists } from "../components/customer/SpecialistsList";
import { Col, Row } from "antd";

export function CustomerPanel() {
  const {
    gettingSpecialists,
    gettingSpecialistsError,
    specialists,
    postingAppointment,
    appointmentError,
    appointmentInfo,
    unregisteringAppointment,
    unregisteringAppointmentError,
  } = useAppSelector((state) => state.customer);

  const dispatch = useDispatch();

  function watchSpecialistsSuccess(specialists: Specialist[]) {
    dispatch(specialistsSuccess(specialists));
  }

  function watchSpecialistsError(error: Error) {
    dispatch(specialistsError(error));
  }

  function registerWithSpecialist(specialistId: number) {
    dispatch(registerWithSpecialistThunk(specialistId));
  }

  function closeRegisteringError() {
    dispatch(resetRegisteringError());
  }

  function watchAppointmentInfo(appointmentInfo: AppointmentInfo) {
    dispatch(watchAppointmentSuccess(appointmentInfo));
  }

  function watchAppointmentInfoError(error: Error) {
    dispatch(watchAppointmentError(error));
  }

  function unregister(appointmentId: number) {
    dispatch(unregisterWithSpecialistThunk(appointmentId));
  }

  function closeUnregisteringError() {
    dispatch(resetUnregisteringError());
  }

  function returnToCustomerMenu() {
    dispatch(resetCustomerState());
  }

  let specialistsSource: EventSource | null = null;

  useEffect(() => {
    if (!appointmentInfo) {
      specialistsSource = initializeCustomerSpecialistsSource(
        watchSpecialistsSuccess,
        watchSpecialistsError
      );
    } else {
      specialistsSource && specialistsSource.close();
    }
    return () => {
      specialistsSource && specialistsSource.close();
    };
  }, [appointmentInfo]);

  let appointmentSource: EventSource | null = null;

  useEffect(() => {
    if (appointmentInfo) {
      appointmentSource = initCustomerAppointmentSource(
        appointmentInfo.appointmentId,
        watchAppointmentInfo
        // watchAppointmentInfoError
      );
      return () => {
        appointmentSource && appointmentSource.close();
      };
    }
  }, [appointmentInfo]);

  return (
    <div>
      {!specialists && (
        <Row>
          <Col span={12} offset={6}>
            Laukiama specialistų duomenų
          </Col>
        </Row>
      )}
      {specialists && !appointmentInfo && (
        <CustomerSpecialists
          registerAppointment={registerWithSpecialist}
          registering={postingAppointment}
          registeringError={appointmentError}
          closeRegisteringError={closeRegisteringError}
          loadingSpecialists={gettingSpecialists}
          loadingSpecialistsError={gettingSpecialistsError}
          specialists={specialists}
        />
      )}
      {appointmentInfo && (
        <AppointmentInformation
          appointmentInfo={appointmentInfo}
          unregisterAppointment={() =>
            unregister(appointmentInfo.appointmentId)
          }
          unregistering={unregisteringAppointment}
          unregisteringError={unregisteringAppointmentError}
          closeUnregisteringError={closeUnregisteringError}
          returnToMenu={returnToCustomerMenu}
        />
      )}
    </div>
  );
}
