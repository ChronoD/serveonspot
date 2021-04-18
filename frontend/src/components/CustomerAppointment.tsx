import { Button, Card } from "antd";
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
  const {
    positionOnTheList,
    message,
    specialist,
    status,
    approximateTimeLeft,
  } = appointmentInfo;

  return (
    <>
      <Card
        title={`Nr. ${positionOnTheList} pas ${specialist.specialistInfo}`}
        style={{
          width: 300,
          border: status === "STARTED" ? "5px solid green" : "5px solid yellow",
        }}
      >
        <>
          Informacija:
          <p>{message}</p>
          <p>{approximateTimeLeft}</p>
        </>
        <Button
          type="primary"
          onClick={unregisterAppointment}
          loading={unregistering}
        >
          Atšaukti
        </Button>
      </Card>
    </>
  );
}
