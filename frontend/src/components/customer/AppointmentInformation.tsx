import { Button, Card } from "antd";
import Modal from "antd/lib/modal/Modal";
import { colorByAppointmentStatus } from "../../functions/utilFunctions";
import { AppointmentInfo } from "../../state/dataTypes";

interface Props {
  appointmentInfo: AppointmentInfo;
  unregisterAppointment: () => void;
  unregistering: boolean;
  unregisteringError: Error | undefined;
  closeUnregisteringError: () => void;
  returnToMenu: () => void;
}

export function AppointmentInformation({
  appointmentInfo,
  unregisterAppointment,
  unregistering,
  unregisteringError,
  closeUnregisteringError,
  returnToMenu,
}: Props) {
  const {
    positionOnTheList,
    message,
    specialist,
    status,
    approximateTimeLeft,
  } = appointmentInfo;
  const borderColor = colorByAppointmentStatus(status);

  return (
    <>
      <Modal
        visible={!!unregisteringError}
        onCancel={closeUnregisteringError}
        footer={null}
      >
        <p>Įvyko klaida, pabandykite vėliau</p>
      </Modal>
      <Card
        title={`${specialist.specialistInfo}`}
        style={{
          width: 300,
          border: `5px solid ${borderColor}`,
        }}
      >
        <>
          Informacija:
          <p>{message}</p>
          <p>{approximateTimeLeft}</p>
        </>
        {status === "REGISTERED" && (
          <Button
            type="primary"
            onClick={unregisterAppointment}
            loading={unregistering}
          >
            Atšaukti
          </Button>
        )}
        {(status === "UNREGISTERED" ||
          status === "FINISHED" ||
          status === "CANCELLED") && (
          <Button type="primary" onClick={returnToMenu}>
            Atgal
          </Button>
        )}
      </Card>
    </>
  );
}
