import { Button } from "antd";
import { AppointmentInfo } from "../state/dataTypes";

interface Props {
  appointmentInfo: AppointmentInfo;
  unregisterAppointment: () => void;
  unregistering: boolean;
  unregisteringError: Error | undefined;
}

export function CustomerAppointment({
  appointmentInfo,
  unregisterAppointment,
  unregistering,
}: Props) {
  const { appointmentId, message, specialist } = appointmentInfo;

  return (
    <div>
      <>
        <div>Vizitas:</div>
        {`Nr. ${appointmentId} pas ${specialist.specialistInfo}`}
      </>
      <div>
        <>
          Informacija:
          <p>{message}</p>
          <Button onClick={unregisterAppointment} loading={unregistering}>
            atšaukti
          </Button>
        </>
      </div>
    </div>
  );
}
