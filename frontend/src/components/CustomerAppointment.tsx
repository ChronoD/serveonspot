import { Button, Card } from "antd";
import { AppointmentInfo } from "../state/dataTypes";

interface Props {
  appointmentInfo: AppointmentInfo;
  unregisterAppointment: () => void;
  unregistering: boolean;
  unregisteringError: Error | undefined;
  returnToMenu: () => void;
}

export function CustomerAppointment({
  appointmentInfo,
  unregisterAppointment,
  unregistering,
  returnToMenu,
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
        title={`${specialist.specialistInfo}`}
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
        {status !== "FINISHED" && (
          <Button
            type="primary"
            disabled={status !== "REGISTERED"}
            onClick={unregisterAppointment}
            loading={unregistering}
          >
            Atšaukti
          </Button>
        )}
        {status === "FINISHED" && (
          <Button type="primary" onClick={returnToMenu}>
            Atgal
          </Button>
        )}
      </Card>
    </>
  );
}
