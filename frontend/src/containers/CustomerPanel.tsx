import { useState } from "react";
import { Appointment } from "../state/dataTypes";
import { AppointmentInformation } from "../components/AppointmentInformation";
import { SpecialistsList } from "../components/SpecialistsList";

interface Props {}

export function CustomerPanel({}: Props) {
  const [appointment, setAppointment] = useState<Appointment | undefined>(
    undefined
  );

  return (
    <div>
      {!appointment && <SpecialistsList setAppointment={setAppointment} />}
      {appointment && (
        <AppointmentInformation
          appointment={appointment}
          removeAppointment={() => setAppointment(undefined)}
        />
      )}
    </div>
  );
}
