import { useDispatch, useSelector } from "react-redux";
import { StaffAppointments } from "../components/StaffAppointments";
import { StaffPanelLogIn } from "../components/StaffPanelLogIn";
import { StaffPanelLogOut } from "../components/StaffPanelLogOut";
import { authenticateStaffMember } from "../functions/apiFunctions";
import {
  selectAuthenticationHeader,
  setAuthenticationHeader,
} from "../state/appSlice";

interface Props {}

export interface LoginDetails {
  username: string;
  password: string;
}

export function StaffPanel({}: Props) {
  const isAuthenticated = !!useSelector(selectAuthenticationHeader);

  const dispatch = useDispatch();

  const setHeaderAndAuthority = (header: string, authority: string) =>
    dispatch(setAuthenticationHeader({ header, authority }));

  const onSubmit = (values: LoginDetails) => {
    authenticateStaffMember(values, setHeaderAndAuthority);
  };

  return (
    <div>
      {!isAuthenticated && <StaffPanelLogIn onSubmit={onSubmit} />}
      {isAuthenticated && (
        <>
          <StaffAppointments />
          <StaffPanelLogOut />
        </>
      )}
    </div>
  );
}
