import { Button, List, Card } from "antd";
import { Specialist } from "../state/dataTypes";

interface Props {
  registerAppointment: (specialistId: number) => void;
  registering: boolean;
  registeringError: Error | undefined;
  loadingSpecialists: boolean;
  loadingSpecialistsError: Error | undefined;
  specialists: Specialist[];
}

export function CustomerSpecialists({
  registerAppointment,
  registering,
  registeringError,
  specialists,
}: Props) {
  return (
    <div>
      {!specialists ? (
        "Laukiama duomenų"
      ) : (
        <>
          {specialists.length && (
            <>
              <div>Dirbantys specialistai:</div>

              <List
                itemLayout="vertical"
                size="large"
                dataSource={specialists}
                renderItem={(spec) => (
                  <List.Item>
                    <Card
                      title={spec.specialistInfo}
                      style={{ border: "5px solid green" }}
                    >
                      <Button
                        type="primary"
                        onClick={() => registerAppointment(spec.specialistId)}
                        loading={registering}
                      >
                        Registruotis
                      </Button>
                    </Card>
                  </List.Item>
                )}
              />
            </>
          )}
        </>
      )}
      {specialists.length === 0 && "Šiuo metu nėra dirbančių specialistų"}
    </div>
  );
}
