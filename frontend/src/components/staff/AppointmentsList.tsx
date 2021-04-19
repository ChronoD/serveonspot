import { Button, Card, Col, List, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { AppointmentInfo, UserInfo } from "../../state/dataTypes";

interface Props {
  userInfo: UserInfo;
  appointments: AppointmentInfo[] | undefined;
  appointmentsError?: Error;
  startAppointment: (appointmentId: number) => void;
  endAppointment: (appointmentId: number) => void;
  cancelAppointment: (appointmentId: number) => void;
  updating: boolean;
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
            renderItem={(appointment) => (
              <List.Item>
                <Card
                  bodyStyle={{ display: isAdmin ? "none" : undefined }}
                  style={{
                    width: 300,
                    border:
                      appointment.status === "STARTED"
                        ? "5px solid green"
                        : "5px solid yellow",
                  }}
                  title={`${appointment.appointmentId}: ${
                    appointment.status === "REGISTERED" ? "laukia" : "vyksta"
                  }`}
                  extra={
                    !isAdmin && (
                      <Button
                        onClick={() =>
                          cancelAppointment(appointment.appointmentId)
                        }
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
                        onClick={() =>
                          startAppointment(appointment.appointmentId)
                        }
                        loading={updating}
                      >
                        pradėti
                      </Button>
                      <Button
                        disabled={appointment.status !== "STARTED"}
                        onClick={() =>
                          endAppointment(appointment.appointmentId)
                        }
                        loading={updating}
                      >
                        baigti
                      </Button>
                    </>
                  )}
                </Card>
              </List.Item>
            )}
          />
        </Row>
      )}
    </>
  );
}
