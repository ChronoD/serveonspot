import { Button } from "antd";
import { Appointment } from "../state/dataTypes";

interface Props {
  appointments: Appointment[];
  appointmentsError?: Error;
  startAppointment: (appointmentId: number) => void;
  endAppointment: (appointmentId: number) => void;
  cancelAppointment: (appointmentId: number) => void;
  updating: boolean;
  updatingError: Error | undefined;
}

export function StaffAppointments({
  appointments,
  appointmentsError,
  startAppointment,
  endAppointment,
  cancelAppointment,
  updating,
  updatingError,
}: Props) {
  return (
    <div>
      <>
        <div>Vizitai:</div>
        {appointments.map((a: Appointment, index: number) => (
          <div key={a.appointmentId}>
            <p key={a.appointmentId}>{`${a.appointmentId} ${
              a.started ? "vyksta" : "laukia"
            } `}</p>
            {index === 0 && (
              <>
                <Button
                  onClick={() => startAppointment(a.appointmentId)}
                  loading={updating}
                >
                  pradėti
                </Button>
                <Button
                  onClick={() => endAppointment(a.appointmentId)}
                  loading={updating}
                >
                  baigti
                </Button>
                <Button
                  onClick={() => cancelAppointment(a.appointmentId)}
                  loading={updating}
                >
                  atšaukti
                </Button>
              </>
            )}
          </div>
        ))}
        {!appointments.length && <div>Šiuo metu nėra prisiregistravusių</div>}
      </>
    </div>
  );
}
