import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import {
  specialistsSuccess,
  specialistsError,
  postingAppointmentError,
  postingAppointmentSuccess,
  unregisteringSuccess,
  unregisteringError,
  resetCustomerState,
  registerWithSpecialistThunk,
} from "../state/sliceCustomer";
import {
  initializeSpecialistsSource,
  initializeWatchedAppointmentSource,
  registerAppointment,
  unregisterAppointment,
} from "../functions/apiFunctions";
import { AppointmentInfo, Specialist } from "../state/dataTypes";
import { CustomerAppointment } from "../components/CustomerAppointment";
import { CustomerSpecialists } from "../components/CustomerSpecialists";

interface Props {}

export function CustomerPanel({}: Props) {
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

  // function registerWithSpecialist(specialistId: number) {
  //   registerAppointment(
  //     specialistId,
  //     (appointmentInfo: AppointmentInfo) =>
  //       dispatch(postingAppointmentSuccess(appointmentInfo)),
  //     (error: Error) => dispatch(postingAppointmentError(error))
  //   );
  // }

  function registerWithSpecialist(specialistId: number) {
    dispatch(registerWithSpecialistThunk(specialistId));
  }

  function trackAppointmentSuccess(appointmentInfo: AppointmentInfo) {
    dispatch(postingAppointmentSuccess(appointmentInfo));
    closeSpecs();
  }

  let specialistsSource: EventSource | null = null;

  function closeSpecs() {
    specialistsSource && specialistsSource.close();
  }

  function closeAppointment() {
    appointmentSource && appointmentSource.close();
  }

  useEffect(() => {
    if (!appointmentInfo) {
      specialistsSource = initializeSpecialistsSource(
        (specialists: Specialist[]) =>
          dispatch(specialistsSuccess(specialists)),
        (error: Error) => dispatch(specialistsError(error))
      );
      specialistsSource.addEventListener("close", () =>
        specialistsSource?.close()
      );
    } else {
      closeSpecs();
    }
    return () => {
      closeSpecs();
    };
  }, [appointmentInfo]);

  function unregister(appointmentId: number) {
    // dispatch(unregisteringAppointment);
    unregisterAppointment(
      appointmentId,
      () => dispatch(unregisteringSuccess()),
      (error: Error) => dispatch(unregisteringError(error))
    );
  }

  let appointmentSource: EventSource | null = null;

  useEffect(() => {
    if (appointmentInfo) {
      appointmentSource = initializeWatchedAppointmentSource(
        appointmentInfo.appointmentId,
        trackAppointmentSuccess
      );

      return () => {
        closeAppointment();
      };
    }
  }, [appointmentInfo]);

  // useEffect(() => {
  //   return () => {
  //     closeAppointment();
  //     closeSpecs();
  //   };
  // }, [appointmentInfo]);

  return (
    <div>
      {specialists && !appointmentInfo && (
        <CustomerSpecialists
          registerAppointment={registerWithSpecialist}
          registering={postingAppointment}
          registeringError={appointmentError}
          loadingSpecialists={gettingSpecialists}
          loadingSpecialistsError={gettingSpecialistsError}
          specialists={specialists}
        />
      )}
      {appointmentInfo && (
        <CustomerAppointment
          appointmentInfo={appointmentInfo}
          unregisterAppointment={() =>
            unregister(appointmentInfo.appointmentId)
          }
          unregistering={unregisteringAppointment}
          unregisteringError={unregisteringAppointmentError}
          returnToMenu={() => dispatch(resetCustomerState())}
        />
      )}
    </div>
  );
}
