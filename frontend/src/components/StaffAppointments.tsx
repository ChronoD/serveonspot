import { Button } from "antd";
import { useEffect, useState } from "react";
import {
  initializeAppointmentsSource,
  unregisterAppointment,
} from "../functions/apiFunctions";
import { Appointment } from "../state/dataTypes";
import { useAppSelector } from "../state/hooks";

interface Props {}

export function StaffAppointments({}: Props) {
  const { authenticationHeader } = useAppSelector((state) => state.staff);

  const [appointments, setAppointments] = useState<Appointment[] | undefined>(
    undefined
  );

  function updateAppointments(appointments: Appointment[]): void {
    return setAppointments(appointments);
  }

  console.log(appointments);

  useEffect(() => {
    const source = initializeAppointmentsSource(
      updateAppointments,
      authenticationHeader
    );
    return () => {
      console.log("closing appmt");

      source.close();
    };
  }, []);

  return (
    <div>
      {!appointments ? (
        "Laukiama duomenų"
      ) : (
        <>
          <div>Vizitai:</div>
          {appointments.length &&
            appointments.map((a: Appointment) => (
              <div key={a.appointmentId}>
                <p key={a.appointmentId}>{`${a.appointmentId} ${
                  a.started ? "vyksta" : "laukia"
                } `}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
