import { Button } from "antd";
interface Props {}

export function LogOutButton({}: Props) {
  function logOut(): void {
    sessionStorage.removeItem("Username");
    // sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  return <Button onClick={logOut}>logOut</Button>;
}
