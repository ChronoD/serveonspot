import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAppointmentMode,
  toggleAppointmentMode,
} from "../state/appSlice";
import { useAppSelector } from "../state/hooks";
import { CustomerPanel } from "./CustomerPanel";
import { StaffPanel } from "./StaffPanel";

interface Props {}

export function MainPanel({}: Props) {
  const {
    app: { customerMode },
    customer: { appointmentInfo },
  } = useAppSelector((state) => state);

  const dispatch = useDispatch();
  function toggleMode() {
    dispatch(toggleAppointmentMode());
  }
  return (
    <div>
      {!appointmentInfo && (
        <Button type="primary" onClick={toggleMode}>
          {customerMode ? "Darbuotojams" : "Grįžti"}
        </Button>
      )}
      {!customerMode && <StaffPanel />}
      {customerMode && <CustomerPanel />}
    </div>
  );
}
