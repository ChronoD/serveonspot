import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleAppointmentMode } from "../state/sliceApp";
import { useAppSelector } from "../state/hooks";
import { CustomerPanel } from "./CustomerPanel";
import { StaffPanel } from "./StaffPanel";

interface Props {}

export function MainPanel({}: Props) {
  const {
    app: { customerMode },
    customer: { appointmentInfo },
    staff: { userInfo },
  } = useAppSelector((state) => state);

  const dispatch = useDispatch();
  function toggleMode() {
    dispatch(toggleAppointmentMode());
  }
  return (
    <div>
      {!appointmentInfo && !userInfo && (
        <Button type="primary" onClick={toggleMode}>
          {customerMode ? "Darbuotojams" : "Grįžti"}
        </Button>
      )}
      {!customerMode && <StaffPanel />}
      {customerMode && <CustomerPanel />}
    </div>
  );
}
