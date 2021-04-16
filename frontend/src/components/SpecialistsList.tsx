import { Button, List, Card } from "antd";
import { useEffect, useState } from "react";
import {
  initializeSpecialistsSource,
  registerAppointment,
} from "../functions/apiFunctions";
import { Appointment, Specialist } from "../state/dataTypes";

interface Props {
  setAppointment: (appointment: Appointment) => void;
}

export function SpecialistsList({ setAppointment }: Props) {
  const [specialists, setSpecialists] = useState<Specialist[] | undefined>(
    undefined
  );

  function updateSpecialists(specialists: Specialist[]): void {
    setSpecialists(specialists);
  }

  useEffect(() => {
    const source = initializeSpecialistsSource(updateSpecialists);
    return () => source.close();
  }, []);

  return (
    <div>
      {!specialists ? (
        "Laukiama duomenų"
      ) : (
        <>
          {specialists && specialists.length && (
            <>
              <div>Dirbantys specialistai:</div>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={specialists}
                renderItem={(spec) => (
                  <List.Item>
                    <Card
                      title={spec.specialistId}
                      style={{ border: "5px solid green" }}
                    >
                      <>{spec.specialistType}</>
                      <Button
                        onClick={() =>
                          registerAppointment(spec.specialistId, setAppointment)
                        }
                      >
                        Registruotis {spec.specialistId}
                      </Button>
                    </Card>
                  </List.Item>
                )}
              />
            </>
          )}
        </>
      )}
      {specialists && specialists.length === 0
        ? "Šiuo metu nėra dirbančių specialistų"
        : null}
    </div>
  );
}
