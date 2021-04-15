import { Appointments } from "./Appointments";
import { Specialists } from "./Specialists";

interface Props {}

export function UI({}: Props) {
  return (
    <div>
      <Appointments />
      -----------------
      <Specialists />
      {/* <AppointmentInfo /> */}
    </div>
  );
}
