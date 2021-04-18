import { Button, Card, Col, List, Row } from "antd";
import { Appointment, UserInfo } from "../state/dataTypes";

interface Props {
  userInfo: UserInfo;
  appointments: Appointment[] | undefined;
  appointmentsError?: Error;
  startAppointment: (appointmentId: number) => void;
  endAppointment: (appointmentId: number) => void;
  cancelAppointment: (appointmentId: number) => void;
  updating: boolean;
  updatingError: Error | undefined;
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
}: Props) {
  const isAdmin = userInfo.authority === "ADMIN";
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          {userInfo && !appointments ? "Laukiama vizitų duomenų" : "Vizitai"}
        </Col>
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
