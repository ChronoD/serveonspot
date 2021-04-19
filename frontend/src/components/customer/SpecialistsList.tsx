import { Button, List, Card } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Specialist } from "../../state/dataTypes";

interface Props {
  registerAppointment: (specialistId: number) => void;
  registering: boolean;
  registeringSpecialistId: number | undefined;
  registeringError: Error | undefined;
  closeRegisteringError: () => void;
  loadingSpecialists: boolean;
  loadingSpecialistsError: Error | undefined;
  specialists: Specialist[];
}

export function CustomerSpecialists({
  registerAppointment,
  registering,
  registeringSpecialistId,
  registeringError,
  closeRegisteringError,
  specialists,
}: Props) {
  return (
    <div>
      <Modal
        visible={!!registeringError}
        onCancel={closeRegisteringError}
        footer={null}
      >
        <p>Įvyko klaida, pabandykite vėliau</p>
      </Modal>
      <>
        {specialists.length && (
          <>
            <div>Specialistai:</div>

            <List
              itemLayout="vertical"
              size="large"
              dataSource={specialists}
              renderItem={(spec) => (
                <List.Item>
                  <Card title={spec.specialistType}>
                    <Button
                      type="primary"
                      onClick={() => registerAppointment(spec.specialistId)}
                      loading={
                        registering &&
                        registeringSpecialistId === spec.specialistId
                      }
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
      {specialists.length === 0 && "Šiuo metu nėra dirbančių specialistų"}
    </div>
  );
}
