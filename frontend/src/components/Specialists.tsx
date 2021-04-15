import { Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  initializeSpecialistsSource,
  initializeAppointmentsSource,
  registerAppointment,
  unregisterAppointment,
} from "../functions/apiFunctions";
import { Specialist } from "../state/dataTypes";

interface Props {}

export function Specialists({}: Props) {
  const [specialists, setSpecialists] = useState<Specialist[] | undefined>(
    undefined
  );

  function updateSpecialists(specialists: Specialist[]): void {
    setSpecialists(specialists);
  }
  // console.log(appointments);
  // console.log(specialists);

  useEffect(() => {
    initializeSpecialistsSource(updateSpecialists);
  }, []);

  // console.log(appointments);

  return (
    <div>
      {!specialists ? (
        "loading specialists"
      ) : (
        <>
          <div>Available specialists:</div>
          {specialists && specialists.length
            ? specialists.map((s) => (
                <Button
                  key={s.specialistId}
                  onClick={() => registerAppointment(s.specialistId)}
                >
                  register with {s.specialistId}
                </Button>
              ))
            : specialists.length}
        </>
      )}
    </div>
  );
}
