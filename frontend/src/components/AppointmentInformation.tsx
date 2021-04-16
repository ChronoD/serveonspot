import { Button } from "antd";
import { useEffect, useState } from "react";
import {
  initializeTrackedAppointmentSource,
  unregisterAppointment,
} from "../functions/apiFunctions";
import { Appointment, AppointmentInfo } from "../state/dataTypes";

interface Props {
  appointment: Appointment;
  removeAppointment: () => void;
}

export function AppointmentInformation({
  appointment,
  removeAppointment,
}: Props) {
  const [appointmentInfo, setAppointmentInfo] = useState<
    AppointmentInfo | undefined
  >(undefined);

  const { appointmentId, specialist } = appointment;

  useEffect(() => {
    const source = initializeTrackedAppointmentSource(
      appointmentId,
      setAppointmentInfo
    );
    return () => source.close();
  }, []);

  return (
    <div>
      <>
        <div>Vizitas:</div>
        {`Nr. ${appointmentId} pas ${specialist.specialistInfo}`}
      </>
      <div>
        {appointmentInfo && (
          <>
            <p>vizito informacija:</p>
            {appointmentInfo?.message}
            <Button
              onClick={() =>
                unregisterAppointment(appointmentId, removeAppointment)
              }
            >
              atšaukti
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
