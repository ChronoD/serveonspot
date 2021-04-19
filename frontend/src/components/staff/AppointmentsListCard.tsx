import { Button, Card, Col, List, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { colorByAppointmentStatus } from "../../functions/utilFunctions";
import { AppointmentInfo, UserInfo } from "../../state/dataTypes";

interface Props {
  userInfo: UserInfo;
  appointment: AppointmentInfo;
  startAppointment: (appointmentId: number) => void;
  endAppointment: (appointmentId: number) => void;
  cancelAppointment: (appointmentId: number) => void;
  updating: boolean;
}

export function AppointmentsListCard({
  userInfo,
  appointment,
  startAppointment,
  endAppointment,
  cancelAppointment,
  updating,
}: Props) {
  const isAdmin = userInfo.authority === "ADMIN";
  console.log(isAdmin);

  const borderColor = colorByAppointmentStatus(appointment.status);
  console.log(borderColor);
  return (
    <Card
      bodyStyle={{ display: isAdmin ? "none" : undefined }}
      style={{
        width: 300,
        border: `5px solid ${borderColor}`,
      }}
      title={`${appointment.appointmentId}: ${
        appointment.status === "REGISTERED" ? "laukia" : "vyksta"
      }`}
      extra={
        !isAdmin && (
          <Button
            onClick={() => cancelAppointment(appointment.appointmentId)}
            loading={updating}
            size="small"
          >
            atšaukti
          </Button>
        )
      }
    >
      {!isAdmin && (
        <>
          <Button
            disabled={appointment.status === "STARTED"}
            onClick={() => startAppointment(appointment.appointmentId)}
            loading={updating}
          >
            pradėti
          </Button>
          <Button
            disabled={appointment.status !== "STARTED"}
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
