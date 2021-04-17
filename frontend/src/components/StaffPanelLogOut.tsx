import { Button } from "antd";
import { useDispatch } from "react-redux";
import { cancelAxiosInterceptors } from "../functions/apiFunctions";
import { unsetUserInfoAndAuthenticationHeader } from "../state/staffSlice";
interface Props {}

export function StaffPanelLogOut({}: Props) {
  const dispatch = useDispatch();
  function logOut(): void {
    dispatch(unsetUserInfoAndAuthenticationHeader());
    cancelAxiosInterceptors();
  }

  return <Button onClick={logOut}>Atsijungti</Button>;
}
