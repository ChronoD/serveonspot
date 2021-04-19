import { Button, Card, Col, List, Row } from "antd";
import {
  colorByAppointmentStatus,
  specialistTypeInfoBySpecialistType,
} from "../../functions/utilFunctions";
import { AppointmentInfo, UserInfo } from "../../state/dataTypes";

interface Props {
  appointment: AppointmentInfo;
  startAppointment: (appointmentId: number) => void;
  endAppointment: (appointmentId: number) => void;
  cancelAppointment: (appointmentId: number) => void;
  updating: boolean;
  actionsDisabled: boolean;
  isAdmin: boolean;
}

export function AppointmentsListCard({
  appointment,
  startAppointment,
  endAppointment,
  cancelAppointment,
  updating,
  actionsDisabled,
  isAdmin,
}: Props) {
  const borderColor = colorByAppointmentStatus(appointment.status);

  const specialistTypeInfo = specialistTypeInfoBySpecialistType(
    appointment.specialist.specialistType
  );

  const cancelDisabled =
    appointment.status === "UNREGISTERED" ||
    appointment.status === "FINISHED" ||
    appointment.status === "CANCELLED" ||
    actionsDisabled;

  const startDisabled = appointment.status !== "REGISTERED" || actionsDisabled;
  const fisnishDisabled = appointment.status !== "STARTED" || actionsDisabled;

  return (
    <Card
      bodyStyle={{ display: isAdmin ? "none" : undefined }}
      style={{
        width: 300,
        border: `5px solid ${borderColor}`,
      }}
      title={`Nr. ${appointment.appointmentId}: ${
        appointment.status === "REGISTERED" ? "laukia" : "vyksta"
      }`}
      extra={
        <>
          {!isAdmin && (
            <p>
              <Button
                disabled={cancelDisabled}
                onClick={() => cancelAppointment(appointment.appointmentId)}
                loading={updating}
                size="small"
              >
                atšaukti
              </Button>
            </p>
          )}
          {isAdmin && <>{` ${specialistTypeInfo}`}</>}
        </>
      }
    >
      {!isAdmin && (
        <>
          <Button
            disabled={startDisabled}
            onClick={() => startAppointment(appointment.appointmentId)}
            loading={updating}
          >
            pradėti
          </Button>
          <Button
            disabled={fisnishDisabled}
            onClick={() => endAppointment(appointment.appointmentId)}
            loading={updating}
          >
            baigti
          </Button>
        </>
      )}
    </Card>
  );
}
