import { Button } from "antd";
import { useDispatch } from "react-redux";
import { cancelAxiosInterceptors } from "../functions/apiFunctions";
import { unsetAuthenticationHeader } from "../state/appSlice";
interface Props {}

export function StaffPanelLogOut({}: Props) {
  const dispatch = useDispatch();
  function logOut(): void {
    dispatch(unsetAuthenticationHeader());
    cancelAxiosInterceptors();
  }

  return <Button onClick={logOut}>Atsijungti</Button>;
}
