import { Button, Card, Col, List, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { AppointmentInfo, UserInfo } from "../../state/dataTypes";
import { AppointmentsListCard } from "./AppointmentsListCard";

interface Props {
  userInfo: UserInfo;
  appointments: AppointmentInfo[] | undefined;
  appointmentsError?: Error;
  startAppointment: (appointmentId: number) => void;
  endAppointment: (appointmentId: number) => void;
  cancelAppointment: (appointmentId: number) => void;
  updating: boolean;
  updatingAppointmentId: number | undefined;
  updatingError: Error | undefined;
  closeUpdatingError: () => void;
}

export function StaffAppointments({
  userInfo,
  appointments,
  appointmentsError,
  startAppointment,
  endAppointment,
  cancelAppointment,
  updating,
  updatingAppointmentId,
  updatingError,
  closeUpdatingError,
}: Props) {
  const isAdmin = userInfo.authority === "ADMIN";

  return (
    <>
      <Modal
        visible={!!updatingError}
        onCancel={closeUpdatingError}
        footer={null}
      >
        <p>Įvyko klaida, bandykite vėliau</p>
      </Modal>
      <Row>
        {appointmentsError && (
          <Col span={12} offset={6}>
            Klaida gaunant vizitų duomenis, palaukite
          </Col>
        )}
        {!appointmentsError && (
          <Col span={12} offset={6}>
            {userInfo && !appointments ? "Laukiama vizitų duomenų" : "Vizitai"}
          </Col>
        )}
      </Row>
      {appointments !== undefined && (
        <Row justify="center">
          <List
            itemLayout="horizontal"
            dataSource={appointments}
            locale={{ emptyText: "Šiuo metu prisiregistravusių nėra." }}
            renderItem={(appointment, index) => (
              <List.Item>
                <AppointmentsListCard
                  appointment={appointment}
                  startAppointment={startAppointment}
                  endAppointment={endAppointment}
                  cancelAppointment={cancelAppointment}
                  updating={
                    updating &&
                    updatingAppointmentId === appointment.appointmentId
                  }
                  actionsDisabled={index !== 0 || isAdmin}
                  isAdmin={isAdmin}
                />
              </List.Item>
            )}
          />
        </Row>
      )}
    </>
  );
}
