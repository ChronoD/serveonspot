import { useDispatch, useSelector } from "react-redux";
import { StaffAppointments } from "../components/StaffAppointments";
import { StaffPanelLogIn } from "../components/StaffPanelLogIn";
import { StaffPanelLogOut } from "../components/StaffPanelLogOut";
import { authenticateStaffMember } from "../functions/apiFunctions";
import { LoginDetails, UserInfo } from "../state/dataTypes";
import {
  selectAuthenticationHeader,
  setUserInfoAndAuthenticationHeader,
} from "../state/staffSlice";

interface Props {}

export function StaffPanel({}: Props) {
  const isAuthenticated = !!useSelector(selectAuthenticationHeader);

  const dispatch = useDispatch();

  const setHeaderAndUserInfo = (userInfo: UserInfo, header: string) =>
    dispatch(setUserInfoAndAuthenticationHeader({ userInfo, header }));

  const onSubmit = (values: LoginDetails) => {
    authenticateStaffMember(values, setHeaderAndUserInfo);
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
