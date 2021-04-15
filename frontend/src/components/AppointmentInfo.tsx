import { Button } from "antd";
import { unregisterAppointment } from "../functions/apiFunctions";
import { Appointment } from "../state/dataTypes";

interface Props {
  appointment: Appointment;
}

export function AppointmentInfo({ appointment }: Props) {
  const { appointmentId, specialist } = appointment;

  return (
    <div>
      <>
        <div>appointment:</div>
        {`${appointmentId} with ${specialist.specialistType}`}
        <Button onClick={() => unregisterAppointment(appointmentId)}>
          unregister
        </Button>
      </>
    </div>
  );
}
