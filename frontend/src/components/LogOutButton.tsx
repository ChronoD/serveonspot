import { Button } from "antd";
import { useDispatch } from "react-redux";
import { unsetAuthenticationHeader } from "../state/appSlice";
interface Props {}

export function LogOutButton({}: Props) {
  const dispatch = useDispatch();
  function logOut(): void {
    dispatch(unsetAuthenticationHeader());
  }

  return <Button onClick={logOut}>Atsijungti</Button>;
}
