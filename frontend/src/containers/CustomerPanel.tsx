import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import {
  specialistsSuccess,
  specialistsError,
  resetRegisteringError,
  resetCustomerState,
  registerWithSpecialistApi,
  unregisterWithSpecialistApi,
  gettingAppointmentSuccess,
  gettingAppointmentError,
  resetUnregisteringError,
} from "../state/sliceCustomer";
import {
  initCustomerAppointmentSource,
  initializeCustomerSpecialistsSource,
} from "../functions/apiSourceFunctions";
import { AppointmentInfo, SpecialistInfo } from "../state/dataTypes";
import { AppointmentInformation } from "../components/customer/AppointmentInformation";
import { CustomerSpecialists } from "../components/customer/SpecialistsList";
import { Col, Row } from "antd";

export function CustomerPanel() {
  const {
    gettingSpecialists,
    gettingSpecialistsError,
    specialists,
    registeringAppointment,
    registeringSpecialistId,
    registeringError,
    appointmentInfo,
    unregisteringAppointment,
    unregisteringError,
  } = useAppSelector((state) => state.customer);

  const dispatch = useDispatch();

  function watchSpecialistsSuccess(specialists: SpecialistInfo[]) {
    dispatch(specialistsSuccess(specialists));
  }

  function watchSpecialistsError(error: Error) {
    dispatch(specialistsError(error));
  }

  function registerWithSpecialist(specialistId: number) {
    dispatch(registerWithSpecialistApi(specialistId));
  }

  function closeRegisteringError() {
    dispatch(resetRegisteringError());
  }

  function watchAppointmentInfo(appointmentInfo: AppointmentInfo) {
    dispatch(gettingAppointmentSuccess(appointmentInfo));
  }

  function watchAppointmentInfoError(error: Error) {
    dispatch(gettingAppointmentError(error));
  }

  function unregister(appointmentId: number) {
    dispatch(unregisterWithSpecialistApi(appointmentId));
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
          registering={registeringAppointment}
          registeringSpecialistId={registeringSpecialistId}
          registeringError={registeringError}
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
          unregisteringError={unregisteringError}
          closeUnregisteringError={closeUnregisteringError}
          returnToMenu={returnToCustomerMenu}
        />
      )}
    </div>
  );
}
